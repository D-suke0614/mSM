<template>
  <v-container>

    <v-row class="my-2">
      <v-col cols="5" sm="4" align="center">
          <p class="text-h4 d-inline">Client</p>
      </v-col>
      <v-col cols="3" sm="3"></v-col>
      <v-col cols="4" sm="5" align="center">
          <v-btn color="green" class="ml-5 mx-2 white--text" @click="searchProject">案件一覧</v-btn>
          <v-btn color="primary" class="mx-2" @click="openEditor">編集</v-btn>
          <v-btn color="red" class="mx-2 white--text" @click="deleteClient">削除</v-btn>
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
import axios from 'axios';

const url = "http://localhost:7777/msm_client/api/clients/"

export default {
  name: "ClientDetail",
  data() {
    return {
      th_list: {
        id: "顧客ID",
        company_name: "顧客名",
        company_name_kana: "コキャクメイ",
        postal_code: "郵便番号",
        address: "住所",
        phone_number: "電話番号",
        email: "メールアドレス",
        created_at: "登録日",
        updated_at: "更新日",
      },
      client: null,
    };
  },
  methods: {
    searchProject(){
      this.$router.push({ path: '/projects/list'})

      // 必要に応じて
      // window.close()
    },
    openEditor() {
      console.log("客家")
      this.$router.push({
        path: '/clients/edit',
        query: {
          id: this.client.id
        }
      })
    },
    deleteClient() {
      if(confirm('本当に削除しますか？')){
        // this.$router.back()
        console.log(url + `${this.client.id}/delete`)
        // 削除処理
        axios.post(url + `${this.client.id}/delete`)
          .then((res) => {
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })

        window.close()
        this.$router.back()
        // this.$router.push({
        //   path: '/clients/list'
        // })
      }
    }
  },
  created() {
    this.client = this.$route.query.client
    if(this.client == null){
      console.log("アクセス開始")
      console.log(url + this.$route.query.id)
      axios.get(url + this.$route.query.id)
        .then((res) => {
          this.client = res.data
        })
    }
  }
};
</script>
