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
      <h2>Client</h2>
      <v-tabs-items v-model="tab">
        <!-- 検索タブ -->
        <v-tab-item>
          <v-form v-on:submit.prevent="onSubmit">
            <v-text-field class="input" placeholder="顧客名" v-model="company_name"></v-text-field>
            <v-text-field class="input" placeholder="コキャクメイ" v-model="company_name_kana"></v-text-field>
            <v-text-field class="input" placeholder="顧客ID" v-model="company_id"></v-text-field>
            <v-text-field class="input" placeholder="郵便番号" v-model="postal_code"></v-text-field>
            <v-text-field class="input" placeholder="住所" v-model="address"></v-text-field>
            <v-text-field class="input" placeholder="電話番号" v-model="phone_number"></v-text-field>
            <v-text-field class="input" placeholder="メールアドレス" v-model="Semail"></v-text-field>
            <v-text-field class="input" placeholder="登録者" v-model="created_by"></v-text-field>
            <v-text-field class="input" placeholder="編集者" v-model="updated_by"></v-text-field>
            <!-- 一覧画面に遷移し、検索結果が表示される -->
            <v-btn class="button" color="primary" @click="search">検索</v-btn>
          </v-form>
        </v-tab-item>


      <!-- 登録タブ -->
        <v-tab-item>
          <validation-observer
              ref="observer"
              >
            <form >
              <!-- 顧客名 -->
              <v-text-field
              class="input"
                v-model="CName"
                :error-messages="CNameErrors"
                :counter="255"
                label="顧客名"
                required
                @input="$v.CName.$touch()"
                @blur="$v.CName.$touch()"
              ></v-text-field>
              <!-- コキャクメイ -->
              <v-text-field
              class="input"
                v-model="CKName"
                :error-messages="CKNameErrors"
                :counter="255"
                label="コキャクメイ"
                @input="$v.CKName.$touch()"
                @blur="$v.CKName.$touch()"
              ></v-text-field>
              <!-- 郵便番号 -->
              <v-text-field
              class="input"
                v-model="postalCode"
                :error-messages="postalCode"
                :counter="7"
                label="郵便番号"
                @input="$v.postalCode.$touch()"
                @blur="$v.postalCode.$touch()"
              ></v-text-field>
              <!-- 住所 -->
              <v-text-field
              class="input"
                v-model="Address"
                :error-messages="Address"
                :counter="255"
                label="住所"
                @input="$v.Address.$touch()"
                @blur="$v.Address.$touch()"
              ></v-text-field>
              <!-- 電話番号 -->
              <v-text-field
              class="input"
                v-model="PhoneNumber"
                :error-messages="PhoneNumber"
                :counter="11"
                label="電話番号"
                @input="$v.PhoneNumber.$touch()"
                @blur="$v.PhoneNumber.$touch()"
              ></v-text-field>
              <!-- メールアドレス -->
              <v-text-field
              class="input"
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <!-- 登録ボタンを押したら詳細画面に遷移する（現状は一覧画面に遷移） -->
              <!-- <router-link to="/clients/list"> -->
                <v-btn
                :disabled="invalid"
                type="submit"
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
import axios from 'axios'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import { ValidationObserver } from 'vee-validate'


const url = "http://localhost:7777/msm_client/api/clients/"

  export default {
    name: 'ProjectSearch',
    mixins: [validationMixin],

    components: {
      ValidationObserver,
    },

    validations: {
      // 顧客名：必須入力、２５５文字以内
      CName: { required, maxLength: maxLength(255) },
      // コキャクメイ：２５５文字以内
      CKName: { maxLength: maxLength(255) },
      // 郵便番号：７文字以内
      postalCode: { maxLength: maxLength(7) },
      // 住所：２５５文字以内
      Address: { maxLength: maxLength(255) },
      // 電話暗号：１１文字以内
      PhoneNumber: { maxLength: maxLength(11) },
      // メールアドレス：必須入力、メールアドレス形式チェック
      email: { required, email },
    },

    data: () => ({
      // tab
      tab: null,
        items: [
          { id: 0 , tab: '検索'},
          { id: 1 , tab: '登録'},
        ],

      // 検索用v-model
      company_name: '',
      company_name_kana: '',
      company_id: null,
      postal_code: '',
      address: '',
      phone_number: '',
      Semail: '',
      created_by: '',
      updated_by: '',

      // v-model
      CName: '',
      CKName: '',
      postalCode: '',
      Address: '',
      PhoneNumber: '',
      email: '',
    }),

    computed: {
      // エラーメッセージ
      // 顧客名
      CNameErrors () {
        const errors = []
        if (!this.$v.CName.$dirty) return errors
        !this.$v.CName.maxLength && errors.push('顧客名は２５５文字以内で入力してください！')
        !this.$v.CName.required && errors.push('顧客名を入力してください！')
        return errors
      },
      // コキャクメイ
      CKNameErrors () {
        const errors = []
        if (!this.$v.CKName.$dirty) return errors
        !this.$v.CKName.maxLength && errors.push('コキャクメイは２５５文字以内で入力してください！')
        return errors
      },
      // 郵便番号
      postalCodeErrors () {
        const errors = []
        if (!this.$v.postalCode.$dirty) return errors
        !this.$v.postalCode.maxLength && errors.push('郵便番号は７文字以内で入力してください！')
        return errors
      },
      // 住所
      AddressErrors () {
        const errors = []
        if (!this.$v.Address.$dirty) return errors
        !this.$v.Address.maxLength && errors.push('住所は２５５文字以内で入力してください！')
        return errors
      },
      // 電話番号
      PhoneNumberErrors () {
        const errors = []
        if (!this.$v.PhoneNumber.$dirty) return errors
        !this.$v.PhoneNumber.maxLength && errors.push('電話番号は１１文字以内で入力してください！')
        return errors
      },
      // メールアドレス
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('正しい形式で入力してください！')
        !this.$v.email.required && errors.push('メールアドレスを入力してください！')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        // console.log(this.name)
        axios
          .post(url, {
            company_name: this.CName,
            company_name_kana: this.CKName,
            postal_code: this.postalCode,
            address: this.Address,
            phone_number: this.PhoneNumber,
            email: this.email
          }).then((res) => {
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })
      },
      search(){
        this.$router.push({
          path: '/clients/list',
          query: {
            company_name: this.company_name,
            company_name_kana: this.company_name_kana,
            company_id: this.company_id,
            postal_code: this.postal_code,
            address: this.address,
            phone_number: this.phone_number,
            Semail: this.Semail,
            created_by: this.created_by,
            updated_by: this.updated_by,
          }
        })
      },
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
