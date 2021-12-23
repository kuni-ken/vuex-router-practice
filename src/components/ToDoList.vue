<template>
  <div>
    <v-alert v-if="message" type="success">
      {{ message }}
    </v-alert>
    <v-card
      class="mx-auto"
      tile
    >
      <v-toolbar
        color="cyan"
        dark
      >
        <v-toolbar-title>ToDo一覧</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          fab
          dark
          color="indigo"
          @click="onNewDialog"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-list outlined>
        <template>
          <v-list-item v-for="todo in todos" :key="todo.title">
            <template>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  {{ todo.title }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-h5 mb-1">
                  {{ todo.detail }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  outlined
                  rounded
                  text
                  @click="onShowDialog(todo.id)"
                >
                  <v-icon>mdi-pencil-outline</v-icon>確認・変更
                </v-btn>
                <v-btn
                  outlined
                  rounded
                  text
                  @click="removeItem(todo.id)"
                >
                  <v-icon>mdi-pencil-outline</v-icon>削除
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>

        </template>
      </v-list>
    </v-card>
    
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes, modules } from "../store/const";

export default {
  computed: {
    ...mapState(modules.TODO, { todos: 'list' }),
  },

  methods: {
    onShowDialog(id){
      this.$router.push(`/detail/${id}`);
    },
    onNewDialog(){
      this.$router.push(`/detail/create`);
    },
    removeItem(id){
      this.$store.dispatch(modules.TODO + "/" + actionTypes.TODO_DELETE, { id }).then(() => {
        this.message = "削除しました";
        setInterval(() => {
          this.message = "";
        }, 2000);
      })
    }
  },

  created(){
    // TODO 削除したとき、更新画面から戻ってきたときに読み込んでしまう
    this.$store.dispatch(modules.TODO + "/" + actionTypes.TODO_LIST);
  },

  data(){
    return {
      message: ""
    }
  }
}
</script>

<style>

</style>