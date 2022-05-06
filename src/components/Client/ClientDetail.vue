<template>
  <v-container>
    
    <v-row class="my-2">
      <v-col cols="5" sm="4" align="center">
          <p class="text-h4 d-inline">Client</p>
      </v-col>
      <v-col cols="3" sm="3"></v-col>
      <v-col cols="4" sm="5" align="center">
          <v-btn color="green" class="ml-5 mx-2 white--text">案件一覧</v-btn>
          <v-btn color="red" class="mx-2 white--text">削除</v-btn>
          <v-btn color="primary" class="mx-2">編集</v-btn>
      </v-col>
    </v-row>
        
    <v-row class="my-2">
      <v-col cols="12">
        <v-simple-table class="mx-auto">
          <template>
            <tbody>
              <tr v-for="(key, value) in th_list" :key="value.id" >
                <th class="text-center text-h5">{{ key }}</th>
                <td class="text-center text-h6">{{ client[value] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

</v-container>
</template>

<script>

export default {
  name: "ClientIndex",
  data() {
    return {
      th_list: { 
        id: "顧客ID",
        name: "顧客名",
        name_kana: "コキャクメイ",
        postal_code: "郵便番号",
        address: "住所",
        phone_number: "電話番号",
        email: "メールアドレス",
        created_at: "登録日",
        updated_at: "更新日",
      },
      client: { 
        id: this.$route.query.id,
        name: this.$route.query.name,
        name_kana: this.$route.query.name,
        postal_code: this.$route.query.name,
        address: this.$route.query.name,
        phone_number: this.$route.query.name,
        email: this.$route.query.name,
        created_at: this.$route.query.name,
        updated_at: this.$route.query.name,
      },
    };
  },
};
</script>