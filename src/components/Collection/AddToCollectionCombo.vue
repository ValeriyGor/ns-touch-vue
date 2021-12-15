<template lang="pug">
  div
    div.form-create-touch.form-create-touch__setting-item
      div.form-create-touch__num(:class="{'validate': comboName.length}") {{number}}
      div.form-create-touch__item
        label.text-primary
          input(type="text" :placeholder="`Name ${mode === 'combo' ? 'combo' : 'frames'}`" class="form-create-touch__input" v-model="comboName")
    button(type="button" @click="AddToCollectionCombo" class="addToCollection__button" :class="{'updateItem': updateItem.index !== -1}")
      span Add to collection
      span Update touch

</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "AddToCollectionCombo",
  props: {
    number: {
      type: Number,
      default: 10
    },
    mode: {
      type: String,
      default: ""
    }
  },
  data(){
    return {
      comboName: ''
    }
  },
  computed: {
    ...mapGetters({
      comboParameters: "Parameters/comboParameters",
      selectedComboPalette: "Parameters/selectedComboPalette",
      currentComboArtikul: "Parameters/currentComboArtikul",
      updateItem: "Parameters/updateItem",
    }),
    isSwitch(){
      let isSwitch = false;
      Object.keys(this.comboParameters.selectedSlots).forEach(key => {
        if(
            this.comboParameters.selectedSlots[key] === '01' ||
            this.comboParameters.selectedSlots[key] === '11' ||
            this.comboParameters.selectedSlots[key] === '21' ||
            this.comboParameters.selectedSlots[key] === 'V02' ||
            this.comboParameters.selectedSlots[key] === 'V12' ||
            this.comboParameters.selectedSlots[key] === 'V22' ||
            this.comboParameters.selectedSlots[key] === 'H02' ||
            this.comboParameters.selectedSlots[key] === 'H12' ||
            this.comboParameters.selectedSlots[key] === 'H22' ||
            this.comboParameters.selectedSlots[key] === '04' ||
            this.comboParameters.selectedSlots[key] === '14' ||
            this.comboParameters.selectedSlots[key] === '24' ||
            this.comboParameters.selectedSlots[key] === 'H08' ||
            this.comboParameters.selectedSlots[key] === 'H18' ||
            this.comboParameters.selectedSlots[key] === 'H28' ||
            this.comboParameters.selectedSlots[key] === 'V08' ||
            this.comboParameters.selectedSlots[key] === 'V18' ||
            this.comboParameters.selectedSlots[key] === 'V28'
        ){
          isSwitch = true
        }
      })
      return isSwitch
    }
  },
  methods: {
    ...mapMutations({
      ADD_TO_COLLECTION: "Collection/ADD_TO_COLLECTION",
      UPDATE_COLLECTION_ITEM: "Collection/UPDATE_COLLECTION_ITEM",
      RESET_PARAMETERS_COMBO: "Parameters/RESET_PARAMETERS_COMBO",
    }),
    AddToCollectionCombo(){
      let newItem = {}
      if(this.comboParameters.material === 'stone' && !Object.keys(this.selectedComboPalette).length){
        this.$message.error("Select palette of stone")
        return false;
      }
      if(!this.comboParameters.surface){
        this.$message.error("Select surface")
        return false;
      }
      if(this.isSwitch){
        if(!this.comboParameters.switchInlay){
          this.$message.error("Select inlay")
          return false;
        }
        if(!this.comboParameters.switchInterface){
          this.$message.error("Select electronics")
          return false;
        }
      }
      // if(!this.validateIcons()){
      //   this.$message.error("You have empty icons on switch")
      //   return false;
      // }
      if(!this.comboName){
        this.$message.error("Enter name of combo")
        return false;
      }
      newItem.artikul = this.currentComboArtikul;
      newItem.parameters = {...JSON.parse(JSON.stringify(this.comboParameters))};
      newItem.name = this.comboName;
      newItem.type = this.mode;
      if(this.updateItem.index !== -1){
        this.UPDATE_COLLECTION_ITEM({i: this.updateItem.index, newItem})
        this.$message.success("Combo updated success!")
      } else {
        this.ADD_TO_COLLECTION(newItem)
        this.$message.success("Combo added success!")
      }
      this.comboName = ''
      // this.RESET_PARAMETERS_COMBO();
    },
    // validateIcons(){
    //   let sensors = +this.comboParameters.sensorsCount;
    //   let valid = true;
    //   for(let i = 0; i < sensors; i++){
    //     if(!this.icons[i]){
    //       valid = false;
    //     }
    //   }
    //   return valid
    // }
  },
  watch: {
    updateItem(){
      this.comboName = this.updateItem.name
    }
  },
  created() {
    if(this.updateItem.index > -1){
      this.comboName = this.updateItem.name;
    }
  }
}
</script>

<style lang="scss">
.addToCollection__button{
  &.updateItem{
    background-color: #E6A23C;
    border-color: #E6A23C;
    color: #fff;
  }
}
.form-create-touch__input{
  padding: 8px 15px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #009fe3;
  outline: none;
}

.form-create-touch__num.validate{
  background-color: #009fe3;
}

</style>