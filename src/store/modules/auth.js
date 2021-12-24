import api from "../../api";
import { actionTypes, getterTypes, mutationTypes } from "../const";

const auth = {
  namespaced: true,

  state: () => ({
    userId: "",
    userName: "",
  }),

  getters: {
    [getterTypes.AUTH_ISLOGGEDIN](state){
      return Boolean(state.userId.trim());
    }
  },

  actions: {
    [actionTypes.AUTH_LOGIN](context, payload){
      const { userId, password } = payload;
      return api.post('login', { userId, password })
      .then(() => {
        // TODO
        const userName = "ダミー";
        context.commit(mutationTypes.AUTH_SETUSER, { userId, userName });
      })
    },
    [actionTypes.AUTH_LOGOUT](context){
      return api.post('logout', {})
      .then(() => {
        context.commit(mutationTypes.AUTH_CLEARUSER);
      })
    },
  },

  mutations: {
    [mutationTypes.AUTH_SETUSER](state, payload){
      state.userId = payload.userId;
      state.userName = payload.userName;
    },
    [mutationTypes.AUTH_CLEARUSER](state){
      state.userId = "";
      state.userName = "";
    }
  },
}
export { auth }