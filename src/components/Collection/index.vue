<template lang="pug">
  div.Collection
    el-table(:data="collection" style="width: 100%")
      el-table-column(prop="name" label="Name" min-width="200px")
      el-table-column(prop="artikul" label="Vendor Code" min-width="180px")
        template(slot-scope="scope")
          p {{ getArtikul(scope.row.artikul, scope.row.type) }}
      el-table-column(prop="preview" label="Preview" min-width="200px" align="center")
        template(slot-scope="scope")
          SmallPreview(:parameters="scope.row.parameters" :icons="scope.row.icons" :touchWidth="50" v-if="scope.row.type === 'switch' && !updatedTable")
          ComboSmallPreview(
            v-if="(scope.row.type === 'combo' || scope.row.type === 'sockets') && !updatedTable"
            :artikul="scope.row.artikul"
            :size-slot="50"
            :palette="scope.row.parameters.palette"
            :colorSocket="scope.row.parameters.colorSocket"
            :icons="getIcons(scope.row)"
          )
      el-table-column(prop="qr" label="QR")
        template(slot-scope="scope")
          router-link(:to="`/show-touch/${scope.row.artikul}-${getIconsLink(scope.row.parameters.sensorsCount, scope.row.icons)}`" v-if="scope.row.type === 'switch'")
            QrcodeVue(:value="`${domain}show-touch/${scope.row.artikul}-${getIconsLink(scope.row.parameters.sensorsCount, scope.row.icons)}`" size="80")
          router-link(:to="`/show-combo/${getTrimArtikul(scope.row)}`" v-if="scope.row.type === 'combo' || scope.row.type === 'sockets'")
            QrcodeVue(:value="`${domain}show-combo/${getTrimArtikul(scope.row)}`" size="80")
      el-table-column(label="Operations" min-width="100" v-if="operations")
        template(slot-scope="scope")
          el-button(
            type="warning"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)") Edit
          el-button(
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)") Delete
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import {mapGetters, mapMutations} from "vuex";
import { getСipherIcons } from '../../utilites/utilites'
import SmallPreview from '../../components/SmallPreviev'
import ComboSmallPreview from '../../components/SmallPreviev/ComboSmallPreview'
import {CONSTANTS} from "@/utilites/utilites"
export default {
  name: "Collection",
  components: {
    QrcodeVue,
    SmallPreview,
    ComboSmallPreview
  },
  props: {
    operations: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      domain: 'https://create.ns-touch.com/',
      paletteItems: CONSTANTS['paletteItems'],
      updatedTable: false
    }
  },
  computed:{
    ...mapGetters({
      collection: "Collection/collection"
    }),
  },
  methods: {
    ...mapMutations({
      DELETE_FROM_COLLECTION: "Collection/DELETE_FROM_COLLECTION",
      SET_TOUCH_PARAMETERS: "Parameters/SET_TOUCH_PARAMETERS",
      SET_COMBO_PARAMETERS: "Parameters/SET_COMBO_PARAMETERS",
      SET_SELECTED_COMBO_PALETTE: "Parameters/SET_SELECTED_COMBO_PALETTE",
      SET_ICONS: "Parameters/SET_ICONS",
      SET_UPDATE_ITEM: "Parameters/SET_UPDATE_ITEM",
    }),
    getIconsLink(count, icons){
      return getСipherIcons(count, icons);
    },
    handleEdit(i, row){
      this.$emit('change-tab', row.type)
      if(row.type === 'switch'){
        this.SET_TOUCH_PARAMETERS(JSON.parse(JSON.stringify(row.parameters)))
        this.getPalette(JSON.parse(JSON.stringify(row.parameters.palette)))
        this.SET_ICONS(JSON.parse(JSON.stringify(row.icons)))
      } else if (row.type === 'combo' || row.type === 'sockets'){
        console.log(row.parameters);
        this.SET_COMBO_PARAMETERS(JSON.parse(JSON.stringify(row.parameters)))
        this.getPalette(JSON.parse(JSON.stringify(row.parameters.palette)))
      }
      let u = {
        index: i,
        name: row.name
      }
      this.SET_UPDATE_ITEM(u)

    },
    handleDelete(index){
      this.$swal({
        title: 'Alert!',
        text: "Do you really want to remove the Collection item?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#009fe3',
        cancelButtonColor: '#ff7674'
      }).then(r => {
        if (r.value) {
          this.DELETE_FROM_COLLECTION(index)
        }
      });
    },
    getPalette(value){
      let v = value.split(' ');
      let selectedPalette = null;
      this.paletteItems.forEach(palette => {
        if(palette.dataArticul.toLowerCase() === `${v[0].charAt(0).toLowerCase()}${v[1].charAt(0).toLowerCase()}`){
          selectedPalette = palette;
        }
      })
      this.SET_SELECTED_COMBO_PALETTE(selectedPalette)
    },
    getTrimArtikul(param){
      let icons = Object.keys(param.parameters.slotsTouchIcons).filter(key => {
        if(
            param.parameters.selectedSlots[key] === '01' ||
            param.parameters.selectedSlots[key] === '11' ||
            param.parameters.selectedSlots[key] === '21' ||
            param.parameters.selectedSlots[key] === 'H02' ||
            param.parameters.selectedSlots[key] === 'H12' ||
            param.parameters.selectedSlots[key] === 'H22' ||
            param.parameters.selectedSlots[key] === 'V02' ||
            param.parameters.selectedSlots[key] === 'V12' ||
            param.parameters.selectedSlots[key] === 'V22' ||
            param.parameters.selectedSlots[key] === '04' ||
            param.parameters.selectedSlots[key] === '14' ||
            param.parameters.selectedSlots[key] === '24' ||
            param.parameters.selectedSlots[key] === 'H08' ||
            param.parameters.selectedSlots[key] === 'H18' ||
            param.parameters.selectedSlots[key] === 'H28'
        ){
          return true
        } else {
          return false
        }
      });
      icons = icons.filter(key => {
        return param.parameters.selectedSlots[+key - 1] !== 'H08'
      })
      icons = icons.map(key => param.parameters.slotsTouchIcons[key].join('&'));
      let iconsPart = ''
      if(icons.length > 0){
        iconsPart = '-' + icons.join(';')
      }
      return param.artikul.replace(/\s/g, '') + iconsPart;
    },
    getArtikul(a, type){
      return type !== 'sockets' ? a : a.substr(6)
    },
    getIcons(param){
      let icons = Object.keys(param.parameters.slotsTouchIcons).filter(key => {
        if(
            param.parameters.selectedSlots[key] === '01' ||
            param.parameters.selectedSlots[key] === '11' ||
            param.parameters.selectedSlots[key] === '21' ||
            param.parameters.selectedSlots[key] === 'H02' ||
            param.parameters.selectedSlots[key] === 'H12' ||
            param.parameters.selectedSlots[key] === 'H22' ||
            param.parameters.selectedSlots[key] === 'V02' ||
            param.parameters.selectedSlots[key] === 'V12' ||
            param.parameters.selectedSlots[key] === 'V22' ||
            param.parameters.selectedSlots[key] === '04' ||
            param.parameters.selectedSlots[key] === '14' ||
            param.parameters.selectedSlots[key] === '24' ||
            param.parameters.selectedSlots[key] === 'H08' ||
            param.parameters.selectedSlots[key] === 'H18' ||
            param.parameters.selectedSlots[key] === 'H28'
        ){
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

<style lang="sass">
  .Collection
    background-color: #fff
    width: 100%
    margin-bottom: 50px
    padding: 15px
    th
      text-align: left
      font-family: Arvo
    td
      font-family: Montserrat


</style>