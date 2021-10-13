<template>
  <div class="half-block-flex">
    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.series}">1</div>
      <div class="form-create-touch__item">
        <p class="text-primary">Series</p>
        <label class="text-primary">
          <input type="radio" name="touch-series" v-model="params.series" class="touch-series touch-series-80" value="80"> 80
        </label>
        <label class="text-primary">
          <input type="radio" name="touch-series" v-model="params.series" class="touch-series touch-series-85" value="85"> 85
        </label>
        <label class="text-primary">
          <input type="radio" name="touch-series" v-model="params.series" class="touch-series touch-series-90" value="90" @change="validate90series"> 90
        </label>
      </div>
    </div>
    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.sensorsCount}">2</div>
      <div class="form-create-touch__item">
        <p class="text-primary">Number of sensors</p>
        <label class="text-primary">
          <input
              type="radio"
              name="touch-sensor"
              class="touch-sensor"
              v-model="params.sensorsCount"
              @change="validateTouchSensor"
              value="1"> 1
        </label>
        <label class="text-primary">
          <input
              type="radio"
              name="touch-sensor"
              class="touch-sensor touch-sensor-2"
              v-model="params.sensorsCount"
              @change="validateTouchSensor"
              value="2"> 2
        </label>
        <label class="text-primary">
          <input
              type="radio"
              name="touch-sensor"
              class="touch-sensor touch-sensor-only-12 touch-sensor-4"
              v-model="params.sensorsCount"
              @change="validateTouchSensor"
              value="4"> 4
        </label>
        <label class="text-primary">
          <input
            type="radio"
            name="touch-sensor"
            class="touch-sensor touch-sensor-only-12 touch-sensor-6"
            :disabled="params.series === '90'"
            v-model="params.sensorsCount"
            @change="validateTouchSensor"
            value="6"
          >
          6
        </label>
        <label class="text-primary">
          <input
            type="radio"
            name="touch-sensor"
            class="touch-sensor touch-sensor-only-12"
            v-model="params.sensorsCount"
            @change="validateTouchSensor"
            value="8"
          >
          8
        </label>
      </div>
    </div>
    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.orientation || +params.sensorsCount === 1 || +params.sensorsCount === 4}">3</div>
      <div class="form-create-touch__item">
        <p class="text-primary">Sensor orientation</p>
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
    <Palette v-if="params.material === 'stone'"/>
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
    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.inlay}">6</div>
      <div class="form-create-touch__item">
        <p class="text-primary">Inlay</p>
        <label class="text-primary">
          <input type="radio" name="touch-metal" class="touch-metal" value="Brass" v-model="params.inlay" data-articul="BR" data-colorLines='gold'> Brass
        </label>
        <label class="text-primary">
          <input type="radio" name="touch-metal" class="touch-metal" value="Aluminium" v-model="params.inlay" data-articul="AL" data-colorLines='gray'> Aluminium
        </label>
      </div>
    </div>
    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.interface}">7</div>
      <div class="form-create-touch__item">
        <p class="text-primary">Electronics</p>
        <label class="text-primary">
          <input type="radio" name="touch-power" class="touch-power dry-contact" v-model="params.interface" value="DRY CONTACT"> DRY CONTACT
        </label>
        <label class="text-primary">
          <input type="radio" name="touch-power" class="touch-power for-knx" v-model="params.interface" value="FOR KNX"> FOR KNX
        </label>
        <label class="text-primary">
          <input type="radio" name="touch-power" class="touch-power touch-power-220"  v-model="params.interface" value="220 V"> 230 V
        </label>
      </div>
    </div>
    <div class="form-create-touch form-create-touch__setting-item">
      <div class="form-create-touch__num" :class="{'validate': params.switchesCount}">8</div>
      <div class="form-create-touch__item">
        <p class="text-primary">Number of switches</p>
        <label class="text-primary">
          <input type="number" min="1" max="12" name="touch-count" class="touch-count" v-model="params.switchesCount">  items
        </label>
      </div>
    </div>
    <AddToCollection/>
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
import AddToCollection from '../../components/Collection/AddToCollection'
export default {
  name: "TouchParameters",
  components: {
    Palette,
    AddToCollection
  },
  computed: {
    ...mapGetters({
      touchParameters: 'Parameters/touchParameters'
    }),
    params(){
      return this.touchParameters
    },
    isDisabledOrientation(){
      return +this.params.sensorsCount === 1 || +this.params.sensorsCount === 4
    }
  },
  methods: {
    ...mapMutations({
      SET_FIELD_TOUCH_PARAMETERS: 'Parameters/SET_FIELD_TOUCH_PARAMETERS',
      RESET_PARAMETERS: 'Parameters/RESET_PARAMETERS'
    }),
    validate90series(){
      if(+this.params.sensorsCount === 6){
        this.params.sensorsCount = 4
      }
    },
    goToOrder(){
      this.$router.push({name: 'ShowOrder'})
    },
    saveAsPdf(){
      this.$emit('save-order-to-pdf')
    },
    resetData(){
      this.RESET_PARAMETERS()
    },
    validateTouchSensor(){
      if(+this.params.sensorsCount === 1 || +this.params.sensorsCount === 4){
        this.params.orientation = ''
      }
    }
  },
  created() {
    // this.SET_FIELD_TOUCH_PARAMETERS({key: 'sensorsCount', value: 8})
  }
}
</script>