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
      <v-tabs-items v-model="tab">
        <v-row class="my-2">
          <v-col cols="5" sm="4" align="center">
              <p class="text-h4 d-inline">Activity</p>
          </v-col>
        </v-row>
        <!-- 検索タブ -->
        <v-tab-item>
          <v-form v-on:submit.prevent="onSubmit">
            <v-text-field class="input" placeholder="活動名" v-model="title"></v-text-field>
            <!-- <v-text-field class="input" placeholder="活動ID" v-model="id"></v-text-field> -->
            <!-- <v-text-field class="input" placeholder="顧客名"></v-text-field> -->
            <!-- <v-text-field class="input" placeholder="顧客ID"></v-text-field> -->
            <v-text-field class="input" placeholder="商品名" v-model="item_name"></v-text-field>
            <v-text-field class="input" placeholder="商品個数" v-model="item_amount"></v-text-field>
            <v-text-field class="input" placeholder="商品価格" v-model="item_price"></v-text-field>
            <!-- <v-text-field class="input" placeholder="登録者"></v-text-field>
            <v-text-field class="input" placeholder="編集者"></v-text-field> -->
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
              <!-- 活動名 -->
              <v-text-field
              class="input"
                v-model="ActivityName"
                :error-messages="ActivityNameErrors"
                :counter="255"
                label="活動名"
                required
                @input="$v.ActivityName.$touch()"
                @blur="$v.ActivityName.$touch()"
              ></v-text-field>
              <!-- 活動内容 -->
              <v-textarea
              rows="7"
              class="input"
                v-model="ActivityContents"
                :error-messages="ActivityContentsErrors"
                label="活動内容"
                required
                @input="$v.ActivityContents.$touch()"
                @blur="$v.ActivityContents.$touch()"
              ></v-textarea>
              <!-- 商品名 -->
              <v-text-field
              class="input"
                v-model="itemName"
                label="商品名"
                @input="$v.itemName.$touch()"
                @blur="$v.itemName.$touch()"
              ></v-text-field>
              <!-- 商品個数 -->
              <v-text-field
              class="input"
              type="number"
              min="0"
                v-model="itemAmount"
                label="商品個数"
                @input="$v.itemAmount.$touch()"
                @blur="$v.itemAmount.$touch()"
              ></v-text-field>
              <!-- 商品価格 -->
              <v-text-field
              class="input"
              type="number"
              min="0"
                v-model="itemPrice"
                label="商品価格"
                @input="$v.itemPrice.$touch()"
                @blur="$v.itemPrice.$touch()"
              ></v-text-field>

              <!-- 登録ボタンを押したら詳細画面に遷移する（現状は遷移なし） -->
              <!-- <router-link to="/activities/list"> -->
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
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'
  import { ValidationObserver } from 'vee-validate'
import axios from 'axios'

const url = "http://localhost:7775/msm_activity/api/activities/"

  export default {
    name: 'ProjectSearch',
    mixins: [validationMixin],

    components: {
      ValidationObserver,
    },

    validations: {
      // 活動名：必須入力、２５５文字以内
      ActivityName: { required, maxLength: maxLength(255) },
      // 活動内容：必須入力
      ActivityContents: { required },
      // 商品名：バリデーションなし
      // 商品個数：バリデーションなし
      // 商品価格：バリデーションなし
    },

    data: () => ({
      // tab
      tab: null,
        items: [
          { id: 0 , tab: '検索'},
          { id: 1 , tab: '登録'},
        ],

      // v-model
      ActivityName: '',
      ActivityContents: '',
      itemName: '',
      itemAmount: '',
      itemPrice: '',

      // 検索用v-model
      title: '',
      id: '',
      item_name: '',
      item_amount: '',
      item_price: '',
    }),

    computed: {
      // エラーメッセージ
      // 活動名
      ActivityNameErrors () {
        const errors = []
        if (!this.$v.ActivityName.$dirty) return errors
        !this.$v.ActivityName.maxLength && errors.push('活動名は２５５文字以内で入力してください！')
        !this.$v.ActivityName.required && errors.push('活動名を入力してください！')
        return errors
      },
      // 活動内容
      ActivityContentsErrors () {
        const errors = []
        if (!this.$v.ActivityContents.$dirty) return errors
        !this.$v.ActivityContents.required && errors.push('活動内容を入力してください！')
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
      itemAmountErrors () {
        const errors = []
        if (!this.$v.itemAmount.$dirty) return errors
        !this.$v.itemAmount.maxLength && errors.push('住所は２５５文字以内で入力してください！')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        axios.post(url, {
          project_id: 1,
          created_by: this.$store.state.my_employee.id,
          updated_by: this.$store.state.my_employee.id,
          title: this.ActivityName,
          content: this.ActivityContents,
          item_name: this.itemName,
          item_price: this.itemPrice,
          item_amount: this.itemAmount
        }).then((res) => {
          console.log(res)
          this.$router.push({
            path: '/activities/detail',
            query: {
              activity: res.data
            }
          }).catch((err) =>{
            console.log(err)
          })
        })
      },
      search(){
        this.$router.push({
          path: '/activities/list',
          query: {
            title: this.title,
            id: this.id,
            client_id: '',
            item_name: this.item_name,
            item_amount: this.item_amount,
            item_price: this.item_price,
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
