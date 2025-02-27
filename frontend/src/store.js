import { createStore } from 'vuex';

const state = {
  error: false,
  errorMsg: ''
};

const mutations = {
  setErrorMsg(state, errorMsg) {
    state.error = true;
    state.errorMsg = errorMsg;
  },
  clearErrorMsg(state) {
    state.error = false,
    state.errorMsg = '';
  }
};

const actions = {
  setErrorMsg({ commit }, payload) {
    commit('setErrorMsg', payload);
  },
  clearErrorMsg({ commit }) {
    commit('clearErrorMsg');
  }
};

const getters = {
  isError(state) {
    return state.error;
  },
  getErrorMsg(state) {
    return state.errorMsg;
  }
};

export default createStore({
  state,
  getters,
  actions,
  mutations
});
