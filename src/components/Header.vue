<template>
  <v-row class="text-center ma-1">
    <v-overlay
      :absolute="isUpdating"
      :value="isUpdating"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-overlay>
    <v-col cols="4">
      <v-img
        :src="require('../assets/logo.svg')"
        contain
        width="28"
        height="28"
      />
    </v-col>
    <v-col cols="4">
     <h2>{{ title }}</h2>
    </v-col>
    <v-col cols="4" class="text-right">
      <span class="mx-2">{{ userName }} さん</span>
      <v-btn
        outlined
        text
        @click="logout"
      >
        ログアウト
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import { actionTypes, modules } from '../store/const'

function getTitle(path){
  if (path === "/list"){
    return "ToDo一覧"
  }
  if (path === "/detail/create"){
    return "ToDo作成"
  }
  if (path.indexOf("/detail/") > -1){
    return "ToDo詳細"
  }
  return ""
}

export default {
  name: 'Header',

  data: () => ({
    isUpdating: false,
    title: ""
  }),

  created(){
    this.title = getTitle(this.$route.path);
  },

  computed: {
    ...mapState(modules.AUTH, [ 'userName' ]),
  },

  methods: {
    async logout(){
      this.isUpdating = true;
      await this.$store.dispatch(modules.AUTH + "/" + actionTypes.AUTH_LOGOUT);
      this.isUpdating = false;
      this.$router.push('/');
    }
  },

  watch:{
    $route(to){
      this.title = getTitle(to.path);
      console.log(this.title);
    }
  }
}
</script>
