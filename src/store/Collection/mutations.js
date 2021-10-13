export default {
  SET_COLLECTION(state, payload) {
    state.collection = payload;
    localStorage.setItem('collection', JSON.stringify(state.collection));
  },
  RESET_COLLECTION(state) {
    state.collection = [];
    localStorage.setItem('collection', JSON.stringify(state.collection));
  },
  ADD_TO_COLLECTION(state, payload){
    state.collection.push(payload)
    localStorage.setItem('collection', JSON.stringify(state.collection));
  },
  UPDATE_COLLECTION_ITEM(state, {i, newItem}){
    state.collection.splice(i, 1, newItem);
    localStorage.setItem('collection', JSON.stringify(state.collection));
  },
  DELETE_FROM_COLLECTION(state, i){
    state.collection.splice(i, 1);
    localStorage.setItem('collection', JSON.stringify(state.collection));
  }
}
