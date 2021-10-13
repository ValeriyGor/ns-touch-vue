<template>
  <div class="flex justify-between align-start wrap color-touch__container">
    <label class="color-touch" v-for="palette in paletteItems" :key="palette.id">
      <input
        type="radio"
        name="touch-color"
        v-model="touchParameters.palette"
        class="touch-color"
        :value="palette.value"
        @change="selectSwitchPalette(palette)"
        v-if="forTo === 'switch'"
      >
      <input
        type="radio"
        name="combo-color"
        v-model="comboParameters.palette"
        class="touch-color"
        :value="palette.value"
        @change="selectComboPalette(palette)"
        v-if="forTo === 'combo'"
      >
      <div
          class="form-create-touch__color text-primary"
          :style="{backgroundImage: palette.paletteImg}"></div>
      <span>{{palette.value}}</span>
    </label>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {CONSTANTS} from "@/utilites/utilites"
export default {
  name: "Palette",
  data(){
    return {
      paletteItems: CONSTANTS['paletteItems'],
    }
  },
  props: {
    forTo: {
      type: String,
      default: 'switch'
    }
  },
  computed: {
    ...mapGetters({
      touchParameters: 'Parameters/touchParameters',
      comboParameters: 'Parameters/comboParameters',
    }),
  },
  methods: {
    ...mapMutations({
      SET_SELECTED_SWITCH_PALETTE: 'Parameters/SET_SELECTED_SWITCH_PALETTE',
      SET_SELECTED_COMBO_PALETTE: 'Parameters/SET_SELECTED_COMBO_PALETTE',
    }),
    selectSwitchPalette(palette){
      this.SET_SELECTED_SWITCH_PALETTE(palette)
    },
    selectComboPalette(palette){
      this.SET_SELECTED_COMBO_PALETTE(palette)
    }
  }
}
</script>