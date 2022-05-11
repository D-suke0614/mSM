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
      <h2>Project</h2>
      <v-tabs-items v-model="tab">
        <!-- 検索タブ -->
        <v-tab-item>
          <v-form v-on:submit.prevent="onSubmit">
            <v-text-field class="input" placeholder="案件名" v-model="title"></v-text-field>
            <v-text-field class="input" placeholder="案件ID" v-model="project_id"></v-text-field>
            <v-text-field class="input" placeholder="顧客名" v-model="client_name"></v-text-field>
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
              <!-- 案件名 -->
              <v-text-field
              class="input"
                v-model="pjName"
                :error-messages="pjNameErrors"
                :counter="255"
                label="案件名"
                required
                @input="$v.pjName.$touch()"
                @blur="$v.pjName.$touch()"
              ></v-text-field>
              <!-- 案件内容 -->
              <v-textarea
                rows="7"
                class="input"
                v-model="pjContent"
                :error-messages="pjContentErrors"
                label="内容"
                required
                @input="$v.pjContent.$touch()"
                @blur="$v.pjContent.$touch()"
              ></v-textarea>
              <!-- <router-link to="/projects/list"> -->
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
  import axios from 'axios'
  import { ValidationObserver } from 'vee-validate'

const url = "http://localhost:7773/msm_project/api/projects/"


  export default {
    name: 'ProjectSearch',
    mixins: [validationMixin],

    components: {
      ValidationObserver,
    },

    validations: {
      // 案件名：必須入力、２５５文字以内
      pjName: { required, maxLength: maxLength(255) },
      // 案件内容：必須入力
      pjContent: { required },
    },

    data: () => ({
      // tab
      tab: null,
        items: [
          { id: 0 , tab: '検索'},
          { id: 1 , tab: '登録'},
        ],

      // v-model
      pjName: '',
      pjContent: '',

      // 検索用v-model
      project_id: '',
      title: '',
      created_by: null,
      updated_by: null,

      projects: [],
    }),

    computed: {
      // エラーメッセージ
      // 案件名
      pjNameErrors () {
        const errors = []
        if (!this.$v.pjName.$dirty) return errors
        !this.$v.pjName.maxLength && errors.push('案件名は２５５文字以内で入力してください！')
        !this.$v.pjName.required && errors.push('案件名を入力してください！')
        return errors
      },
      // 案件内容
      pjContentErrors () {
        const errors = []
        if (!this.$v.pjContent.$dirty) return errors
        !this.$v.pjContent.required && errors.push('案件名を入力してください！')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        // console.log(this.name)
        axios.post(url,{
          created_by: this.$store.state.my_employee.id,
          updated_by: this.$store.state.my_employee.id,
          title: this.pjName,
          content: this.pjContent,
          client_id: 2
        }).then((res) => {
          console.log(res)
          this.$router.push({
            path: '/projects/detail',
            query: {
              project: res.data
            }
          })
        }).catch((err) => {
          console.log(err)
        })
      },
      search() {
        this.$router.push({
          path: '/projects/list',
          query: {
            id: this.project_id,
            // project_id: this.project_name,
            client_id: this.client_id,
            title: this.title,
            // created_by: this.created_by,
            // updated_by: this.updated_by
          }
        })
      }
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
