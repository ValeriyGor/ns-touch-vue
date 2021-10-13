<template>
  <div class="half-block-flex">
    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.series}">1</div>
      <div class="form-create-touch__item">
        <p class="text-primary">Series</p>
        <label class="text-primary">
          <input type="radio" name="touch-series" v-model="params.series" class="touch-series touch-series-80" value="80" @change="changeSeries"> 80
        </label>
        <label class="text-primary">
          <input type="radio" name="touch-series" v-model="params.series" class="touch-series touch-series-85" value="85" @change="changeSeries"> 85
        </label>
        <label class="text-primary">
          <input type="radio" name="touch-series" v-model="params.series" class="touch-series touch-series-90" value="90" @change="validate90series"> 90
        </label>
      </div>
    </div>
    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.slotsCount}">2</div>
      <div class="form-create-touch__item">
        <p class="text-primary">Number of slots</p>
        <label class="text-primary" v-if="mode === 'sockets'">
          <input
              type="radio"
              name="touch-sensor"
              class="touch-sensor touch-sensor-2"
              v-model="params.slotsCount"
              value="1"> 1
        </label>
        <label class="text-primary">
          <input
              type="radio"
              name="touch-sensor"
              class="touch-sensor touch-sensor-2"
              v-model="params.slotsCount"
              value="2"> 2
        </label>
        <label class="text-primary">
          <input
              type="radio"
              name="touch-sensor"
              class="touch-sensor"
              v-model="params.slotsCount"
              value="3"> 3
        </label>
        <label class="text-primary">
          <input
              type="radio"
              name="touch-sensor"
              class="touch-sensor touch-sensor-only-12 touch-sensor-4"
              v-model="params.slotsCount"
              value="4"> 4
        </label>
        <label class="text-primary" v-if="mode === 'sockets' && params.series !== '90'">
          <input
              type="radio"
              name="touch-sensor"
              class="touch-sensor touch-sensor-only-12 touch-sensor-4"
              v-model="params.slotsCount"
              value="5"> 5
        </label>
      </div>
    </div>
    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.orientation || +params.sensorsCount === 1 || +params.sensorsCount === 4}">3</div>
      <div class="form-create-touch__item">
        <p class="text-primary">Combo orientation</p>
        <label class="text-primary">
          <input type="radio" name="touch-vector" class="touch-vector align-horizontal" v-model="params.orientation" value="Horizontal" :disabled="isDisabledOrientation"> Horizontal
        </label>
        <label class="text-primary">
          <input type="radio" name="touch-vector" class="touch-vector align-vertical" v-model="params.orientation" value="Vertical" :disabled="isDisabledOrientation"> Vertical
        </label>
      </div>
    </div>
    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.material && params.palette}">4</div>
      <div class="form-create-touch__item">
        <p class="text-primary">Material</p>
        <label class="text-primary">
          <input type="radio" name="touch-material" class="touch-material align-horizontal" v-model="params.material" value="stone"> Stone
        </label>
        <!--        <label class="text-primary">-->
        <!--          <input type="radio" name="touch-material" class="touch-material align-vertical" v-model="params.material" value="wood"> Wood-->
        <!--        </label>-->
        <!--        <label class="text-primary">-->
        <!--          <input type="radio" name="touch-material" class="touch-material align-vertical" v-model="params.material" value="hpl"> Hpl-->
        <!--        </label>-->
      </div>
    </div>
    <Palette v-if="params.material === 'stone'" for-to="combo"/>
    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.surface}">5</div>
      <div class="form-create-touch__item">
        <p class="text-primary">Product surface</p>
        <label class="text-primary">
          <input type="radio" name="touch-area" class="touch-area" data-articul='0' v-model="params.surface" value="Glossy"> Glossy
        </label>
        <label class="text-primary">
          <input type="radio" name="touch-area" class="touch-area" data-articul='1' v-model="params.surface" value="Matte"> Matte
        </label>
      </div>
    </div>
    <div v-if="isIncludeSwitch">
      <h4>Switch:</h4>
      <div class="form-create-touch form-create-touch__setting-item">
        <div class="form-create-touch__num" :class="{'validate': params.switchInlay}">6</div>
        <div class="form-create-touch__item">
          <p class="text-primary">Inlay</p>
          <label class="text-primary">
            <input type="radio" name="touch-metal" class="touch-metal" value="Brass" v-model="params.switchInlay" data-articul="BR" data-colorLines='gold'> Brass
          </label>
          <label class="text-primary">
            <input type="radio" name="touch-metal" class="touch-metal" value="Aluminium" v-model="params.switchInlay" data-articul="AL" data-colorLines='gray'> Aluminium
          </label>
        </div>
      </div>
      <div class="form-create-touch form-create-touch__setting-item">
        <div class="form-create-touch__num" :class="{'validate': params.switchInterface}">7</div>
        <div class="form-create-touch__item">
          <p class="text-primary">Electronics</p>
          <label class="text-primary">
            <input type="radio" name="touch-power" class="touch-power dry-contact" v-model="params.switchInterface" value="DRY CONTACT"> DRY CONTACT
          </label>
          <label class="text-primary">
            <input type="radio" name="touch-power" class="touch-power for-knx" v-model="params.switchInterface" value="FOR KNX"> FOR KNX
          </label>
          <label class="text-primary">
            <input type="radio" name="touch-power" class="touch-power touch-power-220"  v-model="params.switchInterface" value="220 V"> 230 V
          </label>
        </div>
      </div>
    </div>
    <div v-show="isIncludeSocket">
      <h4>Socket:</h4>
      <div class="form-create-touch form-create-touch__setting-item flex-wrap">
        <div class="form-create-touch__num" :class="{'validate': params.colorSocket}"><span v-if="!isIncludeSwitch">6</span> <span v-if="isIncludeSwitch">8</span></div>
        <div class="form-create-touch__item">
          <p class="text-primary">Color Socket</p>
        </div>
        <div class="form-create-touch__combo-color-socket">
          <label class="form-create-touch__combo-color-socket__item">
            <img src="../../assets/img/sockets/WhiteGloss.png" alt="">
            <input type="radio" name="color-socket" value="WG" v-model="params.colorSocket">
            <span>White<br>Gloss</span>
          </label>
          <label class="form-create-touch__combo-color-socket__item">
            <img src="../../assets/img/sockets/blackGloss.png" alt="">
            <input type="radio" name="color-socket" value="BG" v-model="params.colorSocket">
            <span>Black<br>Gloss</span>
          </label>
          <label class="form-create-touch__combo-color-socket__item">
            <img src="../../assets/img/sockets/aluminum.png" alt="">
            <input type="radio" name="color-socket" value="SL" v-model="params.colorSocket">
            <span>Aluminium</span>
          </label>
          <label class="form-create-touch__combo-color-socket__item">
            <img src="../../assets/img/sockets/Champagne.png" alt="">
            <input type="radio" name="color-socket" value="CH" v-model="params.colorSocket">
            <span>Champagne</span>
          </label>
          <label class="form-create-touch__combo-color-socket__item">
            <img src="../../assets/img/sockets/WhiteMat.png" alt="">
            <input type="radio" name="color-socket" value="WM" v-model="params.colorSocket">
            <span>White<br>Matt</span>
          </label>
          <label class="form-create-touch__combo-color-socket__item selected">
            <img src="../../assets/img/sockets/blackMat.png" alt="">
            <input type="radio" name="color-socket" value="BM" v-model="params.colorSocket">
            <span>Black<br>Matt</span>
          </label>
          <label class="form-create-touch__combo-color-socket__item">
            <img src="../../assets/img/sockets/anthracitMat.png" alt="">
            <input type="radio" name="color-socket" value="AM" v-model="params.colorSocket">
            <span>Anthracite Matt</span>
          </label>
          <label class="form-create-touch__combo-color-socket__item">
            <img src="../../assets/img/sockets/Mokko.png" alt="">
            <input type="radio" name="color-socket" value="MO" v-model="params.colorSocket">
            <span>Mokko</span>
          </label>
        </div>
      </div>
    </div>

    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.comboCount}">
        <span v-if="!isIncludeSocket && !isIncludeSwitch">6</span>
        <span v-else-if="isIncludeSocket && !isIncludeSwitch">7</span>
        <span v-else-if="!isIncludeSocket && isIncludeSwitch">8</span>
        <span v-else-if="isIncludeSocket && isIncludeSwitch">9</span>
      </div>
      <div class="form-create-touch__item">
        <p class="text-primary">Number of {{ mode === 'combo' ? 'combo' : 'frames' }}</p>
        <label class="text-primary">
          <input type="number" min="1" max="12" name="touch-count" class="touch-count" v-model="params.comboCount">  items
        </label>
      </div>
    </div>
    <AddToCollectionCombo :number="numberFieldName" :mode="mode"/>
    <div class="form-create-touch__buttons">
      <button type="button" class="form-create-touch__button-reset resetData" @click="resetData">Reset</button>
      <!--      <button type="button" class="form-create-touch__button-reset resetData" @click="goToOrder">Go to Order</button>-->
      <!--      <button type="button" class="form-create-touch__button-save mr-3" @click="saveAsPdf">Save as PDF</button>-->
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Palette from '../../components/Palette'
import AddToCollectionCombo from '../../components/Collection/AddToCollectionCombo'
export default {
  name: "ComboParameters",
  components: {
    Palette,
    AddToCollectionCombo
  },
  props: {
    mode: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters({
      comboParameters: 'Parameters/comboParameters',
      currentComboArtikul: 'Parameters/currentComboArtikul',
    }),
    params(){
      return this.comboParameters
    },
    isDisabledOrientation(){
      return +this.params.switchSensorsCount === 1 || +this.params.switchSensorsCount === 4
    },
    isIncludeSocket(){
      let include = false;
      if(this.currentComboArtikul.includes('R1')){
        include = true
      }
      if(this.currentComboArtikul.includes('R2')){
        include = true
      }
      if(this.currentComboArtikul.includes('R3')){
        include = true
      }
      if(this.currentComboArtikul.includes('R4')){
        include = true
      }
      if(this.currentComboArtikul.includes('RCH2ac')){
        include = true
      }
      return include && this.comboParameters.series === '90'
    },
    isIncludeSwitch(){
      let include = false;
      if(this.currentComboArtikul.includes('01')){
        include = true
      }
      if(this.currentComboArtikul.includes('H02')){
        include = true
      }
      if(this.currentComboArtikul.includes('V02')){
        include = true
      }
      if(this.currentComboArtikul.includes('04')){
        include = true
      }
      if(this.currentComboArtikul.includes('H08')){
        include = true
      }
      if(this.currentComboArtikul.includes('V08')){
        include = true
      }
      return include
    },
    numberFieldName(){
      let number = 0;
      if(this.isIncludeSocket && this.isIncludeSwitch){
        number = 10
      } else if (this.isIncludeSocket && !this.isIncludeSwitch){
        number = 8
      } else if (!this.isIncludeSocket && this.isIncludeSwitch){
        number = 9
      } else if (!this.isIncludeSocket && !this.isIncludeSwitch){
        number = 7
      }
      return number
    }
  },
  methods: {
    ...mapMutations({
      SET_FIELD_TOUCH_PARAMETERS: 'Parameters/SET_FIELD_TOUCH_PARAMETERS',
      RESET_PARAMETERS_COMBO: 'Parameters/RESET_PARAMETERS_COMBO'
    }),
    validate90series(){
      if(+this.params.switchSensorsCount === 6){
        this.params.switchSensorsCount = 4
      }
      this.changeSeries()
    },
    goToOrder(){
      this.$router.push({name: 'ShowOrder'})
    },
    saveAsPdf(){
      this.$emit('save-order-to-pdf')
    },
    resetData(){
      this.RESET_PARAMETERS_COMBO()
    },
    changeSeries(){
      if(this.params.series !== "90"){
        Object.keys(this.comboParameters.selectedSlots).forEach(key => {
          if(this.comboParameters.selectedSlots[key] === "R1" || this.comboParameters.selectedSlots[key] === "CH2ac" || this.comboParameters.selectedSlots[key] === "RCH2ac"){
            this.comboParameters.selectedSlots[key] = "S1"
          }
        })
      } else {
        Object.keys(this.comboParameters.selectedSlots).forEach(key => {
          if(this.comboParameters.selectedSlots[key] === "S1"){
            this.comboParameters.selectedSlots[key] = "R1"
          }
        })
      }
    }
  },
  created() {
    // this.SET_FIELD_TOUCH_PARAMETERS({key: 'sensorsCount', value: 8})
  }
}
</script>

<style lang="scss">
h4{
  font-size: 20px;
  font-family: Arvo,serif;
  font-weight: normal;
  color: #fff;
  margin-top: 20px;
  & + .form-create-touch__setting-item{
    margin-top: 5px;
  }
}
.form-create-touch{
  &__combo-color-socket{
    flex: 0 0 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    &__item{
      flex: 0 0 18%;
      margin-right: 6%;
      margin-bottom: 10px;
      text-align: center;
      cursor: pointer;
      img{
        display: block;
        margin-bottom: 5px;
        max-width: 100%;
      }
      span{
        color: #ffffff;
        font-size: 14px;
        display: inline-block;
        text-align: center;
        padding: 0 5px;
      }
      input[type="radio"]{
        display: none;
        &:checked + span {
          border-bottom: 1px solid #009fe3;
        }
      }
    }
  }
}
.flex-wrap{
  flex-wrap: wrap;
}
</style>