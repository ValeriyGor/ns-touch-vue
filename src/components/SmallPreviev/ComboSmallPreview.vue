<template lang="pug">
  .ComboSmallPreview(
    @click="$emit('select-combo', artikul)"
    :data-orientation="orientation.toLowerCase()"
    :style="{backgroundImage: paletteTouch}"
    )
    .ComboSmallPreview__Item(
      v-for="(slot, index) in notEmptySlots"
      :data-inlay="inlay"
      :key="slot + index"
      :style="{...getStylesSize(slot)}"
    )
      .ComboSmallPreview__Item-Slot(v-if="colorSocket.length > 0 && slot === 'R1'")
        img(:src="getURLImageSocket()")
      .ComboSmallPreview__Item-Slot(v-else-if="colorSocket.length > 0 && slot === 'RCH2ac'")
        img(:src="getURLImageSocketUSB()")
      .ComboSmallPreview__Item-Slot(v-else-if="colorSocket.length > 0 && slot === 'CH2ac'")
        img(:src="getURLImageUSB()")
      .ComboSmallPreview__Item-Slot.ComboSmallPreview__Item-S1(v-else-if="slot === 'S1'")
        div.shadow(:class="{'with-sh': palette.length > 0}")
          img(:src="getURLImageSK()")

      .ComboSmallPreview__Item-Slot.ComboSmallPreview__Item-01(v-else-if="slot === '01'")
        div.icon(:style="{backgroundImage: `url(${getIconUrl(0, index)})`}" v-if="slotsIcons[index] && getIconUrl(0, index )")

      .ComboSmallPreview__Item-Slot.ComboSmallPreview__Item-V02(v-else-if="slot === 'V02'")
        div.icon(:style="{backgroundImage: `url(${getIconUrl(i - 1, index)})`}" v-for="i in 2" v-if="slotsIcons[index] && getIconUrl(i - 1, index )")

      .ComboSmallPreview__Item-Slot.ComboSmallPreview__Item-H02(v-else-if="slot === 'H02'")
        div.icon(:style="{backgroundImage: `url(${getIconUrl(i - 1, index)})`}" v-for="i in 2" v-if="slotsIcons[index] && getIconUrl(i - 1, index )")

      .ComboSmallPreview__Item-Slot.ComboSmallPreview__Item-04(v-else-if="slot === '04'")
        div.icon(:style="{backgroundImage: `url(${getIconUrl(i - 1, index)})`}" v-for="i in 4" v-if="slotsIcons[index] && getIconUrl(i - 1, index )")

      .ComboSmallPreview__Item-Slot.ComboSmallPreview__Item-H08(v-else-if="slot === 'H08'")
        .help
        div.icon(:style="{backgroundImage: `url(${getIconUrl(i - 1, index)})`}" v-for="i in 8" v-if="slotsIcons[index] && getIconUrl(i - 1, index )")
        .help

      .ComboSmallPreview__Item-Slot(:class="'ComboSmallPreview__Item-' + slot" v-else)
</template>

