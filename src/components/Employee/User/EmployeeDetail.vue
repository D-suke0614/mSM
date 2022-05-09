<template>
  <v-container>
    
    <v-row class="my-2">
      <v-col cols="5" sm="4" align="center">
          <p class="text-h4 d-inline">Employee</p>
      </v-col>
      <v-col cols="3" sm="3"></v-col>
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
// import axios from 'axios';

// const url = "http:localhost:7777/msm_employee/api/"

export default {
  name: "EmployeeDetail",
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
      employee: { 
        id: this.$route.query.id,
        first_name: this.$route.query.first_name,
        last_name: this.$route.query.last_name,
        first_name_kana: this.$route.query.first_name_kana,
        last_name_kana: this.$route.query.last_name_kana,
        profile_image_url: this.$route.query.profile_image_url,
        phone_number: this.$route.query.phone_number,
        email: this.$route.query.email,
        department: this.$route.query.department,
        position: this.$route.query.position,
        birthday: this.$route.query.birthday,
        hire_date: this.$route.query.hire_date,
        password: this.$route.query.password,
        is_admin: this.$route.query.is_admin,
        is_deleted: this.$route.query.is_deleted,
        created_at: this.$route.query.created_at,
        updated_at: this.$route.query.updated_at,
      },
    };
  },
  methods: {
  }
};
</script>