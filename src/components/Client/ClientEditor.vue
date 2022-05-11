<template>
  <v-sheet>
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
          <v-btn
          :disabled="invalid"
            class="mr-4 button"
            color="primary"
            @click="updateClient"
          >
            登録
          </v-btn>
      </form>
    </validation-observer>
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
      updateClient() {
        this.$v.$touch()
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
            this.$router.push({
              path: '/clients/detail',
              query: {
                client: res.data
              }
            })
          }).catch((err) => {
            console.log(err)
          })
      },
    },
    created() {
      const client_id = this.$route.query.id
      axios.get(url + `${client_id}`)
        .then((res) => {
          console.log(res.data)
          let a = res.data
          this.CName = a.company_name
          this.CKName = a.company_name_kana
          this.postalCode = a.postal_code
          this.Address = a.address
          this.PhoneNumber = a.phone_number
          this.email = a.email
        }).catch((err) =>{ 
          console.log(err)
        })
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
