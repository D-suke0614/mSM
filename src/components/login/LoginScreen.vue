<template>
  <v-card width="400px" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
        label="ユーザ名"
        prepend-icon="mdi-account-circle"
        v-model="name"
        />
        <v-text-field
        label="パスワード"
        v-bind:type="showPassword ? 'text' : 'password'"
        prepend-icon="mdi-lock"
        v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"  @click:append="showPassword = !showPassword"
        v-model="password"
        />
        <v-card-actions>
          <v-btn
          class="info"
          @click="submit"
          >
          ログイン
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'LoginScreen',
  data: () => ({
    showPassword : false,
    name:'',
    password:'',
  })
}
</script>

<style>
</style>
