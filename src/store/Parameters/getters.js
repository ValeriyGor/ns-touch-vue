export default {
  touchParameters: state => state.touchParameters,
  comboParameters: state => state.comboParameters,
  selectedSwitchPalette: state => state.selectedSwitchPalette,
  selectedComboPalette: state => state.selectedComboPalette,
  updateItem: state => state.updateItem,
  icons: state => state.icons,
  currentTouchArtikul: state => {
    let a = state.touchParameters.material.charAt(0).toUpperCase();
    a += state.touchParameters.series ? state.touchParameters.series : 'XX';
    a += '-';
    a += +state.touchParameters.sensorsCount === 1 || +state.touchParameters.sensorsCount === 4 ? '' : state.touchParameters.orientation ? state.touchParameters.orientation.charAt(0).toUpperCase() : 'X';
    switch (state.touchParameters.interface){
      case 'DRY CONTACT':
        a += '0'
        break;
      case '220 V':
        a += '1'
        break;
      case 'FOR KNX':
        a += '2'
        break;
      default:
        a += 'X'
    }
    a += state.touchParameters.sensorsCount ? state.touchParameters.sensorsCount : 'X'
    a += '-';
    a += state.selectedSwitchPalette.dataArticul ? state.selectedSwitchPalette.dataArticul : 'XX';
    a += state.touchParameters.surface ? state.touchParameters.surface === 'Matte' ? '3' : '7' : 'X'
    a += state.touchParameters.inlay ? state.touchParameters.inlay.substr(0, 2).toUpperCase() : 'XX';
    return a
  },
  currentComboArtikul: state => {
    let slots = Object.keys(state.comboParameters.selectedSlots).map(slot => state.comboParameters.selectedSlots[slot] ? state.comboParameters.selectedSlots[slot] : '**').slice(0, +state.comboParameters.slotsCount);
    let filteredSlots = [],
        currentIndex = 0,
        switchInterface = 'X';
    switch (state.comboParameters.switchInterface){
      case 'DRY CONTACT':
        switchInterface = '0'
        break;
      case '220 V':
        switchInterface = '1'
        break;
      case 'FOR KNX':
        switchInterface = '2'
        break;
      default:
        switchInterface = 'X'
    }
    slots.forEach((slot, index) => {
      if (slot.length === 3 && slot[0] === 'H' && slot[2] === '8') {
        if(state.comboParameters.orientation === "Vertical"){
          filteredSlots.push(`V${switchInterface}8`)
        } else {
          filteredSlots.push(`H${switchInterface}8`)
        }
        currentIndex++;
      } else if (slots[index - 1] && (slots[index - 1] === 'H08' || slots[index - 1] === 'H18' || slots[index - 1] === 'H28')) {
        // console.log('Пропуск')
      }  else if((slot === 'R1' || slot === 'S1') && (filteredSlots[currentIndex] === 'R1' || filteredSlots[currentIndex] === 'R2' || filteredSlots[currentIndex] === 'R3' || filteredSlots[currentIndex] === 'R4')){
        filteredSlots[currentIndex] = 'R' + (+filteredSlots[currentIndex].charAt(1) + 1);
      } else if (slot === 'S1' || slot === 'R1'){
        filteredSlots.push('R1')
      } else if (slot.length === 3 && ( slot[0] === 'H' || slot[0] === 'V') && (slot[2] === '2')) {
        filteredSlots.push(slot[0] + switchInterface + slot[2])
        currentIndex++;
      } else if(slot.length === 2 && (slot[1] === '1' || slot[1] === '4')) {
        filteredSlots.push(switchInterface + slot[1])
        currentIndex++;
      } else {
        filteredSlots.push(slot)
        currentIndex++;
      }
    })
    let a = 'Combo ';
    a += state.comboParameters.slotsCount;
    a += state.comboParameters.orientation ? state.comboParameters.orientation.charAt(0).toUpperCase() : 'X';
    a += state.comboParameters.series ? `S${state.comboParameters.series}` : 'XXX'
    a += '-'
    a += filteredSlots.join('');
    a += '-';
    a += state.selectedComboPalette.dataArticul ? state.selectedComboPalette.dataArticul : 'XX';
    a += state.comboParameters.surface ? state.comboParameters.surface === 'Matte' ? '3' : '7' : 'X';
    if(
        filteredSlots.includes('01') ||
        filteredSlots.includes('11') ||
        filteredSlots.includes('21') ||
        filteredSlots.includes('V02') ||
        filteredSlots.includes('V12') ||
        filteredSlots.includes('V22') ||
        filteredSlots.includes('H02') ||
        filteredSlots.includes('H12') ||
        filteredSlots.includes('H22') ||
        filteredSlots.includes('04') ||
        filteredSlots.includes('14') ||
        filteredSlots.includes('24') ||
        filteredSlots.includes('H08') ||
        filteredSlots.includes('H18') ||
        filteredSlots.includes('H28') ||
        filteredSlots.includes('V08') ||
        filteredSlots.includes('V18') ||
        filteredSlots.includes('V28')
    ){
      a += state.comboParameters.switchInlay ? state.comboParameters.switchInlay.substr(0, 2).toUpperCase() : 'XX';
    }
    if(state.comboParameters.colorSocket !== 'NF' && state.comboParameters.series === '90' && slots.slice(0, state.comboParameters.slotsCount).includes('R1')){
      a += '-';
      a += state.comboParameters.colorSocket ? state.comboParameters.colorSocket : 'XX'
    }
    return a
  }
}
