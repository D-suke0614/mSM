<template>
  <v-sheet elevation="6">
    <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <div class="list">
            <!-- <h1>This is Project list display</h1> -->
            <p v-if="errored" v-cloak>{{ error }}</p>
            <p v-if="loading" v-cloak>Loading...</p>

            <div v-else>
              <v-data-table
                :headers="headers"
                :items="employees"
                :items-per-page="10"
                class="elevation-5"
                v-for="todo in sa" :key="todo.id"
                v-cloak
                @click:row="showAdminDetail"
                >
                {{todo.title}}
              </v-data-table>
            </div>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>


<script>
import axios from 'axios'

const url = "http://localhost:7774/msm_employee/api/employees/"

export default {
  name: 'EmployeeList',
  data () {
    return {
      tab: null,
      loading: true,
      errored: false,
      error: null,
      todos: null,
      sa: 1,
      items: [
        '社員情報', '検索', '登録',
      ],
      headers: [
        { text: '社員ID', align: 'start', value: 'id',},
        { text: '姓', value: 'last_name' },
        { text: '名', value: 'first_name' },
        { text: 'セイ', value: 'last_name_kana' },
        { text: 'メイ', value: 'first_name_kana' },
        { text: 'メールアドレス', value: 'email' },
        { text: '電話番号', value: 'phone_number' },
        { text: '生年月日', value: 'birthday' },
        { text: '入社日', value: 'hire_date' },
        { text: '部署', value: 'department' },
        { text: '役職', value: 'position' },
        { text: '退職済み', value: 'is_deleted' },
        { text: '登録日', value: 'created_at' },
        { text: '更新日', value: 'updated_at' },
      ],
      employees: [],
    }
  },
  methods: {
    showAdminDetail(data) {
      let resolvedRoute = this.$router.resolve({
        name: 'admin_detail',
        query: {
          // APIと接続後に変更
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          first_name_kana: data.first_name_kana,
          last_name_kana: data.last_name_kana,
          profile_image_url: data.profile_image_url,
          phone_number: data.phone_number,
          email: data.email,
          department: data.department,
          position: data.position,
          birthday: data.birthday,
          hire_date: data.hire_date,
          password: data.password,
          is_admin: false,
          is_deleted: false,
          created_at: data.created_at,
          updated_at: data.updated_at,
        }
      })
      window.open( resolvedRoute.href, null, "_blank")
    },
  },
  created() {
    // axios
    //   .get("https://jsonplaceholder.typicode.com/todos")
    //   .then(response => {
    //     this.todos = response.data;
    //   })
    //   .catch(err => {
    //     (this.errored = true), (this.error = err);
    //   })
    //   .finally(() => (this.loading = false));
    axios
      .get(url + "search?id=&first_name=&last_name=&first_name_kana=&last_name_kana=&phone_number=&email=te&department=&position=")
      .then(response => {
        console.log(response)
        this.employees = response.data
      }).catch(err => {
        console.log(err)
      }).finally(() => (this.loading = false));
  }
}
</script>
