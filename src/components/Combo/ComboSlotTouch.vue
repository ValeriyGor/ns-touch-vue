<template lang="pug">
  .ComboSlotTouch(
    :class="formatOrientation"
    :data-linecolor="comboParameters.switchInlay !== 'Aluminium' ? 'gold' : 'gray'"
    :data-count-sensor="countTouch"
  )
    .ComboSlotTouch__Item(v-for="touch in countTouch" :key="touch")
      div.ComboSlotTouch__ItemIcon(
        @click="iconClick(touch)"
        :style="{backgroundImage: `url(${getIconUrl(touch)})`}"
      )
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ComboSlotTouch",
  props: {
    countTouch: {
      type: Number,
      default: 1
    },
    orientation: {
      type: String,
      default: 'Horizontal'
    },
    currentSlot: {
      type: Number,
      default: -1
    }
  },
  computed: {
    ...mapGetters({
      comboParameters: 'Parameters/comboParameters',
      selectedComboPalette: 'Parameters/selectedComboPalette',
    }),
    icons(){
      return this.comboParameters.slotsTouchIcons[this.currentSlot]
    },
    colorIcon(){
      return this.selectedComboPalette.dataIconColor ? this.selectedComboPalette.dataIconColor.charAt(0).toLowerCase() : 'w'
    },
    formatOrientation(){
      return this.orientation ? this.orientation.toLowerCase() : 'horizontal'
    }
  },
  methods: {
    iconClick(i){
      this.$emit('icon-click', i)
    },
    getIconUrl(index){
      let imgName = 'add-new.png'
      if(this.icons[index-1]){
        imgName = `${this.icons[index-1]}-${this.colorIcon}.png`
      }
      return require(`../../assets/img/new_icons/${imgName}`)
    },
  }
}
</script>

<style lang="scss">
.ComboSlotTouch{
  width: 92%;
  height: 92%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  &.horizontal{
    &[data-count-sensor="2"]{
      .ComboSlotTouch__Item{
        width: 100%;
        height: 50%;
        border-bottom: 1px solid #929292;
        &:last-child{
          border-bottom: 0;
        }
      }
    }
    &[data-count-sensor="8"]{
      .ComboSlotTouch__Item{
        border-right: 1px solid #929292;
        border-bottom: 1px solid #929292;
        width: 26%;
        height: 50%;
        &:first-child, &:last-child, &:nth-child(4), &:nth-child(5){
          width: 24%;
        }
        &:nth-child(4), &:last-child{
          border-right: 0;
        }
        &:nth-child(5),&:nth-child(6),&:nth-child(7), &:last-child{
          border-bottom: 0;
        }
      }
    }
  }
  &.vertical{
    &[data-count-sensor="2"]{
      .ComboSlotTouch__Item{
        border-right: 1px solid #929292;
        width: 50%;
        height: 100%;
        &:last-child{
          border-right: 0;
        }
      }
    }
    &[data-count-sensor="8"]{
      .ComboSlotTouch__Item{
        border-right: 1px solid #929292;
        border-bottom: 1px solid #929292;
        width: 50%;
        height: 26%;
        &:first-child, &:last-child, &:nth-child(2), &:nth-child(7){
          height: 24%;
        }
        &:nth-child(7), &:last-child{
          border-bottom: 0;
        }
        &:nth-child(2n){
          border-right: 0;
        }
      }
    }
  }
  &[data-count-sensor="4"]{
    .ComboSlotTouch__Item{
      width: 50%;
      height: 50%;
      &:nth-child(2n+1){
        border-right: 1px solid #929292;
      }
      &:nth-child(1), &:nth-child(2){
        border-bottom: 1px solid #929292;
      }
    }
  }
  &[data-linecolor='gold']{
    .ComboSlotTouch__Item{
      border-color: #FEDC6F!important;
    }

  }
  &__Item{
    position: relative;
    width: 100%;
    height: 100%;
    &Icon{
      position: absolute;
      width: 29px;
      height: 29px;
      top: 10px;
      left: 10px;
      cursor: pointer;
      background-position: center;
      background-size: contain;
      &.empty{
        border: 1px dotted rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        overflow: hidden;
        &:before{
          content: '';
          width: 13px;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.3);
          position: absolute;
          top: 13px;
          left: 7px;
        }
        &:after{
          content: '';
          width: 1px;
          height: 13px;
          background-color: rgba(255, 255, 255, 0.3);
          position: absolute;
          top: 7px;
          left: 13px;
        }
      }
    }
  }
}
</style>