<template>
  <div class="touch-view">
    <h4>{{currentTouchArtikul}}</h4>
    <div
        class="touch-preview"
        :class="{'horizontal': touchParameters.orientation === 'Horizontal'}"
        :data-count-sensor="touchParameters.sensorsCount"
        :data-series="`series-${touchParameters.series}`"
        :data-linecolor="touchParameters.inlay === 'Aluminium' ? 'gray' : 'gold'"
        :style="{backgroundImage: switchPaletteBG}"
    >
      <div class="touch-preview__item" v-for="count in +touchParameters.sensorsCount" :key="count">
        <div
            class="icon"
            data-count="count"
            :style="{backgroundImage: `url(${getIconUrl(count)})`}"
            @click="goToSelectIcon(count)"
        ></div>
      </div>
    </div>
    <ModalSelectIcon @close="closeModalSelectIcon" :isVisible="showModalSelectIcon" :currentTouch="currentTouch"/>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
import ModalSelectIcon from '../../components/Modals/SelectIcon'
export default {
  name: "Touch",
  components: {
    ModalSelectIcon,
  },
  data(){
    return {
      showModalSelectIcon: false,
      currentTouch: -1,
    }
  },
  computed: {
    ...mapGetters({
      touchParameters: 'Parameters/touchParameters',
      selectedSwitchPalette: 'Parameters/selectedSwitchPalette',
      currentTouchArtikul: 'Parameters/currentTouchArtikul',
      icons: "Parameters/icons"
    }),
    switchPaletteBG() {
      return this.selectedSwitchPalette.paletteImg
    },
    colorIcon(){
      return this.selectedSwitchPalette.dataIconColor ? this.selectedSwitchPalette.dataIconColor.charAt(0).toLowerCase() : 'w'
    }
  },
  methods: {
    closeModalSelectIcon(){
      this.showModalSelectIcon = false
    },
    getIconUrl(index){
      let imgName = 'add-new.png'
      if(this.icons[index-1]){
        imgName = `${this.icons[index-1]}-${this.colorIcon}.png`
      }
      return require(`../../assets/img/new_icons/${imgName}`)
    },
    goToSelectIcon(i){
      this.currentTouch = i;
      this.showModalSelectIcon = true;
    }
  }
}
</script>

<style lang="scss">
.touch-view{
  display: flex;
  align-items: center;
  min-height: 500px;
  flex-direction: column;
  justify-content: center;
  h4{
    text-align: center;
    margin-bottom: 20px;
  }
}

@media all and (max-width: 767px){
  .container .touch-view{
    padding-top: 120px;
  }
}
</style>