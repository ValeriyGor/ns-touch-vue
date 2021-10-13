<template>
  <div class="order-sensor-touch">
    <h3>Total: </h3>
    <p class="text-primary">Vendor Code: <strong>{{currentTouchArtikul}}</strong></p>
    <p class="text-primary">Series: <span>{{touchParameters.series}}</span></p>
    <p class="text-primary">Electronics: <span>{{touchParameters.interface}}</span></p>
    <p class="text-primary">Inlay: <span>{{touchParameters.inlay}}</span></p>
    <p class="text-primary">Product surface: <span>{{touchParameters.surface}}</span></p>
    <p class="text-primary">Number of sensors: <span>{{touchParameters.sensorsCount}}</span></p>
    <p class="text-primary">Sensor orientation: <span>{{touchParameters.orientation}}</span></p>
    <p class="text-primary">Palette: <span>{{touchParameters.palette}}</span></p>
    <p class="text-primary">Number of switches: <span>{{touchParameters.switchesCount}}</span></p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Total",
  computed: {
    ...mapGetters({
      touchParameters: 'Parameters/touchParameters',
      selectedSwitchPalette : 'Parameters/selectedSwitchPalette',
      currentTouchArtikul : 'Parameters/currentTouchArtikul',
    }),
  }
}
</script>