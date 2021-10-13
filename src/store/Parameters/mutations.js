export default {
  SET_SELECTED_SWITCH_PALETTE(state, payload) {
    state.selectedSwitchPalette = payload
  },
  SET_SELECTED_COMBO_PALETTE(state, payload) {
    state.selectedComboPalette = payload
  },
  SET_TOUCH_PARAMETERS(state, payload) {
    state.touchParameters = payload
  },
  SET_FIELD_TOUCH_PARAMETERS(state, {key, value}) {
    state.touchParameters[key] = value
  },
  SET_COMBO_PARAMETERS(state, payload) {
    state.comboParameters = payload
  },
  SET_ICONS(state, payload) {
    state.icons = payload
  },
  SET_UPDATE_ITEM(state, payload) {
    state.updateItem = payload
  },
  UPDATE_ICONS(state, {index, value}) {
    state.icons[index-1] = value
  },
  RESET_PARAMETERS(state) {
    state.touchParameters = {
      series: '80',
        interface: null,
        inlay: null,
        sensorsCount: 4,
        orientation: null,
        surface: null,
        switchesCount: 1,
        palette: null,
        material: 'stone'
    }
    state.selectedSwitchPalette = {}
    state.icons = []
    state.updateItem = {
      index: -1,
      name: ''
    }
  },
  RESET_PARAMETERS_COMBO(state) {
    state.comboParameters = {
      series: '80',
      slotsCount: 2,
      orientation: "Horizontal",
      material: 'stone',
      surface: null,
      comboCount: 1,
      palette: null,
      // switch params
      switchSensorsCount: null,
      switchOrientation: null,
      switchInlay: null,
      switchInterface: null,
      // socket params
      colorSocket: 'NF',
      selectedSlots: {
        1: null,
        2: null,
        3: null,
        4: null
      },
      slotsTouchIcons: {
        1: [],
        2: [],
        3: [],
        4: []
      }
    }
    state.selectedComboPalette = {}
    state.updateItem = {
      index: -1,
      name: ''
    }
  }
}
