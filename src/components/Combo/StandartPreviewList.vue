<template lang="pug">
  .StandartPreviewList
    h3 Standard combos
    .StandartPreviewListContainer
      ComboSmallPreview(
        v-if="filteredList.length"
        :artikul="artikul"
        v-for="artikul in filteredList"
        :key="artikul + comboParameters.series"
        @select-combo="setArtikul"
        :size-slot="45"
      )
      p(v-if="!filteredList.length") Standard combo for this parameters - 0
</template>

<script>
import {mapGetters} from "vuex";
import ComboSmallPreview from "../SmallPreviev/ComboSmallPreview";

export default {
  name: "StandartPreviewList",
  components: {ComboSmallPreview},
  data() {
    return {
      spaceSlots: 0,
      list: [
        "Combo 2HS80 - 01R1",
        "Combo 2HS80 - V02R1",
        "Combo 2HS80 - H02R1",
        "Combo 2HS80 - 04R1",
        "Combo 2HS80 - R101",
        "Combo 2HS80 - R1V02",
        "Combo 2HS80 - R1H02",
        "Combo 2HS80 - R104",
        "Combo 2VS80 - 01R1",
        "Combo 2VS80 - V02R1",
        "Combo 2VS80 - H02R1",
        "Combo 2VS80 - 04R1",
        "Combo 3HS80 - 01R2",
        "Combo 3HS80 - V02R2",
        "Combo 3HS80 - H02R2",
        "Combo 3HS80 - 04R2",
        "Combo 3HS80 - H08R1",
        "Combo 3HS80 - R201",
        "Combo 3HS80 - R2V02",
        "Combo 3HS80 - R2H02",
        "Combo 3HS80 - R204",
        "Combo 3HS80 - R1H08",
        "Combo 3VS80 - 01R2",
        "Combo 3VS80 - V02R2",
        "Combo 3VS80 - H02R2",
        "Combo 3VS80 - 04R2",
        "Combo 3VS80 - V08R1",
        "Combo 4HS80 - 01R3",
        "Combo 4HS80 - V02R3",
        "Combo 4HS80 - H02R3",
        "Combo 4HS80 - 04R3",
        "Combo 4HS80 - H08R2",
        "Combo 4HS80 - R301",
        "Combo 4HS80 - R3V02",
        "Combo 4HS80 - R3H02",
        "Combo 4HS80 - R304",
        "Combo 4HS80 - R2H08",
        "Combo 4VS80 - 01R3",
        "Combo 4VS80 - V02R3",
        "Combo 4VS80 - H02R3",
        "Combo 4VS80 - 04R3",
        "Combo 4VS80 - V08R2",
        "Combo 2HS85 - 01R1",
        "Combo 2HS85 - V02R1",
        "Combo 2HS85 - H02R1",
        "Combo 2HS85 - 04R1",
        "Combo 2HS85 - R101",
        "Combo 2HS85 - R1V02",
        "Combo 2HS85 - R1H02",
        "Combo 2HS85 - R104",
        "Combo 2VS85 - 01R1",
        "Combo 2VS85 - V02R1",
        "Combo 2VS85 - H02R1",
        "Combo 2VS85 - 04R1",
        "Combo 3HS85 - 01R2",
        "Combo 3HS85 - V02R2",
        "Combo 3HS85 - H02R2",
        "Combo 3HS85 - 04R2",
        "Combo 3HS85 - H08R1",
        "Combo 3HS85 - R201",
        "Combo 3HS85 - R2V02",
        "Combo 3HS85 - R204",
        "Combo 3HS85 - R1H08",
        "Combo 3VS85 - 01R2",
        "Combo 3VS85 - V02R2",
        "Combo 3VS85 - H02R2",
        "Combo 3VS85 - 04R2",
        "Combo 3VS85 - V08R1",
        "Combo 4HS85 - 01R3",
        "Combo 4HS85 - V02R3",
        "Combo 4HS85 - H02R3",
        "Combo 4HS85 - 04R3",
        "Combo 4HS85 - H08R2",
        "Combo 4HS85 - R301",
        "Combo 4HS85 - R3V02",
        "Combo 4HS85 - R3H02",
        "Combo 4HS85 - R304",
        "Combo 4HS85 - R2H08",
        "Combo 4VS85 - 01R3",
        "Combo 4VS85 - V02R3",
        "Combo 4VS85 - H02R3",
        "Combo 4VS85 - 04R3",
        "Combo 4VS85 - V08R2",
        "Combo 2HS90 - V02R1",
        "Combo 2HS90 - H02R1",
        "Combo 2HS90 - 04R1",
        "Combo 2HS90 - R101",
        "Combo 2HS90 - R1V02",
        "Combo 2HS90 - R1H02",
        "Combo 2HS90 - R104",
        "Combo 2HS90 - 01RCH2ac",
        "Combo 2HS90 - V02RCH2ac",
        "Combo 2HS90 - H02RCH2ac",
        "Combo 2HS90 - 04RCH2ac",
        "Combo 2HS90 - RCH2ac01",
        "Combo 2HS90 - RCH2acV02",
        "Combo 2HS90 - RCH2acH02",
        "Combo 2HS90 - RCH2ac04",
        "Combo 2HS90 - 01CH2ac",
        "Combo 2HS90 - V02CH2ac",
        "Combo 2HS90 - H02CH2ac",
        "Combo 2HS90 - 04CH2ac",
        "Combo 2HS90 - CH2ac01",
        "Combo 2HS90 - CH2acV02",
        "Combo 2HS90 - CH2acH02",
        "Combo 2HS90 - CH2ac04",
        "Combo 2VS90 - 01R1",
        "Combo 2VS90 - V02R1",
        "Combo 2VS90 - H02R1",
        "Combo 2VS90 - 04R1",
        "Combo 2VS90 - 01RCH2ac",
        "Combo 2VS90 - V02RCH2ac",
        "Combo 2VS90 - H02RCH2ac",
        "Combo 2VS90 - 04RCH2ac",
        "Combo 2VS90 - 01CH2ac",
        "Combo 2VS90 - V02CH2ac",
        "Combo 2VS90 - H02CH2ac",
        "Combo 2VS90 - 04CH2ac",
        "Combo 3HS90 - 01R2",
        "Combo 3HS90 - 01CH2acR1",
        "Combo 3HS90 - 01R1RCH2ac",
        "Combo 3HS90 - R201",
        "Combo 3HS90 - R1CH2ac01",
        "Combo 3HS90 - RCH2acR101",
        "Combo 3HS90 - V02R2",
        "Combo 3HS90 - V02CH2acR1",
        "Combo 3HS90 - V02R1RCH2ac",
        "Combo 3HS90 - R2V02",
        "Combo 3HS90 - R1CH2acV02",
        "Combo 3HS90 - RCH2acR1V02",
        "Combo 3HS90 - H02R2",
        "Combo 3HS90 - H02CH2acR1",
        "Combo 3HS90 - H02R1RCH2ac",
        "Combo 3HS90 - R2H02",
        "Combo 3HS90 - R1CH2acH02",
        "Combo 3HS90 - RCH2acR1H02",
        "Combo 3HS90 - 04R2",
        "Combo 3HS90 - 04CH2acR1",
        "Combo 3HS90 - 04R1RCH2ac",
        "Combo 3HS90 - R204",
        "Combo 3HS90 - R1CH2ac04",
        "Combo 3HS90 - RCH2acR104",
        "Combo 3HS90 - H08R1",
        "Combo 3HS90 - H08RCH2ac",
        "Combo 3HS90 - H08CH2ac",
        "Combo 3HS90 - R1H08",
        "Combo 3HS90 - RCH2acH08",
        "Combo 3HS90 - CH2acH08",
        "Combo 3VS90 - 01R2",
        "Combo 3VS90 - 01CH2acR1",
        "Combo 3VS90 - 01R1RCH2ac",
        "Combo 3VS90 - V02R2",
        "Combo 3VS90 - V02CH2acR1",
        "Combo 3VS90 - V02R1CH2ac",
        "Combo 3VS90 - V02R1RCH2ac",
        "Combo 3VS90 - H02R2",
        "Combo 3VS90 - H02CH2acR1",
        "Combo 3VS90 - H02R1RCH2ac",
        "Combo 3VS90 - 04R2",
        "Combo 3VS90 - 04CH2acR1",
        "Combo 3VS90 - 04R1RCH2ac",
        "Combo 3VS90 - V08R1",
        "Combo 3VS90 - V08RCH2ac",
        "Combo 3VS90 - V08CH2ac"
      ]
    }
  },
  computed: {
    ...mapGetters({
      comboParameters: 'Parameters/comboParameters'
    }),
    filteredList(){
      let start = 'Combo '
      start += this.comboParameters.slotsCount;
      start += this.comboParameters.orientation.charAt(0).toUpperCase();
      start += 'S' + this.comboParameters.series;

      return this.list.filter(item => item.substr(0, start.length) === start)
    }
  },
  methods: {
    setArtikul(artikul){
      let newArt = this.trimArtikul(artikul)
      let artArray = newArt.split('-')
      this.setParams(artArray[0])
      this.setSlots(artArray[1])
    },
    trimArtikul(artikul){
      return artikul.replace(/\s/g, '');
    },
    setSlots(code){
      let remainder = code;
      for(let i = 1; i < +this.comboParameters.slotsCount + 1; i++){
        if(this.spaceSlots > 0){
          this.spaceSlots--;
        } else {
          remainder = this.firstNameSlot(remainder ,i);
        }
      }
    },
    setParams(code){
      if(code.substr(0, 5).toLowerCase() === 'combo'){
        this.comboParameters.slotsCount = +code.charAt(5)
        this.comboParameters.orientation = code.charAt(6) === "H" ? "Horizontal" : "Vertical"
        this.comboParameters.series = code.substr(8, 2)
      }
    },
    firstNameSlot(code, i){
      let size = 0;
      if(code.substr(0, 2) === '01'){
        this.setSlotToState("01", i);
        size = 2
      } else if(code.substr(0, 2) === '04'){
        this.setSlotToState("04", i);
        size = 2
      } else if(code.substr(0, 2) === 'R1'){
        this.setSlotToState("R1", i);
        size = 2
      } else if(code.substr(0, 2) === 'R2'){
        this.setSlotToState("R1", i);
        this.setSlotToState("R1", i+1);
        this.spaceSlots = 1;
        size = 2
      } else if(code.substr(0, 2) === 'R3'){
        this.setSlotToState("R1", i);
        this.setSlotToState("R1", i+1);
        this.setSlotToState("R1", i+2);
        this.spaceSlots = 2;
        size = 2
      } else if(code.substr(0, 2) === 'R4'){
        this.setSlotToState("R1", i);
        this.setSlotToState("R1", i+1);
        this.setSlotToState("R1", i+2);
        this.setSlotToState("R1", i+3);
        this.spaceSlots = 3;
        size = 2
      } else if(code.substr(0, 2) === 'R5'){
        this.setSlotToState("R1", i);
        this.setSlotToState("R1", i+1);
        this.setSlotToState("R1", i+2);
        this.setSlotToState("R1", i+3);
        this.setSlotToState("R1", i+4);
        this.spaceSlots = 4;
        size = 2
      } else if(code.substr(0, 2) === 'S1'){
        this.setSlotToState("S1", i);
        size = 2
      } else if(code.substr(0, 3) === 'V02'){
        this.setSlotToState("V02", i);
        size = 3
      } else if(code.substr(0, 3) === 'H02'){
        this.setSlotToState("H02", i);
        size = 3
      } else if(code.substr(0, 3) === 'H08'){
        this.setSlotToState("H08", i);
        size = 2
      } else if(code.substr(0, 3) === 'V08'){
        this.setSlotToState("H08", i);
        size = 2
      } else if(code.substr(0, 5) === 'CH2ac'){
        this.setSlotToState("CH2ac", i);
        size = 5
      } else if(code.substr(0, 6) === 'RCH2ac'){
        this.setSlotToState("RCH2ac", i);
        size = 6
      } else if(code.substr(0, 1) === '8'){
        // Пропуск если выбран на предыдущем шаге 8 выключатель и оставили 8 специально
        size = 1
      }
      return code.substr(size)
    },
    setSlotToState(slot, key){
      if(this.comboParameters.series !== "90" && slot === 'R1' ){
        this.comboParameters.selectedSlots[key] = 'S1';
      } else {
        this.comboParameters.selectedSlots[key] = slot;
      }
    }
  }
}
</script>

<style lang="scss">
.StandartPreviewList{
  flex: 0 0 100%;
  width: 100%;
  margin-top: 25px;
  border: 1px solid #fff;
  padding: 15px;
  text-align: center;
  &Container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
    p {
      color: #ffffff;
      font-family: 'Arvo', serif;
      font-size: 20px;
    }
  }
}
</style>