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
                <p v-if="errored" v-cloak>{{ error }}</p>
                <p v-if="loading" v-cloak>Loading...</p>

                <div v-else>
                  <v-data-table
                    :headers="headers"
                    :items="clients"
                    :items-per-page="10"
                    class="elevation-5"
                    v-for="client in sa" :key="client.id"
                    v-cloak
                  @click:row="showClientDetail"
                  >
                    <!-- {{client.client_name}} -->
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

const url = "http://localhost:7777/msm_client/api/clients/"

  export default {
    name: 'ClientList',
    data () {
      return {
        tab: null,
        loading: true,
        errored: false,
        error: null,
        todos: null,
        sa: 1,
        items: [
          '検索', '登録',
        ],
        headers: [
          {
            text: '顧客ID',
            align: 'start',
            value: 'id',
          },
          { text: '顧客名', value: 'company_name' },
          { text: 'コキャクメイ', value: 'company_name_kana' },
          { text: '郵便番号', value: 'postal_code' },
          { text: '住所', value: 'address' },
          { text: '電話番号', value: 'phone_number' },
          { text: 'メールアドレス', value: 'email' },
          { text: '登録日', value: 'created_at' },
          { text: '更新日', value: 'updated_at' },
        ],
        clients: [],
      }
    },
    methods: {
      showClientDetail(data) {
        console.log(data)
        let resolvedRoute = this.$router.resolve({
          name: 'client_detail',
          query: {
            // APIと接続後に変更
            id: data.id,
            name: data.company_name,
            name_kana: data.company_name_kana,
            postal_code: data.postal_code,
            address: data.address,
            phone_number: data.phone_number,
            email: data.email,
            created_at: data.created_at,
            updated_at: data.updated_at,
          }
        })
        window.open( resolvedRoute.href, null, "_blank")
      },
    },
    created() {
      let qu = this.$route.query
      axios
        .get(url + `search?company_name=${qu.company_name}&company_name_kana=${qu.company_name_kana}&postal_code=${qu.postal_code}&address=${qu.address}&phone_number=${qu.phone_number}&email=${qu.Semail}`
          // ,{
          //   company_name: this.$route.query.company_name,
          //   company_name_kana: this.$route.query.company_name_kana,
          //   postal_code: this.$route.query.postal_code,
          //   address: this.$route.query.address,
          //   phone_number: this.$route.query.phone_number,
          //   Semail: this.$route.query.Semail,
          //   created_by: this.$route.query.created_by,
          //   updated_by: this.$route.query.updated_by,
          // }
        )
        .then(response => {
          console.log(response)
          this.clients = response.data;
        })
        .catch(err => {
          (this.errored = true), (this.error = err);
        })
        .finally(() => (this.loading = false));
    }
  }
</script>
