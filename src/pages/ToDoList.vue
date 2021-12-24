<template>
  <v-container>
    <v-overlay
      :absolute="isUpdating"
      :value="isUpdating"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-overlay>
    <v-alert v-if="message" type="success">
      {{ message }}
    </v-alert>
    <v-card
      class="mx-auto"
      flat
    >
      <v-toolbar
        color="cyan"
        dark
      >
        <v-toolbar-title>ToDo一覧</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          dark
          color="primary"
          @click="onNewDialog"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
          作成
        </v-btn>
      </v-toolbar>
      <v-list>
        <div v-for="(todo,i) in todos" :key="`${i}-${todo.title}`">
          <template>
            <v-divider
              v-show="i!==0"
            ></v-divider>
            <v-list-item>
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
                  color="primary"
                  class="ma-1"
                  min-width="138px"
                  @click="onShowDialog(todo.id)"
                >
                  <v-icon>mdi-pencil</v-icon>確認・変更
                </v-btn>
                <v-btn
                  outlined
                  class="ma-1"
                  min-width="138px"
                  text
                  @click="removeItem(todo.id)"
                >
                  <v-icon>mdi-delete</v-icon>削除
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </div>
      </v-list>
    </v-card>
  </v-container>
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
      this.isUpdating = true;
      this.$store.dispatch(modules.TODO + "/" + actionTypes.TODO_DELETE, { id }).then(() => {
        this.isUpdating = false;
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
      message: "",
      isUpdating: false,
    }
  }
}
</script>

<style>

</style>