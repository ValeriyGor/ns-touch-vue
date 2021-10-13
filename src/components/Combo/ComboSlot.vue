<template lang="pug">
  .ComboSlot(v-if="rerender")
    span.ComboSlot__Refresh(@click="$emit('open-select-menu')" v-if="mode === 'combo'")
      i.el-icon-s-tools
    div.ComboSlot_R1(v-if="slotValue === 'R1'")
      img(:src="getURLImageSocket()")
    div.ComboSlot_RCH2ac(v-if="slotValue === 'RCH2ac'")
      img(:src="getURLImageSocketUSB()")
    div.ComboSlot_CH2ac(v-if="slotValue === 'CH2ac'")
      img(:src="getURLImageUSB()")
    div.ComboSlot_Socket(v-if="slotValue === 'S1'")
      div.shadow
        img(:src="getURLImageSK()")
    div.ComboSlot_Switch(v-if="slotValue === '01'")
      ComboSlotTouch(:count-touch="1" @icon-click="goToSelectIcon" :current-slot="slotIndex")
    div.ComboSlot_Switch(v-if="slotValue === 'H02'")
      ComboSlotTouch(:count-touch="2" orientation="Horizontal" @icon-click="goToSelectIcon" :current-slot="slotIndex")
    div.ComboSlot_Switch(v-if="slotValue === 'V02'")
      ComboSlotTouch(:count-touch="2" orientation="Vertical" @icon-click="goToSelectIcon" :current-slot="slotIndex")
    div.ComboSlot_Switch(v-if="slotValue === '04'")
      ComboSlotTouch(:count-touch="4" @icon-click="goToSelectIcon" :current-slot="slotIndex")
    div.ComboSlot_Switch(v-if="slotValue === 'H08' || slotValue === 'V08'")
      ComboSlotTouch(:count-touch="8" :orientation="comboParameters.orientation" @icon-click="goToSelectIcon" :current-slot="slotIndex")
    ModalSelectIcon(@select-icon="selectIcon" @close="closeModalSelectIcon" :isVisible="showModalSelectIcon" :currentTouch="currentTouch" destination="combo")

</template>

<script>
import {mapGetters} from "vuex";
import {CONSTANTS} from "@/utilites/utilites"
import ComboSlotTouch from "./ComboSlotTouch";
import ModalSelectIcon from "../Modals/SelectIcon";

export default {
  name: "ComboSlot",
  components: {ModalSelectIcon, ComboSlotTouch},
  data(){
    return {
      namesColorSockets: CONSTANTS['namesColorSockets'],
      currentTouch: -1,
      showModalSelectIcon: false,
      rerender: true
    }
  },
  computed: {
    ...mapGetters({
      comboParameters: 'Parameters/comboParameters'
    }),
    currentSocketName() {
      return this.namesColorSockets[this.comboParameters.colorSocket]
    }
  },
  props: {
    slotValue: {
      type: String,
      default: 'NF'
    },
    slotIndex: {
      type: Number,
      default: -1
    },
    mode: {
      type: String,
      default: ""
    }
  },
  methods: {
    getURLImageSocket(){
      return require(`../../assets/img/sockets/${this.currentSocketName}-round.png`)
    },
    getURLImageSocketUSB(){
      return require(`../../assets/img/sockets/${this.currentSocketName}-socket-usb.png`)
    },
    getURLImageUSB(){
      return require(`../../assets/img/sockets/${this.currentSocketName !== "notFound" ? 'color' : this.currentSocketName}-usb.png`)
    },
    getURLImageSK(){
      return require(`../../assets/img/sockets/socket.png`)
    },
    goToSelectIcon(i){
      this.currentTouch = i;
      this.showModalSelectIcon = true;
    },
    selectIcon(icon){
      this.comboParameters.slotsTouchIcons[this.slotIndex][+this.currentTouch - 1] = icon.iconName;
      this.showModalSelectIcon = false
      this.rerender = false;
      setTimeout(() => {
        this.rerender = true;
      },0)
    },
    closeModalSelectIcon(){
      this.showModalSelectIcon = false
    },
  }
}
</script>

<style lang="scss">
.ComboSlot {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &_R1 {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      border-radius: 50%;
      overflow: hidden;
      width: 150px;

    }
    //padding-top: 100%;
  }
  &_RCH2ac {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      width: 150px;

    }
    //padding-top: 100%;
  }
  &_CH2ac {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      width: 150px;

    }
    //padding-top: 100%;
  }
  &_Socket {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      width: 100px;
      position: relative;
      z-index: 1;
    }
    .shadow {
      position: relative;
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 6%;
        right: 6%;
        bottom: 6%;
        left: 6%;
        box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.75);
        border-radius: 14%;
        background-color: #333;
      }
    }    
  }
  &_Switch{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    .ComboSlot__Refresh {
      opacity: 1;
    }
  }
  &__Refresh {
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.25s;
    z-index: 99;
    i {
      display: block;
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>