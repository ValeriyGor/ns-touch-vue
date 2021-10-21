<template lang="pug">
    .ShowComboContainer
        ComboSmallPreview(
          v-if="isTrueArtikul"
          :artikul="artikul"
          :size-slot="sizeSlot"
          :palette="palette"
          :colorSocket="colorSocket"
          :icons="icons"
        )
        p(v-if="!isTrueArtikul") Не можем воспроизвести комбо по данной ссылке
</template>

<script>
  import ComboSmallPreview from "../../components/SmallPreviev/ComboSmallPreview"
  import {CONSTANTS} from "@/utilites/utilites"
  import {mapMutations} from "vuex";
  export default {
    name: "ShowCombo",
    data(){
      return {
        isTrueArtikul: false,
        paletteItems: CONSTANTS['paletteItems']
      }
    },
    components: {
      ComboSmallPreview
    },
    computed: {
      artikul(){
        return this.$route.params.artikul
      },
      separateArtikul(){
        return this.artikul.split('-');
      },
      palette() {
        return this.getPalette(this.separateArtikul[2].substr(0, 2))
      },
      colorSocket(){
        return this.separateArtikul[3] ? this.separateArtikul[3].substr(0, 2) : 'NF'
      },
      icons(){
        let icons = []
        if(this.separateArtikul[4]){
          icons = this.separateArtikul[4].split(';');
          icons = icons.map(icon => icon.split('&'))
        } else if(this.separateArtikul[3] && (!isNaN(this.separateArtikul[3]) || this.separateArtikul[3].includes('&'))){
          icons = this.separateArtikul[3].split(';');
          icons = icons.map(icon => icon.split('&'))
        }
        return icons
      },
      sizeSlot() {
        let width = window.innerWidth/4.2 > 200 ? 200 : window.innerWidth/4.2
        return width
      }
    },
    mounted() {
      if(this.separateArtikul.length >= 3){
        this.isTrueArtikul = true
      }
    },
    methods: {
      ...mapMutations({
        SET_COMBO_PARAMETERS: "Parameters/SET_COMBO_PARAMETERS",
        SET_SELECTED_COMBO_PALETTE: "Parameters/SET_SELECTED_COMBO_PALETTE",
      }),
      getPalette(value){
        let selectedPalette = null;
        this.paletteItems.forEach(palette => {
          if(palette.dataArticul.toLowerCase() === value.toLowerCase()){
            selectedPalette = palette;
          }
        })
        this.SET_SELECTED_COMBO_PALETTE(selectedPalette)
        return selectedPalette.value;
      }
    }
  }
</script>

<style lang="scss">
.ShowComboContainer{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
}

@media all and (max-width: 767px){
  .ShowComboContainer{
    padding-top: 150px;
  }
}
</style>