<template lang="pug">
  div
    div.form-create-touch.form-create-touch__setting-item
      div.form-create-touch__num(:class="{'validate': switchName.length}") 9
      div.form-create-touch__item
        label.text-primary
          input(type="text" placeholder="Name switch" class="form-create-touch__input" v-model="switchName")
    button(type="button" @click="addToCollection" class="addToCollection__button" :class="{'updateItem': updateItem.index !== -1}")
      span Add to collection
      span Update touch

</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "AddToCollection",
  data(){
    return {
      switchName: ''
    }
  },
  computed: {
    ...mapGetters({
      touchParameters: "Parameters/touchParameters",
      icons: "Parameters/icons",
      selectedSwitchPalette: "Parameters/selectedSwitchPalette",
      currentTouchArtikul: "Parameters/currentTouchArtikul",
      updateItem: "Parameters/updateItem",
    })
  },
  methods: {
    ...mapMutations({
      ADD_TO_COLLECTION: "Collection/ADD_TO_COLLECTION",
      UPDATE_COLLECTION_ITEM: "Collection/UPDATE_COLLECTION_ITEM",
      RESET_PARAMETERS: "Parameters/RESET_PARAMETERS",
    }),
    addToCollection(){
      let newItem = {}
      if(!this.touchParameters.orientation){
        if(+this.touchParameters.sensorsCount !== 1 && +this.touchParameters.sensorsCount !== 4){
          this.$message.error("Select orientation")
          return false;
        }
      }
      if(this.touchParameters.material === 'stone' && !Object.keys(this.selectedSwitchPalette).length){
        this.$message.error("Select palette of stone")
        return false;
      }
      if(!this.touchParameters.surface){
        this.$message.error("Select surface")
        return false;
      }
      if(!this.touchParameters.inlay){
        this.$message.error("Select inlay")
        return false;
      }
      if(!this.touchParameters.interface){
        this.$message.error("Select electronics")
        return false;
      }
      if(!this.validateIcons()){
        this.$message.error("You have empty icons on switch")
        return false;
      }
      if(!this.switchName){
        this.$message.error("Enter name of switch")
        return false;
      }
      newItem.artikul = this.currentTouchArtikul;
      newItem.parameters = {...this.touchParameters};
      newItem.icons = [...this.icons];
      newItem.name = this.switchName;
      newItem.type = 'switch';
      if(this.updateItem.index !== -1){
        this.UPDATE_COLLECTION_ITEM({i: this.updateItem.index, newItem})
        this.$message.success("Switch updated success!")
      } else {
        this.ADD_TO_COLLECTION(newItem)
        this.$message.success("Switch added success!")
      }
      this.switchName = ''
      // this.RESET_PARAMETERS();
    },
    validateIcons(){
      let sensors = +this.touchParameters.sensorsCount;
      let valid = true;
      for(let i = 0; i < sensors; i++){
        if(!this.icons[i]){
          valid = false;
        }
      }
      return valid
    }
  },
  watch: {
    updateItem(){
      this.switchName = this.updateItem.name
    }
  },
  created() {
    if(this.updateItem.index > -1){
      this.switchName = this.updateItem.name;
    }
  },
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