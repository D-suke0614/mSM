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
            <!-- <h1>This is Project list display</h1> -->
            <p v-if="errored" v-cloak>{{ error }}</p>
            <p v-if="loading" v-cloak>Loading...</p>

            <div v-else>
              <v-data-table
                :headers="headers"
                :items="projects"
                :items-per-page="10"
                class="elevation-5"
                v-for="project in sa" :key="project.id"
                v-cloak
                @click:row="showProjectDetail"
                >
                {{project.title}}
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
import { required, maxLength } from 'vuelidate/lib/validators'
import { ValidationObserver } from 'vee-validate'

const url = "http://localhost:7773/msm_project/api/projects/"
  export default {
    name: 'PrijectList',
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

    data () {
      return {
        tab: null,
        loading: true,
        errored: false,
        error: null,
        projects: null,
        sa: 1,
        items: [
          { id: 0 , tab: '検索結果'},
          { id: 1 , tab: '登録'},
        ],
        headers: [
          {
            text: '案件ID',
            align: 'start',
            value: 'id',
          },
          { text: '案件名', value: 'title' },
          { text: '内容', value: 'content' },
          { text: '顧客ID', value: 'client_id' },
          { text: '削除', value: 'is_deleted' },
          { text: '登録者', value: 'created_by' },
          { text: '更新者', value: 'updated_by' },
          { text: '登録日', value: 'created_at' },
          { text: '更新日', value: 'updated_at' },
        ],

      // 登録用v-model
      pjName: '',
      pjContent: '',
      }
    },

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
      showProjectDetail(data){
        console.log(data)
        let resolvedRoute = this.$router.resolve({
          name: 'project_detail',
          query: {
            // APIと接続後に変更
            id: data.id,
            created_by: data.created_by,
            updated_by: data.updated_by,
            client_id: data.client_id,
            title: data.title,
            content: data.content,
            created_at: data.created_at,
            updated_at: data.updated_at,
          }
        })

        window.open( resolvedRoute.href, null, "_blank")
      }
    },
    created() {
      let qu = this.$route.query
      axios
        .get(url + `search?id=${qu.id}&title=${qu.title}&client_id=`)
        .then(response => {
          this.projects = response.data;
        })
        .catch(err => {
          (this.errored = true), (this.error = err);
        })
        .finally(() => (this.loading = false));
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
