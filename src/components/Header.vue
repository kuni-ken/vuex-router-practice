<template>
  <v-row class="text-center ma-1">
    <v-col cols="8">
      <v-img
        :src="require('../assets/logo.svg')"
        contain
        width="28"
        height="28"
      />
    </v-col>
    <v-col cols="4" class="text-right">
      <span class="mx-2">○○さん</span>
      <v-btn>ログアウト</v-btn>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'Header',

    data: () => ({
      
    }),
  }
</script>
