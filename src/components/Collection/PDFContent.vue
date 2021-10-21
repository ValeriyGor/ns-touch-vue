<template lang="pug">
  div.PDFContent
    div(v-for="(collection, j) in collections" class="PDFContent__page html2pdf__page-break")
      h2 {{orderName.length > 0 ? orderName : 'Order' }}
      table(:key="j")
        tr
          th(width="150") Name
          th(width="300") Vendor Code
          th(width="30") Cnt
          th(width="250") Preview
          th(width="100") QR
        tr(v-for="(collect, i) in collection")
          td(width="150") {{collect.name}}
          td(width="300") {{collect.artikul}}
          td(width="30" style="text-align: center") {{collect.type === 'switch' ? collect.parameters.switchesCount : collect.parameters.comboCount }}
          td(width="250" style="text-align: center")
            SmallPreview(:parameters="collect.parameters" :icons="collect.icons" :touchWidth="40" v-if="collect.type === 'switch'")
            ComboSmallPreview(
              v-if="(collect.type === 'combo' || collect.type === 'sockets') && !updatedTable"
              :artikul="collect.artikul"
              :size-slot="50"
              :palette="collect.parameters.palette"
              :colorSocket="collect.parameters.colorSocket"
            )
            //:icons="getIcons(collect)"
          td(width="100" style="text-align: center")
            QrcodeVue(:value="`${domain}show-touch/${collect.artikul}-${getIconsLink(collect.parameters.sensorsCount, collect.icons)}`" size="80"  v-if="collect.type === 'switch'")
            QrcodeVue(:value="`${domain}show-combo/${getTrimArtikul(collect)}`" size="80" v-if="collect.type === 'combo' || collect.type === 'sockets'")

</template>

<script>
import QrcodeVue from 'qrcode.vue'
import {mapGetters} from "vuex";
import { getСipherIcons } from '../../utilites/utilites'
import SmallPreview from '../../components/SmallPreviev'
import ComboSmallPreview from '../../components/SmallPreviev/ComboSmallPreview'
import {CONSTANTS} from "@/utilites/utilites"

export default {
  name: "PDFContent",
  components: {
    QrcodeVue,
    SmallPreview,
    ComboSmallPreview
  },
  data(){
    return {
      domain: 'https://create.ns-touch.com/',
      paletteItems: CONSTANTS['paletteItems'],
      updatedTable: false
    }
  },
  props: {
    orderName: {
      type: String,
      default: ''
    }
  },
  computed:{
    ...mapGetters({
      collection: "Collection/collection"
    }),
    collections(){
      let size = 7;
      let subarray = []; //массив в который будет выведен результат.
      for (let i = 0; i <Math.ceil(this.collection.length/size); i++){
        subarray[i] = this.collection.slice((i*size), (i*size) + size);
      }
      return subarray
    }
  },
  methods: {
    getIconsLink(count, icons){
      return getСipherIcons(count, icons);
    },
    getPalette(value){
      let v = value.split(' ');
      let selectedPalette = null;
      this.paletteItems.forEach(palette => {
        if(palette.dataArticul.toLowerCase() === `${v[0].charAt(0).toLowerCase()}${v[1].charAt(0).toLowerCase()}`){
          selectedPalette = palette;
        }
      })
      this.SET_SELECTED_SWITCH_PALETTE(selectedPalette)
    },
    getTrimArtikul(param){
      let icons = Object.keys(param.parameters.slotsTouchIcons).filter(key => {
        if(param.parameters.selectedSlots[key] === '01' || param.parameters.selectedSlots[key] === 'H02' || param.parameters.selectedSlots[key] === 'V02' || param.parameters.selectedSlots[key] === '04' || param.parameters.selectedSlots[key] === 'H08'){
          return true
        } else {
          return false
        }
      });
      icons = icons.filter(key => {
        return param.parameters.selectedSlots[+key - 1] !== 'H08'
      })
      icons = icons.map(key => param.parameters.slotsTouchIcons[key].join('&'));
      return param.artikul.replace(/\s/g, '') + `-${icons.join(';')}`;
    },
    getArtikul(a, type){
      return type !== 'sockets' ? a : a.substr(6)
    },
    getIcons(param){
      let icons = Object.keys(param.parameters.slotsTouchIcons).filter(key => {
        if(param.parameters.selectedSlots[key] === '01' || param.parameters.selectedSlots[key] === 'H02' || param.parameters.selectedSlots[key] === 'V02' || param.parameters.selectedSlots[key] === '04' || param.parameters.selectedSlots[key] === 'H08'){
          return true
        } else {
          return false
        }
      });
      icons = icons.filter(key => {
        return param.parameters.selectedSlots[+key - 1] !== 'H08'
      })
      icons = icons.map(key => param.parameters.slotsTouchIcons[key]);
      let newIcons = Object.keys(icons).map(key => icons[key])
      return newIcons
    }
  },
  watch: {
    collection() {
      this.updatedTable = true
      setTimeout(() => {
        this.updatedTable = false
      }, 0)
    }
  }
}
</script>

<style lang="scss">
  .PDFContent{
    padding-left: 25px;
    &__page{
      padding-top: 25px;
    }
    h2{
      color: #000000;
      text-align: center;
      padding-bottom: 15px;
    }
  }
</style>