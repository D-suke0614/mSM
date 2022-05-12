<template>
  <v-container>
    <v-row class="my-2">
      <v-col cols="5" sm="4" align="center">
          <p class="text-h4 d-inline">Admin</p>
      </v-col>
      <v-col cols="3" sm="3"></v-col>
      <v-col v-if="this.$store.state.my_employee.is_admin" cols="4" sm="5" align="center">
          <!-- <v-btn color="green" class="ml-5 mx-2 white--text" @click="searchProject">案件一覧</v-btn> -->
          <v-btn color="primary" class="mx-2" @click="openEditor">編集</v-btn>
          <v-btn color="red" class="mx-2 white--text" @click="deleteEmployee">削除</v-btn>
      </v-col>
    </v-row>

    <v-row class="my-2">
      <v-col cols="12">
        <v-simple-table class="mx-auto">
          <template>
            <tbody>
              <tr v-for="(key, value) in th_list" :key="value.id" >
                <th class="text-center text-h5">{{ key }}</th>
                <td class="text-center text-h6">{{ employee[value] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from 'axios';

const url = "http://localhost:7770/msm_employee/api/employees/"


export default {
  name: "AdminDetail",
  data() {
    return {
      th_list: {
        id: "社員ID",
        first_name: "名",
        last_name: "姓",
        first_name_kana: "メイ",
        last_name_kana: "セイ",
        profile_image_url: "画像",
        phone_number: "電話番号",
        email: "メールアドレス",
        department: "部署",
        position: "役職",
        birthday: "生年月日",
        hire_date: "入社日",
        password: "パスワード",
        is_admin: "管理者",
        is_deleted: "削除",
        created_at: "作成日",
        updated_at: "更新日",
      },
      employee: null,
    };
  },
  methods: {
    openEditor() {
      // 管理者
      this.$router.push({
        path: '/admin/edit',
        query: {
          id: this.employee.id
        }
      })
    },
    deleteEmployee() {
      if(confirm('本当に削除しますか？')){
        // this.$router.back()

        // 削除処理
        axios.post(url + `${this.employee.id}/delete`)
          .then((res) => {
            console.log(res)
            // this.$router.push({ path: '/admin/list' })
          }).catch((err) => {
            console.log(err)
          })

        // this.$router.push({ path: '/admin/list' })
        window.close()
        this.$router.back()
      }
    }
  },
  created() {
    // const user_id = query; // ログインしているユーザー
    // axios.get(url + `${user_id}`)
    //   .then((res) => {
    //     console.log(res.data)
    //     this.employee = res.data
    //   }).catch((err) =>{ 
    //     console.log(err)
    //   })
    this.employee = this.$route.query.employee
    if(this.employee == null){
      axios.get(url + this.$route.query.id)
        .then((res) => {
          this.employee = res.data
        })
    }
  },
};
</script>
