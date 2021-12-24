<template>
  <v-card>
    <v-toolbar
      color="cyan"
      dark
    >
      <v-toolbar-title>ToDo</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        outlined
        to="/"
        :disabled="isUpdating"
      >
        <v-icon >
          mdi-close
        </v-icon>
        戻る
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
            <v-text-field
              label="タイトル*"
              required
              v-model="todo.title"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
            <v-textarea
              required
              label="詳細*"
              v-model="todo.detail"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <small>*：入力必須</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        to="/"
        :disabled="isUpdating"
      >
        Close
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="fix"
        :loading="isUpdating"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { actionTypes, modules } from '../store/const';

export default {
  data(){
    return {
      isUpdating: false
    }
  },

  computed: {
    todo(){
      const path = this.$route.path;
      const id = this.$route.params.id;
      if (path === `/detail/${id}`){
        return this.$store.getters[modules.TODO + "/" + "getTodo"](Number(this.$route.params.id));
      }
      return {};
    }
  },

  methods:{
    fix(){
      this.isUpdating = true;
      const path = this.$route.path;
      const id = this.$route.params.id;
      if (path === `/detail/${id}`){
        this.$store.dispatch(
          modules.TODO + "/" + actionTypes.TODO_UPDATE,
          { todo: this.todo }
        ).then(() => {
          this.isUpdating = false;
          this.$router.push(`/`);
        })
      }
      if (path === `/detail/create`){
        this.$store.dispatch(
          modules.TODO + "/" + actionTypes.TODO_CREATE,
          { todo: this.todo }
        ).then(() => {
          this.isUpdating = false;
          this.$router.push(`/`);
        })
      }
    }
  },
}
</script>

<style>

</style>