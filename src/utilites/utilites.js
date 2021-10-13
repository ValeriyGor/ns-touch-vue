export const CONSTANTS = {
  paletteItems: [
    {
      paletteImg: 'url('+require('../assets/img/new_back/designer_white.jpg')+')',
      dataIconColor: 'black',
      dataArticul: "DW",
      value: "Designer White"
    },
    {
      paletteImg: 'url('+require('../assets/img/new_back/arctic_ice.jpg')+')',
      dataIconColor: 'black',
      dataArticul: "AI",
      value: "Arctic Ice"
    },
    {
      paletteImg: 'url('+require('../assets/img/new_back/carbon_concrete.jpg')+')',
      dataIconColor: 'white',
      dataArticul: "CC",
      value: "Carbon Concrete"
    },
    {
      paletteImg: 'url('+require('../assets/img/new_back/deep_titanium.jpg')+')',
      dataIconColor: 'white',
      dataArticul: "DT",
      value: "Deep Titanium"
    },
    {
      paletteImg: 'url('+require('../assets/img/new_back/white_onyx.jpg')+')',
      dataIconColor: 'black',
      dataArticul: "WO",
      value: "White Onyx"
    },
    {
      paletteImg: 'url('+require('../assets/img/new_back/gray_onyx.jpg')+')',
      dataIconColor: 'black',
      dataArticul: "GO",
      value: "Gray Onyx"
    },
    {
      paletteImg: 'url('+require('../assets/img/new_back/carbon_aggregate.jpg')+')',
      dataIconColor: 'white',
      dataArticul: "CA",
      value: "Carbon Aggregate"
    },
    {
      paletteImg: 'url('+require('../assets/img/new_back/deep_espresso.jpg')+')',
      dataIconColor: 'white',
      dataArticul: "DE",
      value: "Deep Espresso"
    },
    {
      paletteImg: 'url('+require('../assets/img/new_back/rain_cloud.jpg')+')',
      dataIconColor: 'black',
      dataArticul: "RC",
      value: "Rain Cloud"
    },
    {
      paletteImg: 'url('+require('../assets/img/new_back/athena_gray.jpg')+')',
      dataIconColor: 'white',
      dataArticul: "AG",
      value: "Athena Gray"
    },
    {
      paletteImg: 'url('+require('../assets/img/new_back/evening_prima.jpg')+')',
      dataIconColor: 'white',
      dataArticul: "EP",
      value: "Evening Prima"
    },
    {
      paletteImg: 'url('+require('../assets/img/new_back/deep_nocturne.jpg')+')',
      dataIconColor: 'white',
      dataArticul: "DN",
      value: "Deep Nocturne"
    },
  ],
  namesColorSockets: {
    SL: "aluminum",
    AM: "anthracitMat",
    WG: 'WhiteGloss',
    BG: 'blackGloss',
    CH: 'Champagne',
    WM: 'WhiteMat',
    BM: 'blackMat',
    MO: 'Mokko',
    NF: 'notFound'
  }
}

export function getСipherIcons (count, icons) {
  let iconArr = icons.slice(0, count);
  return iconArr.join('&')
}