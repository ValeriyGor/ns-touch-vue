<template lang="pug">
  .container
    vue-html2pdf(
      :show-layout="false"
      :float-layout="true"
      :enable-download="false"
      :preview-modal="true"
      filename="orderNSTouch"
      :pdf-quality="2"
      :paginate-elements-by-height="1000"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="780px"
      ref="html2Pdf")
      PDFContent(slot="pdf-content")
    div
      button(@click="saveAsPdf") Сохранить
    Collection
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import PDFContent from "../../components/Collection/PDFContent";
import Collection from "../../components/Collection"
export default {
  name: "ShowOrder",
  components: {
    PDFContent,
    Collection,
    VueHtml2pdf
  },
  props: {
    operations: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    saveAsPdf() {
      this.$refs.html2Pdf.generatePdf()
    }
  }
}
</script>