<template>
  <v-sheet>
    <v-tabs
          v-model="tab"
          align-with-title
    >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item.id"
            class="tab"
          >
            {{ item.tab }}
          </v-tab>
      </v-tabs>
      <!-- <h2>Admin</h2> -->
      <v-tabs-items v-model="tab">
      <!-- 社員情報タブ -->
        <v-tab-item>
          <v-container>
            <v-row class="my-2">
              <v-col cols="5" sm="4" align="center">
                  <p class="text-h4 d-inline">Employee</p>
              </v-col>
              <v-col cols="3" sm="3"></v-col>
              <v-col cols="4" sm="5" align="center">
                  <v-btn v-if="this.$store.state.my_employee.is_admin" color="primary" class="mx-2" @click="openEditor">編集</v-btn>
              </v-col>
            </v-row>

            <v-row class="my-2">
              <v-col cols="12">
                <v-simple-table class="mx-auto">
                  <template>
                    <tbody>
                      <tr v-for="(key, value) in th_list" :key="value.id" >
                        <th class="text-center text-h5">{{ key }}</th>
                        <td class="text-center text-h6">{{ employee[value] }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>


        <!-- 検索タブ -->
        <v-tab-item>
          <v-container>
            <v-row class="my-2">
              <v-col cols="5" sm="4" align="center">
                  <p class="text-h4 d-inline">Employee</p>
              </v-col>
            </v-row>
            <v-form v-on:submit.prevent="onSubmit">
              <v-text-field class="input" placeholder="ID" v-model="id"></v-text-field>
              <v-text-field class="input" placeholder="姓" v-model="last_name"></v-text-field>
              <v-text-field class="input" placeholder="名" v-model="first_name"></v-text-field>
              <v-text-field class="input" placeholder="セイ" v-model="last_name_kana"></v-text-field>
              <v-text-field class="input" placeholder="メイ" v-model="first_name_kana"></v-text-field>
              <v-text-field class="input" placeholder="電話番号" v-model="phone_number"></v-text-field>
              <v-text-field class="input" placeholder="メールアドレス" v-model="email"></v-text-field>
              <v-text-field class="input" placeholder="部署" v-model="department"></v-text-field>
              <v-text-field class="input" placeholder="役職" v-model="position"></v-text-field>
              <!-- 一覧画面に遷移し、検索結果が表示される -->
              <v-btn class="button" color="primary" @click="search">検索</v-btn>
            </v-form>
          </v-container>
        </v-tab-item>

      <!-- 登録タブ -->
        <v-tab-item
        v-if="employee.is_admin"
        >
          <validation-observer
              ref="observer"
              >
            <form >
              <!-- lastName -->
              <v-text-field
              class="input"
                v-model="lastName"
                :error-messages="lastNameErrors"
                :counter="10"
                label="性"
                required
                @input="$v.lastName.$touch()"
                @blur="$v.lastName.$touch()"
              ></v-text-field>
              <!-- firstName -->
              <v-text-field
              class="input"
                v-model="firstName"
                :error-messages="firstNameErrors"
                :counter="10"
                label="名"
                required
                @input="$v.firstName.$touch()"
                @blur="$v.firstName.$touch()"
              ></v-text-field>
              <!-- KlastName -->
              <v-text-field
              class="input"
                v-model="KlastName"
                :error-messages="KlastNameErrors"
                :counter="20"
                label="セイ"
                @input="$v.KlastName.$touch()"
                @blur="$v.KlastName.$touch()"
              ></v-text-field>
              <!-- KfirstName -->
              <v-text-field
              class="input"
                v-model="KfirstName"
                :error-messages="KfirstNameErrors"
                :counter="20"
                label="メイ"
                @input="$v.KfirstName.$touch()"
                @blur="$v.KfirstName.$touch()"
              ></v-text-field>
              <!-- password -->
              <v-text-field
              v-bind:type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              class="input"
                v-model="password"
                :error-messages="passwordErrors"
                label="パスワード"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>
              <!-- Profile pic -->
              <v-file-input
              class="input"
                v-model="profilePic"
                :error-messages="profilePicErrors"
                label="プロフィール画像"
                @input="$v.profilePic.$touch()"
                @blur="$v.profilePic.$touch()"
              ></v-file-input>
              <!-- 電話番号 -->
              <v-text-field
              class="input"
                v-model="PhoneNumber"
                :error-messages="PhoneNumberErrors"
                :counter="11"
                label="電話番号"
                @input="$v.PhoneNumber.$touch()"
                @blur="$v.PhoneNumber.$touch()"
              ></v-text-field>
              <!-- email -->
              <v-text-field
              class="input"
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <!-- department -->
              <v-text-field
              class="input"
                v-model="department"
                :error-messages="departmentErrors"
                label="部署"
                @input="$v.department.$touch()"
                @blur="$v.department.$touch()"
              ></v-text-field>
              <!-- position -->
              <v-text-field
              class="input"
                v-model="position"
                :error-messages="positionErrors"
                label="役職"
                @input="$v.position.$touch()"
                @blur="$v.position.$touch()"
              ></v-text-field>
              <!-- birthday -->
              <v-text-field
              type="date"
              class="input"
                v-model="birthday"
                :error-messages="birthdayErrors"
                label="生年月日"
                required
                @input="$v.birthday.$touch()"
                @blur="$v.birthday.$touch()"
              ></v-text-field>
              <!-- hiredate -->
              <v-text-field
              type="date"
              class="input"
                v-model="hiredate"
                :error-messages="hiredateErrors"
                label="入社日"
                required
                @input="$v.hiredate.$touch()"
                @blur="$v.hiredate.$touch()"
              ></v-text-field>
              <!-- is_admin -->
              <v-checkbox
                class="input"
                v-model="is_admin"
                :label="`管理者`"
              ></v-checkbox>
              <!-- 登録ボタンをクリックで詳細画面に遷移（現状は一覧画面に遷移） -->
              <!-- <router-link to="/admins/list"> -->
                <v-btn
                :disabled="invalid"
                  class="mr-4 button"
                  color="primary"
                  @click="submit"
                >
                  登録
                </v-btn>
              <!-- </router-link> -->
            </form>
          </validation-observer>
        </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>


<script>
  import axios from 'axios';
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, } from 'vuelidate/lib/validators'
  import { ValidationObserver } from 'vee-validate'

  const url = "http://localhost:7770/msm_employee/api/employees/"

  export default {
    // eslint-disable-next-line
    name: 'ProjectSearch',
    mixins: [validationMixin],

    components: {
      ValidationObserver,
    },

    validations: {
      lastName: { required, maxLength: maxLength(10) },
      firstName: { required, maxLength: maxLength(10) },
      KlastName: { maxLength: maxLength(20) },
      KfirstName: { maxLength: maxLength(20) },
      password: { required },
      profilePic: { maxLength: maxLength(255) },
      PhoneNumber: { maxLength: maxLength(11) },
      email: { required, email },
      department: { maxLength: maxLength(255) },
      position: { maxLength: maxLength(255) },
      birthday: { required },
      hiredate: { required },
    },

    data: () => ({
      // tab
      tab: null,
        items: [],

        // 社員情報用
        th_list: {
        id: "社員ID",
        first_name: "名",
        last_name: "姓",
        first_name_kana: "メイ",
        last_name_kana: "セイ",
        profile_image_url: "画像",
        phone_number: "電話番号",
        email: "メールアドレス",
        department: "部署",
        position: "役職",
        birthday: "生年月日",
        hire_date: "入社日",
        password: "パスワード",
        is_admin: "管理者",
        is_deleted: "削除",
        created_at: "作成日",
        updated_at: "更新日",
      },
      employee: {},

      // v-model
      lastName: '',
      firstName: '',
      KlastName: '',
      KfirstName: '',
      password: '',
      profilePic: '',
      email: '',
      department: '',
      position: '',
      birthday: '',
      hiredate: '',
      is_admin: false,

      // 検索用v-model
      id: '',
      last_name: '',
      first_name: '',
      last_name_kana: '',
      first_name_kana: '',
      phone_number: '',
      Semail: '',
      Sdepartment: '',
      Sposition: '',

      // password
      showPassword: false,

    }),

    computed: {
      // エラーメッセージ
      // lastName
      lastNameErrors () {
        const errors = []
        if (!this.$v.lastName.$dirty) return errors
        !this.$v.lastName.maxLength && errors.push('名字は１０文字以内で入力してください！')
        !this.$v.lastName.required && errors.push('名字を入力してください！')
        return errors
      },
      // firstName
      firstNameErrors () {
        const errors = []
        if (!this.$v.firstName.$dirty) return errors
        !this.$v.lastName.maxLength && errors.push('名前は１０文字以内で入力してください！')
        !this.$v.firstName.required && errors.push('名前を入力してください！')
        return errors
      },
      // カナlastName
      KlastNameErrors () {
        const errors = []
        if (!this.$v.firstName.$dirty) return errors
        !this.$v.KlastName.maxLength && errors.push('セイは２０文字以内で入力してください！')
        return errors
      },
      // カナfirstName
      KfirstNameErrors () {
        const errors = []
        if (!this.$v.KfirstName.$dirty) return errors
        !this.$v.KfirstName.maxLength && errors.push('ナマエは２０文字以内で入力してください！')
        return errors
      },
      // password
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('パスワードを入力してください！')
        return errors
      },
      // profilePic
      profilePicErrors () {
        const errors = []
        if (!this.$v.profilePic.$dirty) return errors
        !this.$v.profilePic.maxLength && errors.push('ファイルのPATHが長すぎます！')
        return errors
      },
      // PhoneNumber
      PhoneNumberErrors () {
        const errors = []
        if (!this.$v.PhoneNumber.$dirty) return errors
        !this.$v.PhoneNumber.maxLength && errors.push('電話番号は１１文字以内で入力してください！')
        return errors
      },
      // email
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('正しい形式で入力してください！')
        !this.$v.email.required && errors.push('メールアドレスを入力してください！')
        return errors
      },
      // department
      departmentErrors () {
        const errors = []
        if (!this.$v.department.$dirty) return errors
        !this.$v.PhoneNumber.maxLength && errors.push('部署名が長すぎます！')
        return errors
      },
      // position
      positionErrors () {
        const errors = []
        if (!this.$v.position.$dirty) return errors
        !this.$v.position.maxLength && errors.push('役職名が長すぎます！')
        return errors
      },
      // birthday
      birthdayErrors () {
        const errors = []
        if (!this.$v.birthday.$dirty) return errors
        !this.$v.firstName.required && errors.push('生年月日を正しくを入力してください！')
        return errors
      },
      // hiredate
      hiredateErrors () {
        const errors = []
        if (!this.$v.hiredate.$dirty) return errors
        !this.$v.hiredate.required && errors.push('入社日を正しくを入力してください！')
        return errors
      },
    },

    methods: {
      openEditor() {
      // 管理者
        this.$router.push({
          path: '/admin/edit',
          query: {
            id: this.$store.state.my_employee.id
          }
        })
      },
      submit () {
        this.$v.$touch()
        // console.log(this.name)
        axios
          .post(url, {
            last_name: this.lastName,
            first_name: this.firstName,
            last_name_kana: this.KlastName,
            first_name_kana: this.KfirstName,
            password: this.password,
            profile_image_url: this.profilePic,
            email: this.email,
            department: this.department,
            position: this.position,
            birthday: this.birthday,
            hiredate: this.hiredate,
            is_admin: this.is_admin,
          }).then((res) => {
            console.log(res)
            this.$router.push({
              path: '/admin/detail',
              query: {
                employee: res.data
              }
            })
          }).catch((err) => {
            console.log(err)
          })
      },
      search() {
        this.$router.push({
          path: '/admin/list',
          query: {
            id: this.id,
            last_name: this.last_name,
            first_name: this.first_name,
            last_name_kana: this.last_name_kana,
            first_name_kana: this.first_name_kana,
            phone_number: this.phone_number,
            email: this.email,
            department: this.department,
            position: this.position
          }
        })
      }
    },
    created() {
      const user_id = this.$store.state.my_employee.id; // ログインしているユーザー
      axios.get(url + `${user_id}`)
        .then((res) => {
          console.log(res.data)
          this.employee = res.data
        }).catch((err) =>{
          console.log(err)
        })
      
      console.log(this.employee)
        this.items = this.$store.state.my_employee.is_admin ?
          [
            { id: 0 , tab: '社員情報'},
            { id: 1 , tab: '検索'},
            { id: 2 , tab: '登録'},
          ] :
          [
            { id: 0 , tab: '社員情報'},
            { id: 1 , tab: '検索'},
          ]
    },

  }
</script>

<style>
  .input {
    margin-left: 25%;
    margin-right: 25%;
    margin-top: 5vh;
  }
  .button {
    margin-left: 25%;
    margin-bottom: 8vh;
    margin-top: 6vh;
  }
  .tab {
    height: 8vh;
  }
</style>
