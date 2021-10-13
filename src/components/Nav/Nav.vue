<template lang="pug">
  div.Nav-NsTouch
    h2(@click="selectTab('')" :class="{'active': selectedTab === ''}") Switch Constructor
    h2(@click="selectTab('combo')" :class="{'active': selectedTab === 'combo'}") Combo Constructor
    h2(@click="selectTab('sockets')" :class="{'active': selectedTab === 'sockets'}") Frames & Sockets

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Nav",
  props: {
    selectedTab: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      comboParameters: 'Parameters/comboParameters',
    }),
  },
  methods: {
    selectTab(tab){
      if(tab === 'combo'){
        Object.keys(this.comboParameters.selectedSlots).forEach(item => {
          this.comboParameters.selectedSlots[item] = null;
        })
      } else if (tab === 'sockets') {
        Object.keys(this.comboParameters.selectedSlots).forEach(item => {
          if(this.comboParameters.series !== '90'){
            this.comboParameters.selectedSlots[item] = 'S1'
          } else {
            this.comboParameters.selectedSlots[item] = 'R1'
          }
        })
      }
      this.$emit('change', tab)
    }
  }
}
</script>

<style lang="scss">
.Nav-NsTouch{
  display: flex;
  padding: 20px 0 10px;
  h2{
    padding: 5px 10px;
    margin-right: 5px;
    cursor: pointer;
    &.active{
      border-bottom: 1px solid #009fe3;
    }
  }
}

@media all and (max-width: 767px){
  .Nav-NsTouch{
    h2{
      font-size: 14px;
    }
  }
}
</style>