<template lang="pug">
  div.SmallPreview(:style="{width: sensorWidth}")
    .SmallPreview__Touch(
      v-if="parameters.sensorsCount"
      :data-count="parameters.sensorsCount"
      :data-orientation="parameters.orientation ? parameters.orientation.toLowerCase() : 'H'"
      :data-inlay="parameters.inlay.toLowerCase()"
      :data-series="parameters.series"
      :style="{width: sensorWidth, backgroundImage: paletteTouch}"
    )
      .SmallPreview__Sensor(v-for="(parameter, i) in +parameters.sensorsCount" :key="i")
        img(class="SmallPreview__Icon" :src="require(`../../assets/img/new_icons/${icons[i]}-${iconColor}.png`)")

</template>

<script>
import {CONSTANTS} from "@/utilites/utilites"
export default {
  name: "SmallPreview",
  props: {
    parameters: {
      type: Object,
      default: () => {}
    },
    icons: {
      type: Array,
      default: () => {}
    },
    touchWidth: {
      type: Number,
      default: 40
    },
  },
  data(){
    return {
      paletteItems: CONSTANTS['paletteItems'],
    }
  },
  computed: {
    sensorWidth(){
      let koef = 1;
      let width = this.touchWidth * 2
      switch(+this.parameters.sensorsCount){
        case 2:
          width = this.touchWidth * +this.parameters.sensorsCount;
          break;
        case 6:
          width = this.touchWidth * +this.parameters.sensorsCount / (this.parameters.orientation.toLowerCase() === 'horizontal' ? 2 : 3);
          break;
        case 8:
          width = this.touchWidth * +this.parameters.sensorsCount / (this.parameters.orientation.toLowerCase() === 'horizontal' ? 2 : 4);
          break;
      }
      switch(+this.parameters.series){
        case 85:
          koef = 1.06;
          break;
        case 90:
          koef = 1.12;
          break;
      }
      return width*koef + 'px'
    },
    paletteTouch(){
      let url = ''
      this.paletteItems.forEach(palette => {
        if(palette.value === this.parameters.palette){
          url = palette.paletteImg;
        }
      })
      return url
    },
    iconColor(){
      let color = ''
      this.paletteItems.forEach(palette => {
        if(palette.value === this.parameters.palette){
          color = palette.dataIconColor.charAt(0);
        }
      })
      return color
    }
  }
}
</script>