<script>
import {CONSTANTS} from "@/utilites/utilites"
export default {
  name: "ComboSmallPreview",
  props: {
    artikul: {
      type: String,
      default: ''
    },
    palette: {
      type: String,
      default: ''
    },
    sizeSlot: {
      type: Number,
      default: 50
    },
    colorSocket: {
      type: String,
      default: ''
    },
    icons: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      paletteItems: CONSTANTS['paletteItems'],
      namesColorSockets: CONSTANTS['namesColorSockets'],
      spaceSlots: 0,
      slots: {
        1: null,
        2: null,
        3: null,
        4: null
      }
    }
  },
  computed: {
    trimArtikul(){
      return this.artikul.replace(/\s/g, '');
    },
    arrayArtikul(){
      return this.trimArtikul.split('-')
    },
    slotsCount(){
      let code = this.arrayArtikul[0]
      if(code.substr(0, 5).toLowerCase() === 'combo'){
        return +code.charAt(5)
      }
      return 1
    },
    orientation(){
      let code = this.arrayArtikul[0]
      if(code.substr(0, 5).toLowerCase() === 'combo'){
        return code.charAt(6) === "H" ? "Horizontal" : "Vertical"
      }
      return 1
    },
    series(){
      let code = this.arrayArtikul[0]
      if(code.substr(0, 5).toLowerCase() === 'combo'){
        return code.substr(8, 2)
      }
      return 1
    },
    inlay(){
      let inlay = 'AL'
      if(this.arrayArtikul[2]) inlay = this.arrayArtikul[2].substr(3, 2)
      return inlay
    },
    notEmptySlots(){
      let arr = []
      Object.keys(this.slots).forEach(slot => {
        if (this.slots[slot]) arr.push(this.slots[slot])
      })
      return arr
    },
    paletteTouch(){
      let url = ''
      this.paletteItems.forEach(palette => {
        if(palette.value === this.palette){
          url = palette.paletteImg;
        }
      })
      return url
    },
    currentSocketName() {
      return this.namesColorSockets[this.colorSocket]
    },
    slotsIcons(){
      let currentIcons = [];
      let currInd = 0;
      if(this.icons.length){
        this.notEmptySlots.forEach((slot, i) => {
          if(slot === '01'){
            currentIcons[i] = this.icons[currInd] ? this.icons[currInd++].slice(0, 1) : currInd++;
          } else if (slot === 'H02') {
            currentIcons[i] = this.icons[currInd] ? this.icons[currInd++].slice(0, 8) : currInd++;
          } else if (slot === 'V02') {
            currentIcons[i] = this.icons[currInd] ? this.icons[currInd++].slice(0, 8) : currInd++;
          } else if (slot === '04') {
            currentIcons[i] = this.icons[currInd] ? this.icons[currInd++].slice(0, 4) : currInd++;
          }  else if (slot === 'H08') {
            currentIcons[i] = this.icons[currInd] ? this.icons[currInd++].slice(0, 8) : currInd++;
          }
        })
      }
      return currentIcons
    },
    colorIcon() {
      let find = this.paletteItems.find(item => item.value === this.palette);
      return find ? find.dataIconColor.charAt(0) : "b"
    },
  },
  mounted() {
    let remainder = this.arrayArtikul[1];
    for(let i = 1; i < this.slotsCount + 1; i++) {
      if (this.spaceSlots > 0) {
        this.spaceSlots--;
      } else {
        remainder = this.firstNameSlot(remainder, i);
      }
    }
  },
  methods: {
    firstNameSlot(code, i){
      let size = 0;
      if(code.substr(0, 2) === '01'){
        this.setSlot("01", i);
        size = 2
      } else if(code.substr(0, 2) === '04'){
        this.setSlot("04", i);
        size = 2
      } else if(code.substr(0, 2) === 'R1'){
        this.setSlot("R1", i);
        size = 2
      } else if(code.substr(0, 2) === 'R2'){
        this.setSlot("R1", i);
        this.setSlot("R1", i+1);
        this.spaceSlots = 1;
        size = 2
      } else if(code.substr(0, 2) === 'R3'){
        this.setSlot("R1", i);
        this.setSlot("R1", i+1);
        this.setSlot("R1", i+2);
        this.spaceSlots = 2;
        size = 2
      } else if(code.substr(0, 2) === 'R4'){
        this.setSlot("R1", i);
        this.setSlot("R1", i+1);
        this.setSlot("R1", i+2);
        this.setSlot("R1", i+3);
        this.spaceSlots = 3;
        size = 2
      } else if(code.substr(0, 2) === 'S1'){
        this.setSlot("S1", i);
        size = 2
      } else if(code.substr(0, 3) === 'V02'){
        this.setSlot("V02", i);
        size = 3
      } else if(code.substr(0, 3) === 'H02'){
        this.setSlot("H02", i);
        size = 3
      } else if(code.substr(0, 3) === 'H08'){
        this.setSlot("H08", i);
        size = 2
      } else if(code.substr(0, 3) === 'V08'){
        this.setSlot("H08", i);
        size = 2
      } else if(code.substr(0, 5) === 'CH2ac'){
        this.setSlot("CH2ac", i);
        size = 5
      } else if(code.substr(0, 6) === 'RCH2ac'){
        this.setSlot("RCH2ac", i);
        size = 6
      } else if(code.substr(0, 1) === '8'){
        // Пропуск если выбран на предыдущем шаге 8 выключатель и оставили 8 специально
        size = 1
      }
      return code.substr(size)
    },
    setSlot(val, key){
      if(this.series !== "90" && val === 'R1'){
        this.slots[key] = 'S1';
      } else {
        this.slots[key] = val;
      }
    },
    getStylesSize(slot){
      let width = this.sizeSlot + 'px';
      let height = this.sizeSlot + 'px';
      if(slot === 'H08'){
        if(this.orientation === 'Horizontal')
          width = this.sizeSlot * 2 + 'px';
        else
          height = this.sizeSlot * 2 + 'px';
      }
      return {width, height}
    },
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
      if(this.palette.length){
        return require(`../../assets/img/sockets/socket.png`)
      } else {
        return require(`../../assets/img/combo-slots/socket.png`)
      }
    },
    getIconUrl(index, arrIndex){
      let imgName = undefined
      if(this.slotsIcons[arrIndex] && this.slotsIcons[arrIndex][index]){
        imgName = `${this.slotsIcons[arrIndex][index]}-${this.colorIcon}.png`
        return require(`../../assets/img/new_icons/${imgName}`)
      }
      return imgName
    },
  }
}
</script>

