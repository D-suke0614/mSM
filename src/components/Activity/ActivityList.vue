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
        <!-- 検索結果一覧表示タブ -->
      <v-tab-item>
        <v-card flat>
          <div class="list">
            <!-- <h1>This is Project list display</h1> -->
            <p v-if="errored" v-cloak>{{ error }}</p>
            <p v-if="loading" v-cloak>Loading...</p>

            <div v-else>
              <v-data-table
                :headers="headers"
                :items="activities"
                :items-per-page="10"
                class="elevation-5"
                v-for="todo in sa" :key="todo.id"
                v-cloak
                @click:row="showActivityDetail"
                >
                {{todo.title}}
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
import axios from 'axios'
import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'
  import { ValidationObserver } from 'vee-validate'

const url = "http://localhost:7775/msm_activity/api/activities/"

  export default {
    name: 'ActivityList',
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

    data () {
      return {
        tab: null,
        loading: true,
        errored: false,
        error: null,
        sa: 1,
        items: [
          { id: 0 , tab: '検索結果'},
          { id: 1 , tab: '登録'},
        ],
        headers: [
          {
            text: '活動名',
            align: 'start',
            value: 'id',
          },
          { text: '活動名', value: 'title' },
          { text: '顧客名', value: 'client_name' },
          { text: '案件名', value: 'project_name' },
          { text: '内容', value: 'content' },
          { text: '開始日時', value: 'startd_at' },
          { text: '終了日時', value: 'finished_at' },
          { text: '商品名', value: 'item_name' },
          { text: '商品価格', value: 'item_price' },
          { text: '商品個数', value: 'item_amount' },
          { text: '登録者ID', value: 'created_by' },
          { text: '更新者ID', value: 'updated_by' },
          { text: '登録日', value: 'created_at' },
          { text: '更新日', value: 'updated_at' },
        ],

          // v-model
        ActivityName: '',
        ActivityContents: '',
        itemName: '',
        itemAmount: '',
        itemPrice: '',

        activities: null,
      }
    },

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
      AddressErrors () {
        const errors = []
        if (!this.$v.Address.$dirty) return errors
        !this.$v.Address.maxLength && errors.push('住所は２５５文字以内で入力してください！')
        return errors
      },
    },

    methods: {
      showActivityDetail(data) {
        let resolvedRoute = this.$router.resolve({
          name: 'activity_detail',
          query: {
            // APIと接続後に変更
            id: data.id,
            project_id: data.id,
            created_by: data.id,
            updated_by: data.id,
            title: data.title,
            content: data.title,
            started_at: data.title,
            finished_at: data.title,
            item_name: data.title,
            item_amount: data.title,
            item_price: data.title,
            created_at: data.title,
            updated_at: data.title,
          }
        })
        window.open( resolvedRoute.href, null, "_blank")
      },
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
    },
    created() {
      let qu = this.$route.query
      axios
        .get(url + `search?id=${qu.id}&project_id=${qu.project_id}&title=${qu.title}&item_name=${qu.item_name}&item_amount=${qu.item_amount}&item_price=${qu.item_price}`)
        .then(response => {

          let client_name = []
          let project_name = []
          let activity_list = []
          const n = response.data.length

          for(let i = 0; i < n; i += 3){
            client_name.push(response.data[i])
            project_name.push(response.data[i+1])
            activity_list.push(response.data[i+2])
          }

          let result = []
          for(let i = 0; i < n/3; i++){
            let array = activity_list[i]
            array["client_name"] = client_name[i]
            array["project_name"] = project_name[i]
            result.push(array)
          }
          this.activities = result

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
