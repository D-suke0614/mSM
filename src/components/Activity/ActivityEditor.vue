<template>
  <v-sheet>
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

      // v-model
      ActivityName: '',
      ActivityContents: '',
      itemName: '',
      itemAmount: '',
      itemPrice: '',
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
          updated_by: this.$store.state.my_employee.id,
          title: this.ActivityName,
          content: this.ActivityContents,
          item_name: this.itemName,
          item_price: this.itemPrice,
          item_amount: this.itemAmount,
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
    },
    created() {
      const activity_id = this.$route.query.id
      axios.get(url + `${activity_id}`)
        .then((res) => {
          console.log(res.data)
          let a = res.data
          this.ActivityName = a.title,
          this.ActivityContents = a.content,
          this.itemName = a.item_name,
          this.itemPrice = a.item_price,
          this.itemAmount = a.item_amount
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
