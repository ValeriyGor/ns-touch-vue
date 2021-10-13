<template lang="pug">
  .ComboConstructor
    .text-center
      h3(v-if="mode === 'combo'") Combo constructor
      h3(v-else-if="mode === 'sockets'") Frames & Sockets
      br
      h4 {{artikul}}
    .ComboConstructor__Preview(
      :class="{'Column': comboParameters.orientation === 'Vertical'}"
      :style="{backgroundImage: switchPaletteBG}"
    )
      .ComboConstructor__PreviewItem(
        v-for="i in +comboParameters.slotsCount"
        :series="comboParameters.series"
        v-if="i > 0 && comboParameters.selectedSlots[i-1] !== 'H08'"
        :class="{'double': comboParameters.selectedSlots[i] === 'H08'}"
        :data-orientation="comboParameters.orientation.toLowerCase()"
      )
        .ComboConstructor__SetSlot(@click="toggleSlotsPosition(i)" v-if="!comboParameters.selectedSlots[i]")
        ComboSlot(:slot-value='comboParameters.selectedSlots[i]' :mode="mode" :slot-index="i" v-if="comboParameters.selectedSlots[i]" @open-select-menu="toggleSlotsPosition(i)")
        .ComboConstructor__SelectSlot(v-if="visibleSlotsPosition[i] && mode === 'combo'" :class="{'lastSlot': i === +comboParameters.slotsCount}")
          .ComboConstructor__SelectSlotItem(@click="setComboSlot(i, '01')")
            img(src="../../assets/img/combo-slots/one-touch.png")
          .ComboConstructor__SelectSlotItem(@click="setComboSlot(i, 'R1')" v-if="comboParameters.series === '90'")
            img(src="../../assets/img/combo-slots/rozetka.png")
          .ComboConstructor__SelectSlotItem(@click="setComboSlot(i, 'S1')" v-if="comboParameters.series !== '90'")
            img(src="../../assets/img/combo-slots/socket.png")
          .ComboConstructor__SelectSlotItem(@click="setComboSlot(i, 'H02')")
            img(src="../../assets/img/combo-slots/two-touch-hor.png")
          .ComboConstructor__SelectSlotItem(@click="setComboSlot(i, 'CH2ac')" v-if="comboParameters.series === '90'")
            img(src="../../assets/img/combo-slots/usb.png")
          .ComboConstructor__SelectSlotItem(v-if="comboParameters.series !== '90'")
          .ComboConstructor__SelectSlotItem(@click="setComboSlot(i, 'V02')")
            img(src="../../assets/img/combo-slots/two-touch-ver.png")
          .ComboConstructor__SelectSlotItem(@click="setComboSlot(i, 'RCH2ac')" v-if="comboParameters.series === '90'")
            img(src="../../assets/img/combo-slots/rozetka-usb.png")
          .ComboConstructor__SelectSlotItem(v-if="comboParameters.series !== '90'")
          .ComboConstructor__SelectSlotItem(@click="setComboSlot(i, '04')")
            img(src="../../assets/img/combo-slots/four-touch.png")
          .ComboConstructor__SelectSlotItem
          .ComboConstructor__SelectSlotItem(@click="setComboSlot(i, 'H08')" v-if="i !== +comboParameters.slotsCount")
            img(src="../../assets/img/combo-slots/eight-touch.png")
    StandartPreviewList(v-if="mode === 'combo'")
</template>

<script>
import {mapGetters} from "vuex";
import ComboSlot from "./ComboSlot";
import StandartPreviewList from "./StandartPreviewList";