<style lang="scss">
.SmallPreview{
  padding: 5px 0;
  margin: 0 auto;
  &__Sensor{
    position: relative;
    flex: 0 0 100%;
    max-width: 100%;
    &:after{
      content: "";
      padding-top: 100%;
      display: block;
    }
  }
  &__Touch{
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0 0 5px rgba(150, 150, 150, 0.5);
    margin: 0 auto;
    .SmallPreview__Sensor{
      .SmallPreview__Icon{
        transition: all 0.3s;
      }
      &:hover{
        .SmallPreview__Icon{
          width: 80%;
          max-width: 80%;
        }
      }
    }
    &[data-count="1"]{
      .SmallPreview__Icon{
        max-width: 30%;
      }
      .SmallPreview__Sensor{
        &:hover{
          .SmallPreview__Icon{
            width: 50%;
            max-width: 50%;
          }
        }
      }
    }
    &[data-count="2"]{
      display: flex;
      &[data-orientation="vertical"]{
        .SmallPreview__Sensor{
          flex: 0 0 50%;
          &:after{
            padding-top: 200%;
          }
        }
        &[data-inlay="brass"]{
          .SmallPreview__Sensor:first-child{
            border-right: 1px solid #FEDC6F;
          }
        }
        &[data-inlay="aluminium"]{
          .SmallPreview__Sensor:first-child{
            border-right: 1px solid #929292;
          }
        }
      }
      &[data-orientation="horizontal"]{
        flex-wrap: wrap;
        .SmallPreview__Sensor{
          flex: 0 0 100%;
          &:after{
            padding-top: 50%;
          }
          &:hover{
             .SmallPreview__Icon{
               width: 40%;
               max-width: 40%;
             }
           }
        }
        &[data-inlay="brass"]{
          .SmallPreview__Sensor:first-child{
            border-bottom: 1px solid #FEDC6F;
          }
        }
        &[data-inlay="aluminium"]{
          .SmallPreview__Sensor:first-child{
            border-bottom: 1px solid #929292;
          }
        }
      }
      .SmallPreview__Icon{
        max-width: 25px;
      }
    }
    &[data-count="4"]{
      display: flex;
      flex-wrap: wrap;
      .SmallPreview__Sensor{
        flex: 0 0 50%;
        &:after{
          padding-top: 100%;
        }
      }
      &[data-inlay="brass"]{
        .SmallPreview__Sensor:first-child{
          border-right: 1px solid #FEDC6F;
          border-bottom: 1px solid #FEDC6F;
        }
        .SmallPreview__Sensor:nth-child(2){
          border-bottom: 1px solid #FEDC6F;
        }
        .SmallPreview__Sensor:nth-child(3){
          border-right: 1px solid #FEDC6F;
        }
      }
      &[data-inlay="aluminium"]{
        .SmallPreview__Sensor:first-child{
          border-right: 1px solid #929292;
          border-bottom: 1px solid #929292;
        }
        .SmallPreview__Sensor:nth-child(2){
          border-bottom: 1px solid #929292;
        }
        .SmallPreview__Sensor:nth-child(3){
          border-right: 1px solid #929292;
        }
      }
      .SmallPreview__Icon{
        max-width: 50%;
      }
    }

    &[data-count="6"]{
      display: flex;
      flex-wrap: wrap;
      &[data-orientation="vertical"]{
        .SmallPreview__Sensor{
          flex: 0 0 50%;
          max-width: 50%;
        }
        &[data-inlay="brass"]{
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(5){
            border-right: 1px solid #FEDC6F;
          }
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(4){
            border-bottom: 1px solid #FEDC6F;
          }
        }
        &[data-inlay="aluminium"]{
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(5){
            border-right: 1px solid #929292;
          }
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(4){
            border-bottom: 1px solid #929292;
          }
        }
      }
      &[data-orientation="horizontal"]{
        flex-wrap: wrap;
        .SmallPreview__Sensor{
          flex: 0 0 33.3%;
        }
        &[data-inlay="brass"]{
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(4), .SmallPreview__Sensor:nth-child(5){
            border-right: 1px solid #FEDC6F;
          }
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(3){
            border-bottom: 1px solid #FEDC6F;
          }
        }
        &[data-inlay="aluminium"]{
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(4), .SmallPreview__Sensor:nth-child(5){
            border-right: 1px solid #929292;
          }
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(3){
            border-bottom: 1px solid #929292;
          }
        }
      }
      .SmallPreview__Icon{
        max-width: 50%;
      }
    }
    &[data-count="8"]{
      display: flex;
      flex-wrap: wrap;
      &[data-orientation="vertical"]{
        .SmallPreview__Sensor{
          flex: 0 0 50%;
          max-width: 50%;
        }
        &[data-inlay="brass"]{
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(5), .SmallPreview__Sensor:nth-child(7){
            border-right: 1px solid #FEDC6F;
          }
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(4), .SmallPreview__Sensor:nth-child(5), .SmallPreview__Sensor:nth-child(6){
            border-bottom: 1px solid #FEDC6F;
          }
        }
        &[data-inlay="aluminium"]{
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(5), .SmallPreview__Sensor:nth-child(7){
            border-right: 1px solid #929292;
          }
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(4), .SmallPreview__Sensor:nth-child(5), .SmallPreview__Sensor:nth-child(6){
            border-bottom: 1px solid #929292;
          }
        }
      }
      &[data-orientation="horizontal"]{
        flex-wrap: wrap;
        .SmallPreview__Sensor{
          flex: 0 0 25%;
        }
        &[data-inlay="brass"]{
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(5), .SmallPreview__Sensor:nth-child(6), .SmallPreview__Sensor:nth-child(7){
            border-right: 1px solid #FEDC6F;
          }
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(4){
            border-bottom: 1px solid #FEDC6F;
          }
        }
        &[data-inlay="aluminium"]{
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(5), .SmallPreview__Sensor:nth-child(6), .SmallPreview__Sensor:nth-child(7){
            border-right: 1px solid #929292;
          }
          .SmallPreview__Sensor:nth-child(1), .SmallPreview__Sensor:nth-child(2), .SmallPreview__Sensor:nth-child(3), .SmallPreview__Sensor:nth-child(4){
            border-bottom: 1px solid #929292;
          }
        }
      }
      .SmallPreview__Icon{
        max-width: 50%;
      }
    }
    &[data-series="85"]{
      padding: 3%;
    }
    &[data-series="90"]{
      padding: 6%;
    }
  }
  &__Icon{
    position: absolute;
    max-width: 60%;
    top: 5%;
    left: 5%;
  }
}
</style>