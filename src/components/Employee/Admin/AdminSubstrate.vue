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
        <!-- 検索タブ -->
        <v-tab-item>
          <v-form v-on:submit.prevent="onSubmit">
            <v-text-field class="input" placeholder="案件名"></v-text-field>
            <v-text-field class="input" placeholder="案件ID"></v-text-field>
            <v-text-field class="input" placeholder="顧客名"></v-text-field>
            <v-text-field class="input" placeholder="登録者"></v-text-field>
            <v-text-field class="input" placeholder="編集者"></v-text-field>
            <!-- 一覧画面に遷移し、検索結果が表示される -->
            <router-link to="/projects/list">
              <v-btn class="button" color="primary" @click="search">検索</v-btn>
            </router-link>
          </v-form>
        </v-tab-item>


      <!-- 登録タブ -->
        <v-tab-item>
          <form >
            <v-text-field
            class="input"
              v-model="pjName"
              :error-messages="pjNameErrors"
              :counter="10"
              label="案件名"
              required
              @input="$v.pjName.$touch()"
              @blur="$v.pjName.$touch()"
            ></v-text-field>
            <v-text-field
            class="input"
              v-model="pjContent"
              :error-messages="pjContentErrors"
              label="内容"
              required
              @input="$v.pjContent.$touch()"
              @blur="$v.pjContent.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="pj_id"
            label="案件ID"
            class="input"
            >
            </v-text-field>
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
              class="mr-4 button"
              color="primary"
              @click="submit"
            >
              登録
            </v-btn>
          </form>
        </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>


<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    name: 'ProjectSearch',
    mixins: [validationMixin],

    validations: {
      pjName: { required, maxLength: maxLength(10) },
      pjContent: { required },
      email: { required, email },
    },

    data: () => ({
      // tab
      tab: null,
        items: [
          { id: 0 , tab: '検索'},
          { id: 1 , tab: '登録'},
        ],
        headers: [
          {
            text: '案件ID',
            align: 'start',
            value: 'id',
          },
          { text: '案件名', value: 'title' },
          { text: '顧客名', value: 'title' },
          { text: '内容', value: 'title' },
          { text: '登録者', value: 'title' },
          { text: '更新者', value: 'title' },
          { text: '登録日', value: 'title' },
          { text: '更新日', value: 'title' },
        ],

      // validation
      pjName: '',
      pjContent: '',
      email: '',
    }),

    computed: {
      pjNameErrors () {
        const errors = []
        if (!this.$v.pjName.$dirty) return errors
        !this.$v.pjName.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.pjName.required && errors.push('案件名を入力してください！')
        return errors
      },
      pjContentErrors () {
        const errors = []
        if (!this.$v.pjContent.$dirty) return errors
        !this.$v.pjContent.required && errors.push('案件名を入力してください！')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        // console.log(this.name)
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