export default {
  name: "ComboConstructor",
  components: {
    StandartPreviewList,
    ComboSlot
  },
  props: {
    mode: {
      type: String,
      default: ""
    }
  },
  data(){
    return {
      visibleSlotsPosition: {
        '1': false,
        '2': false,
        '3': false,
        '4': false
      }
    }
  },
  computed: {
    ...mapGetters({
      comboParameters: 'Parameters/comboParameters',
      currentComboArtikul: 'Parameters/currentComboArtikul',
      selectedComboPalette: 'Parameters/selectedComboPalette',
    }),
    switchPaletteBG() {
      return this.selectedComboPalette.paletteImg
    },
    artikul(){
      return this.mode === 'combo' ? this.currentComboArtikul : this.currentComboArtikul.substr(6)
    }
  },
  methods: {
    toggleSlotsPosition(i){
      if(!this.visibleSlotsPosition[i])
        this.resetSlotsPosition()
      this.visibleSlotsPosition[i] = !this.visibleSlotsPosition[i]
    },
    resetSlotsPosition(){
      this.visibleSlotsPosition = {
        '1': false,
        '2': false,
        '3': false,
        '4': false
      }
    },
    setComboSlot(index, value){
      this.comboParameters.selectedSlots[index] = value;
      this.resetSlotsPosition()
    }
  },
}
</script>

<style lang="scss">
.ComboConstructor {
  padding-top: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
  h3 {
    font-size: 20px;
    border-bottom: 1px solid #007eb1;
    display: inline-block;
  }
  &__Preview {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
    background-position: center;
    background-size: cover;
    &.Column{
      flex-direction: column;
    }
    &:not(.Column){
      .ComboConstructor__PreviewItem{
        border-right: 1px dotted rgba(255, 255, 255, 0.5);
        border-bottom: 0;
        &:last-child{
          border-right: 0;
        }
      }
    }
    &Item{
      flex: 1;
      width: 100%;
      max-width: 200px;
      position: relative;
      transition: all 0.15s;
      border-right: 0;
      border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
      &:last-child{
        border-bottom: 0;
      }
      &:after{
        content: '';
        display: block;
        padding-top: 100%;
        min-width: 150px;
        width: 100%;
      }
      &[series="80"]{
        padding: 0;
      }
      &[series="85"]{
        padding: 5px;
      }
      &[series="90"]{
        padding: 10px;
      }
      &.double{
        &[data-orientation="horizontal"] {
          flex: 2;
          max-width: 300px;

          &:after {
            content: '';
            display: block;
            padding-top: 50%;
            min-width: 300px;
            width: 100%;
          }
        }
        &[data-orientation="vertical"] {
          &:after {
            content: '';
            display: block;
            padding-top: 200%;
            width: 100%;
          }
        }
      }
    }
  }
  &__SetSlot{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    cursor: pointer;
    background: url('../../assets/img/new_icons/add-new.png') center no-repeat;
    background-size: 50px;
    transition: all 0.15s;
    &:hover{
      background-size: 58px;
    }
  }
  &__SelectSlot {
    position: absolute;
    top: 102%;
    left: 0;
    max-width: 150px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
    background-color: #1f1f1f;
    z-index: 10;
    &Item{
      flex: 0 0 calc(50% - 10px);
      //border: 1px solid #fff;
      margin: 5px;
      min-height: 64px;
      color: #fff;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  &__Preview.Column{
    .ComboConstructor__SelectSlot{
      top: 0;
      bottom: 0;
      left: 105%;
      right: auto;
      min-width: 350px;
      max-width: 350px;
      &Item {
        flex: 0 0 calc(20% - 10px);
        img{
          max-width: 100%;
        }
        &:nth-child(2n){
          order: 1;
        }
        &:nth-child(2), &:nth-child(4), &:nth-child(6), &:nth-child(8){
          position: relative;
          top: -35%
        }
      }
      &.lastSlot{
        min-width: 280px;
        max-width: 280px;
        .ComboConstructor__SelectSlotItem{
          flex: 0 0 calc(25% - 10px);
          &:nth-child(2), &:nth-child(4), &:nth-child(6), &:nth-child(8){
            position: relative;
            top: 0
          }
        }
      }
    }
  }
}
</style>