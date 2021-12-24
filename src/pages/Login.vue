<template>
  <v-container>
    <v-card
      class="mx-auto ma-8 pa-8"
      width="400px"
    >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
            <v-text-field
              required
              label="ユーザID"
              v-model="userId"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
            <v-text-field
              required
              label="パスワード"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn
            class="ma-2"
            color="primary"
            @click="login"
            min-width="88px"
            :loading="isUpdating"
          >
            ログイン
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods:{
    login(){
      this.isUpdating = true;
      const isValid = this.$refs.form.validate();
      if (isValid){
        // 
        
      }
      this.isUpdating = false;
    }
  },
  data(){
    return {
      valid: true,
      isUpdating: false,
      showPassword: false,
      userId: '',
      password: '',
      rules: {
        required: value => !!value || '入力してください',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  },
}
</script>

<style>

</style>