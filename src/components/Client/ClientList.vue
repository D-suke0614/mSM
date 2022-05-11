<template>
  <v-sheet elevation="6">
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

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <div class="list">
                <p v-if="errored" v-cloak>{{ error }}</p>
                <p v-if="loading" v-cloak>Loading...</p>

                <div v-else>
                  <v-data-table
                    :headers="headers"
                    :items="clients"
                    :items-per-page="10"
                    class="elevation-5"
                    v-for="client in sa" :key="client.id"
                    v-cloak
                  @click:row="showClientDetail"
                  >
                    <!-- {{client.client_name}} -->
                  </v-data-table>
                </div>
              </div>
            </v-card>
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
                v-model="e_mail"
                :error-messages="e_mailErrors"
                label="E-mail"
                required
                @input="$v.e_mail.$touch()"
                @blur="$v.e_mail.$touch()"
              ></v-text-field>
              <!-- 登録ボタンを押したら詳細画面に遷移する（現状は一覧画面に遷移） -->
              <!-- <router-link to="/clients/list"> -->
                <v-btn
                :disabled="invalid"
                  class="mr-4 button"
                  color="primary"
                  @click="createClient"
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
    name: 'ClientList',
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
      e_mail: { required, email },
    },

    data () {
      return {
        tab: null,
        loading: true,
        errored: false,
        error: null,
        todos: null,
        sa: 1,
        items: [
          { id: 0 , tab: '検索結果'},
          { id: 1 , tab: '登録'},
        ],
        headers: [
          {
            text: '顧客ID',
            align: 'start',
            value: 'id',
          },
          { text: '顧客名', value: 'company_name' },
          { text: 'コキャクメイ', value: 'company_name_kana' },
          { text: '郵便番号', value: 'postal_code' },
          { text: '住所', value: 'address' },
          { text: '電話番号', value: 'phone_number' },
          { text: 'メールアドレス', value: 'email' },
          { text: '登録日', value: 'created_at' },
          { text: '更新日', value: 'updated_at' },
        ],
        clients: null,

      // 登録タブ用v-model
      CName: '',
      CKName: '',
      postalCode: '',
      Address: '',
      PhoneNumber: '',
      e_mail: '',
      }
    },

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
      e_mailErrors () {
        const errors = []
        if (!this.$v.e_mail.$dirty) return errors
        !this.$v.e_mail.email && errors.push('正しい形式で入力してください！')
        !this.$v.e_mail.required && errors.push('メールアドレスを入力してください！')
        return errors
      },
    },

    methods: {
      showClientDetail(data) {
        console.log(data)
        let resolvedRoute = this.$router.resolve({
          name: 'client_detail',
          query: {
            // APIと接続後に変更
            id: data.id,
            name: data.company_name,
            name_kana: data.company_name_kana,
            postal_code: data.postal_code,
            address: data.address,
            phone_number: data.phone_number,
            email: data.email,
            created_at: data.created_at,
            updated_at: data.updated_at,
          }
        })
        window.open( resolvedRoute.href, null, "_blank")
      },
      createClient() {
        this.$v.$touch()
        axios
          .post(url, {
            company_name: this.CName,
            company_name_kana: this.CKName,
            postal_code: this.postalCode,
            address: this.Address,
            phone_number: this.PhoneNumber,
            email: this.e_mail
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
      let qu = this.$route.query
      axios
        .get(url + `search?company_name=${qu.company_name}&company_name_kana=${qu.company_name_kana}&postal_code=${qu.postal_code}&address=${qu.address}&phone_number=${qu.phone_number}&email=${qu.Semail}`
          // ,{
          //   company_name: this.$route.query.company_name,
          //   company_name_kana: this.$route.query.company_name_kana,
          //   postal_code: this.$route.query.postal_code,
          //   address: this.$route.query.address,
          //   phone_number: this.$route.query.phone_number,
          //   Semail: this.$route.query.Semail,
          //   created_by: this.$route.query.created_by,
          //   updated_by: this.$route.query.updated_by,
          // }
        )
        .then(response => {
          console.log(response)
          this.clients = response.data;
        })
        .catch(err => {
          (this.errored = true), (this.error = err);
        })
        .finally(() => (this.loading = false));
    }
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
