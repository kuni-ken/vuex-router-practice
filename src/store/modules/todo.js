import { actionTypes, mutationTypes } from "../const";
import api from "../../api";

const todo = {
  namespaced: true,

  state: () => ({
    list: [{
      id: 1,
      title: "鎌倉観光",
      detail: "鶴岡八幡宮\n→蕎麦屋\n→ジェラート屋\n→お土産屋"
    }]
  }),

  getters: {
    getTodo(state){
      return function(id){
        return state.list.find(el=>el.id===id);
      }
    }
  },

  actions: {
    [actionTypes.TODO_CREATE](context, payload){
      // 該当のtodoを更新する
      return api.post('todo/create', {todo: payload.todo}).then(()=>{
        const newId = new Date().getTime(); // 本番はサーバーから返されるIDを使う
        const params = {...payload, newId};
        context.commit(mutationTypes.TODO_CREATE, params);
      });
    },
    [actionTypes.TODO_UPDATE](context, payload){
      // 該当のtodoを更新する
      return api.post('todo/update', {todo: payload.todo}).then(()=>{
        context.commit(mutationTypes.TODO_UPDATE, payload);
      });
    },
    [actionTypes.TODO_DELETE](context, payload){
      // 該当のtodoを削除する
      const { id } = payload;
      return api.post('todo/delete', { id }).then(()=>{
        context.commit(mutationTypes.TODO_DELETE, { id });
      });
    }
  },

  mutations: {
    [mutationTypes.TODO_CREATE](state, payload){
      const { todo, newId } = payload;
      const { list } = state;
      list.unshift({...todo, id: newId}); // 先頭に追加
    },
    [mutationTypes.TODO_UPDATE](state, payload){
      // 該当のtodoの更新をコミットする
      const { todo } = payload;
      const { list } = state;
      const target = list.find(el=>el.id===todo.id);
      Object.keys(target).map((v) => {
        target[v] = todo[v];
      })
    },
    [mutationTypes.TODO_DELETE](state, payload){
      state.list = state.list.filter(el=>el.id!==payload.id);
    }
  },


}

export default todo;
