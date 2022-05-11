<template>
  <v-card width="400px" class="mx-auto mt-5 login">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
        label="Email"
        prepend-icon="mdi-account-circle"
        v-model="email"
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
          @click="login"
          >
          ログイン
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from '../../util/axios.js'

const url = "http://localhost:7770/msm_employee/api/employees/"

export default {
  name: 'LoginScreen',
  data: () => ({
    showPassword : false,
    email:'',
    password:'',
    employee: null
  }),
  methods: {
    login() {
      axios.post(url + `login`, {
        email: this.email,
        password: this.password,
      }).then(res => {
        this.employee = res.data
        if(this.employee){
          this.$router.push({ path: '/employees'})
        }else{
          console.log("ログイン失敗")
        }
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style>
.login {
  margin-top: 50vh;
}
</style>
