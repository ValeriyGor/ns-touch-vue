<template>
  <div class="select-icon" :class="{'opened': isVisible}">
    <div class="select-icon__list">
      <div class="select-icon__close" @click="closeModal">&#10006;</div>
      <div class="select-icon__item" v-for="(icon, i) in icons" @click="selectIcon(icon)" :key="i">
        <img :src="require(`../../assets/img/new_icons/${icon.iconName}-b.png`)" :alt="i+1">
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "ModalSelectIcon",
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    currentTouch: {
      type: Number,
      default: -1
    },
    destination: {
      type: String,
      default: 'switch'
    }
  },
  data() {
    return {
      icons: [
        { iconName: '1' },
        { iconName: '2' },
        { iconName: '3' },
        { iconName: '4' },
        { iconName: '5' },
        { iconName: '6' },
        { iconName: '7' },
        { iconName: '8' },
        { iconName: '9' },
        { iconName: '10' },
        { iconName: '11' },
        { iconName: '12' },
        { iconName: '13' },
        { iconName: '14' },
        { iconName: '15' },
        { iconName: '16' },
        { iconName: '17' },
        { iconName: '18' },
        { iconName: '19' },
        { iconName: '20' },
        { iconName: '21' },
        { iconName: '22' },
        { iconName: '23' },
        { iconName: '24' },
        { iconName: '25' },
        { iconName: '26' },
        { iconName: '27' },
        { iconName: '28' },
        { iconName: '29' },
        { iconName: '30' },
        { iconName: '31' },
        { iconName: '32' },
        { iconName: '33' },
        { iconName: '34' },
        { iconName: '35' },
        { iconName: '36' },
        { iconName: '37' },
        { iconName: '38' },
        { iconName: '39' },
        { iconName: '40' },
        { iconName: '41' },
        { iconName: '42' },
        { iconName: '43' },
        { iconName: '44' },
        { iconName: '45' },
        { iconName: '46' },
        { iconName: '47' },
        { iconName: '48' },
        { iconName: '49' },
        { iconName: '50' },
        { iconName: '51' },
        { iconName: '52' },
        { iconName: '53' },
        { iconName: '54' },
        { iconName: '55' },
        { iconName: '56' },
        { iconName: '57' },
        { iconName: '58' },
        { iconName: '59' },
        { iconName: '60' },
        { iconName: '61' },
        { iconName: '62' },
        { iconName: '63' },
        { iconName: '64' },
        { iconName: '65' },
        { iconName: '66' },
        { iconName: '67' },
        { iconName: '68' },
        { iconName: '69' },
        { iconName: '70' },
        { iconName: '71' },
        { iconName: '72' },
        { iconName: '73' },
        { iconName: '74' },
        { iconName: '75' },
        { iconName: '76' },
        { iconName: '77' },
        { iconName: '78' },
        { iconName: '79' },
        { iconName: '80' },
        { iconName: '81' },
        { iconName: '82' },
        { iconName: '83' },
        { iconName: '84' },
        { iconName: '85' },
        { iconName: '86' },
        { iconName: '87' },
        { iconName: '88' },
        { iconName: '89' },
        { iconName: '90' },
        { iconName: '91' },
        { iconName: '92' },
        { iconName: '93' },
        { iconName: '94' },
        { iconName: '95' },
        { iconName: '96' },
        { iconName: '97' },
        { iconName: '98' },
        { iconName: '99' },
        { iconName: '100' },
      ]
    }
  },
  methods: {
    ...mapMutations({
      UPDATE_ICONS: "Parameters/UPDATE_ICONS"
    }),
    closeModal(){
      this.$emit('close')
    },
    selectIcon(icon){
      if(this.destination === 'switch'){
        let data = {
          index: this.currentTouch,
          value: icon.iconName
        }
        this.UPDATE_ICONS(data);
        this.$emit('close');
      } else if (this.destination === 'combo'){
        this.$emit('select-icon', icon)
      }
    }
  }
}
</script>

<style lang="scss">
  .select-icon.opened{
    display: flex;
  }
</style>