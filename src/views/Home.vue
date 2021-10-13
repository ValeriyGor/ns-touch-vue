<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="false"
      :filename="orderName.length ? orderName : 'order'"
      :pdf-quality="2"
      :paginate-elements-by-height="1000"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="780px"
      ref="html2Pdf"
    >
      <PDFContent slot="pdf-content" :orderName="orderName"></PDFContent>
    </vue-html2pdf>
    <div id="Content" class="container">
      <Nav :selected-tab="tab" @change="setTab"/>
      <SwitchSettings v-if="tab === ''" @save-order-to-pdf="saveAsPdf"/>
      <ComboSettings v-if="tab === 'combo'" @save-order-to-pdf="saveAsPdf"/>
      <SocketsFramesSettings v-if="tab === 'sockets'" @save-order-to-pdf="saveAsPdf"/>
      <Collection @change-tab="changeTab"></Collection>
      <div class="text-center" v-if="collection.length">
        <button type="button" class="form-create-touch__button-save" @click="resetCollection">Reset Table</button>
        <button type="button" class="form-create-touch__button-save" @click="saveAsPdf">Save as PDF</button>
      </div>
    </div>
  </div>
</template>

<script>
import PDFContent from '../components/Collection/PDFContent'
import Nav from '../components/Nav/Nav'
import SwitchSettings from '../views/SwitchSettings'
import ComboSettings from '../views/ComboSettings'
import SocketsFramesSettings from '../views/SocketsFramesSettings'
import Collection from '../components/Collection'
import VueHtml2pdf from 'vue-html2pdf'
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'Home',
  components: {
    PDFContent,
    Nav,
    SwitchSettings,
    ComboSettings,
    SocketsFramesSettings,
    Collection,
    VueHtml2pdf
  },
  data(){
    return {
      orderName: "",
      tab: ''
    }
  },
  computed: {
    ...mapGetters({
      collection: "Collection/collection"
    }),
  },
  methods: {
    ...mapMutations({
      SET_UPDATE_ITEM: "Parameters/SET_UPDATE_ITEM",
      RESET_COLLECTION: "Collection/RESET_COLLECTION"
    }),
    saveAsPdf() {
      this.$swal({
        title: 'Name of document',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Create PDF',
        cancelButtonText: 'Cancel',
        showLoaderOnConfirm: true,
      }).then((result) => {
        if(result.isConfirmed){
          this.orderName = result.value
          setTimeout(() => {
            window.scrollTo(0, 0)
            this.$refs.html2Pdf.generatePdf()
          }, 0)
        }
      })
    },
    setTab(tabName){
      this.tab = tabName;
      let updateItem = {
        index: -1,
        name: ''
      }
      this.SET_UPDATE_ITEM(updateItem)
    },
    changeTab(val){
      if(val !== 'switch'){
        this.tab = val
      } else {
        this.tab = ''
      }
    },
    resetCollection(){
      this.RESET_COLLECTION()
    }
  }
}
</script>

<style lang="scss">
#Content{
  padding-bottom: 30px;
}
.text-center{
  text-align: center;
  width: 100%;
  margin-bottom: 50px;
}

.half-block-flex__child{
  min-height: 100%;
  position: relative;
  z-index: 99;
  .half-block-flex__sticky{
    position: sticky;
    top: 0;
  }
}

.form-create-touch__button-save{
  margin-left: 10px;
  margin-right: 10px;
}

@media all and (max-width: 767px){
  #Content{
    padding-top: 75px;
  }

  .touch-container{
    & > .flex{
      display: block;
    }
    .half-block-flex:nth-child(1), .half-block-flex:nth-child(2){
      max-width: 100%;
    }
  }
}
</style>
