export default () => ({
  touchParameters: {
    series: '80',
    interface: null,
    inlay: null,
    sensorsCount: 4,
    orientation: null,
    surface: null,
    switchesCount: 1,
    palette: null,
    material: 'stone'
  },
  comboParameters: {
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
  },
  selectedSwitchPalette: {},
  selectedComboPalette: {},
  icons: [],
  updateItem: {
    index: -1,
    name: ''
  }
})