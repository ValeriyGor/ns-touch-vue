<template lang="pug">
  .container
    Touch
    p(v-if="!isTrueArtikul") Не можем воспроизвести выключатель по данной ссылке
</template>

<script>
import Touch from "../../components/Touch"
import {CONSTANTS} from "@/utilites/utilites"
import {mapMutations} from "vuex";
export default {
  name: "ShowTouch",
  data(){
    return {
      isTrueArtikul: true,
      paletteItems: CONSTANTS['paletteItems'],
    }
  },
  components: {
    Touch
  },
  mounted() {
    let artikul = this.$route.params.artikul.split('-');
    if(artikul.length !== 4){
      this.isTrueArtikul = false
    } else {
      let parameters = {
        material: this.getMaterial(artikul[0].charAt(0)),
        series: artikul[0].substr(1),
        orientation: artikul[1].length === 2 ? 'Horizontal' : this.getOrientation(artikul[1].charAt(0)),
        interface: artikul[1].length === 2 ? this.getElectronics(artikul[1].charAt(0)) : this.getElectronics(artikul[1].charAt(1)),
        sensorsCount: artikul[1].length === 2 ? artikul[1].charAt(1) : artikul[1].charAt(2),
        palette: this.getPalette(artikul[2].substr(0, 2)),
        surface: this.getSurface(artikul[2].charAt(2)),
        inlay: this.getInlay(artikul[2].substr(3)),
        switchesCount: 1,
      }
      let icons = artikul[3].split('&')
      this.SET_TOUCH_PARAMETERS(parameters);
      this.SET_ICONS(icons);
    }
  },
  methods: {
    ...mapMutations({
      SET_TOUCH_PARAMETERS: "Parameters/SET_TOUCH_PARAMETERS",
      SET_ICONS: "Parameters/SET_ICONS",
      SET_SELECTED_SWITCH_PALETTE: "Parameters/SET_SELECTED_SWITCH_PALETTE",
    }),
    getOrientation(value){
      if(value.toLowerCase() === 'v'){
        return "Vertical"
      } else if (value.toLowerCase() === 'h'){
        return 'Horizontal'
      } else {
        return undefined
      }
    },
    getSurface(value){
      if(value.toLowerCase() === '0'){
        return "Glossy"
      } else if (value.toLowerCase() === 'h'){
        return 'Mate'
      } else {
        return undefined
      }
    },
    getInlay(value){
      if(value.toLowerCase() === 'br'){
        return "Brass"
      } else if (value.toLowerCase() === 'al'){
        return 'Aluminium'
      } else {
        return undefined
      }
    },
    getElectronics(value){
      if(value.toLowerCase() === '0'){
        return "DRY CONTACT"
      } else if (value.toLowerCase() === '1'){
        return '220 V'
      } else if (value.toLowerCase() === '2'){
        return 'FOR KNX'
      } else {
        return undefined
      }
    },
    getPalette(value){
      let selectedPalette = null;
      this.paletteItems.forEach(palette => {
        if(palette.dataArticul.toLowerCase() === value.toLowerCase()){
          selectedPalette = palette;
        }
      })
      this.SET_SELECTED_SWITCH_PALETTE(selectedPalette)
      return selectedPalette.value;
    },
    getMaterial(value){
      let material = ''
      switch (value){
        case 's':
          material = 'stone'
          break;
        case 'w':
          material = 'wood'
          break;
        case 'h':
          material = 'hpl'
          break;
        default:
          material = 'stone'
      }
      return material
    }
  }
}
</script>

<style lang="scss">

</style>