export default () => ({
  collection: localStorage.getItem('collection') ? JSON.parse(localStorage.getItem('collection')): []
})