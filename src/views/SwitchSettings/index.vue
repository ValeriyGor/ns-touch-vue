<template lang="pug">
  .row
    div(class="flex justify-between align-center touching-container")
      //h2 Switch setting
      .touch-container
        .flex.justify-between
          TouchParameters(@save-order-to-pdf="saveAsPdf")
          .half-block-flex
            .form-create-touch.half-block-flex__child
              .form-create-touch__item.half-block-flex__sticky
                Touch
</template>
<script>
import TouchParameters from '../../components/Parameters/TouchParameters'
import Touch from '../../components/Touch'

export default {
  name: 'SwitchSettings',
  components: {
    TouchParameters,
    Touch,
  },
  methods: {
    saveAsPdf(){
      this.$emit('save-order-to-pdf')
    }
  }
}
</script>