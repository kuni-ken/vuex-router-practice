<template>
  <v-container>
    <v-card
      flat
    >
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>

        <v-btn
          outlined
          to="/list"
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
        <v-row justify="center">
          <v-btn
            class="ma-2"
            color="primary"
            @click="fix"
            min-width="88px"
            :loading="isUpdating"
          >
            <v-icon >
              mdi-arrow-up-thin-circle-outline
            </v-icon>
            更新
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
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
          this.$router.push(`/list`);
        })
      }
      if (path === `/detail/create`){
        this.$store.dispatch(
          modules.TODO + "/" + actionTypes.TODO_CREATE,
          { todo: this.todo }
        ).then(() => {
          this.isUpdating = false;
          this.$router.push(`/list`);
        })
      }
    }
  },
}
</script>

<style>

</style>