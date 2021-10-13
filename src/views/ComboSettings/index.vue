<template lang="pug">
  .row
    div(class="flex justify-between align-center touching-container")
      //h2 Switch setting
      .touch-container
        .flex.justify-between
          ComboParameters(@save-order-to-pdf="saveAsPdf" mode="combo")
          .half-block-flex
            .form-create-touch.half-block-flex__child
              .form-create-touch__item.half-block-flex__sticky
                ComboConstructor(mode="combo")
</template>
<script>
import ComboParameters from '../../components/Parameters/ComboParameters'
import ComboConstructor from '../../components/Combo/ComboConstructor'

export default {
  name: 'ComboSettings',
  components: {
    ComboParameters,
    ComboConstructor,
  },
  methods: {
    saveAsPdf(){
      this.$emit('save-order-to-pdf')
    }
  }
}
</script>