<style lang="scss">
.ComboSmallPreview{
  display: inline-flex;
  margin: 10px;
  cursor: pointer;
  background-size: cover;
  &[data-orientation="vertical"]{
    flex-direction: column;
    .ComboSmallPreview__Item{
      border-right: 1px solid #929292;
      border-left: 1px solid #929292;
      border-bottom: 1px solid #929292;
      &:first-child{
        border-top: 1px solid #929292;
      }
      &-H08{
        display: flex;
        padding: 5%;
        & > .help{
          height: 100%;
          width: 50%;
          position: relative;
          &:first-child{
            border-right: 1px solid #929292;
            &:after{
              content: "";
              z-index: 9;
              background-color: #fff;
              height: 1px;
              position: absolute;
              left: 0;
              top: 50%;
              right: -100%;
            }
            &:before{
              content: "";
              z-index: 9;
              background-color: #fff;
              height: 1px;
              position: absolute;
              left: 0;
              top: 23%;
              right: -100%;
            }
          }
          &:last-child {
            &:after {
              content: "";
              z-index: 9;
              background-color: #fff;
              height: 1px;
              position: absolute;
              left: -100%;
              top: 77%;
              right: 0;
            }
          }
        }
        .icon {
          width: 20%;

          &:nth-of-type(1) {
            top: 3%;
            left: 5%;
          }

          &:nth-of-type(2) {
            top: 3%;
            left: 53%;
          }

          &:nth-of-type(3) {
            top: 28%;
            left: 3%;
          }

          &:nth-of-type(4) {
            top: 28%;
            left: 53%;
          }

          &:nth-of-type(5) {
            top: 53%;
            left: 3%;
          }

          &:nth-of-type(6) {
            top: 53%;
            left: 53%;
          }

          &:nth-of-type(7) {
            top: 78%;
            left: 3%;
          }

          &:nth-of-type(8) {
            top: 78%;
            left: 53%;
          }
        }
      }
    }
  }
  &[data-orientation="horizontal"]{
    flex-direction: row;
    .ComboSmallPreview__Item{
      border-top: 1px solid #929292;
      border-bottom: 1px solid #929292;
      border-right: 1px solid #929292;
      &:first-child{
        border-left: 1px solid #929292;
      }
      &-H08{
        display: flex;
        flex-direction: column;
        padding: 2.5%;
        & > .help{
          height: 50%;
          width: 100%;
          position: relative;
          &:first-child{
            border-bottom: 1px solid #929292;
            &:after{
              content: "";
              z-index: 9;
              background-color: #fff;
              width: 1px;
              position: absolute;
              top: 0;
              left: 50%;
              bottom: -100%;
            }
            &:before{
              content: "";
              z-index: 9;
              background-color: #fff;
              width: 1px;
              position: absolute;
              top: 0;
              left: 23%;
              bottom: -100%;
            }
          }
          &:last-child {
            &:after {
              content: "";
              z-index: 9;
              background-color: #fff;
              width: 1px;
              position: absolute;
              top: -100%;
              left: 77%;
              bottom: 0;
            }
          }
        }
        .icon{
          width: 10%;
          &:nth-of-type(1){
            top: 5%;
            left: 3%;
          }
          &:nth-of-type(2){
            top: 5%;
            left: 28%;
          }
          &:nth-of-type(3){
            top: 5%;
            left: 53%;
          }
          &:nth-of-type(4){
            top: 5%;
            left: 78%;
          }
          &:nth-of-type(5){
            top: 55%;
            left: 3%;
          }
          &:nth-of-type(6){
            top: 55%;
            left: 28%;
          }
          &:nth-of-type(7){
            top: 55%;
            left: 53%;
          }
          &:nth-of-type(8){
            top: 55%;
            left: 78%;
          }
        }
      }
    }
  }
  &__Item{
    display: flex;
    position: relative;
    &-Slot{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      .icon{
        width: 20%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        &:after{
          content: "";
          display: block;
          padding-top: 100%;
          width: 100%;
        }
        &:nth-child(1){
          top: 5%;
          left: 5%;
        }
        &:nth-child(2){
          top: 5%;
          left: 55%;
        }
        &:nth-child(3){
          top: 55%;
          left: 5%;
        }
        &:nth-child(4){
          top: 55%;
          left: 55%;
        }
      }
    }
    &-R1{
      background: url("../../assets/img/sockets/notFound-round.png") center no-repeat;
      background-size: 100%;
    }
    &-RCH2ac{
      background: url("../../assets/img/sockets/notFound-socket-usb.png") center no-repeat;
      background-size: 100%;
    }
    &-CH2ac{
      background: url("../../assets/img/sockets/notFound-usb.png") center no-repeat;
      background-size: 100%;
    }
    &-S1{
      display: flex;
      align-items: center;
      justify-content: center;
      .shadow {
        position: relative;
        width: 70%;
        &.with-sh{
          &:after {
            content: "";
            display: block;
            position: absolute;
            top: 6%;
            right: 6%;
            bottom: 6%;
            left: 6%;
            box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.75);
            border-radius: 12%;
            background-color: #333;
          }
        }
      }
      img{
        display: block;
        width: 100%;
      }
    }
    &-V02{
      &:after{
        position: absolute;
        content: "";
        width: 1px;
        top: 5%;
        bottom: 5%;
        left: calc(50% - 1px);
        background-color: #929292;
      }
    }
    &-H02{
      &:after{
        position: absolute;
        content: "";
        height: 1px;
        left: 5%;
        right: 5%;
        top: calc(50% - 1px);
        background-color: #929292;
      }
      .icon{
        &:nth-child(2){
          top: 55%;
          left: 5%;
        }
      }
    }
    &-04{
      &:after{
        position: absolute;
        content: "";
        height: 1px;
        left: 5%;
        right: 5%;
        top: calc(50% - 1px);
        background-color: #929292;
      }
      &:before{
        position: absolute;
        content: "";
        width: 1px;
        top: 5%;
        bottom: 5%;
        left: calc(50% - 1px);
        background-color: #929292;
      }
    }
    &[data-inlay="BR"]{
      .ComboSmallPreview__Item-Slot:after, .ComboSmallPreview__Item-Slot:before{
        background-color: #FEDC6F;
      }
    }
  }
}
</style>