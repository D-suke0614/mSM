<template>
  <v-container>
    
    <v-row class="my-2">
      <v-col cols="5" sm="4" align="center">
          <p class="text-h4 d-inline">Activity</p>
      </v-col>
      <v-col cols="3" sm="3"></v-col>
      <v-col cols="4" sm="5" align="center">
          <!-- <v-btn color="green" class="ml-5 mx-2 white--text" @click="searchProject">案件一覧</v-btn> -->
          <v-btn color="primary" class="mx-2" @click="openEditor">編集</v-btn>
          <v-btn color="red" class="mx-2 white--text" @click="deleteActivity">削除</v-btn>
      </v-col>
    </v-row>
        
    <v-row class="my-2">
      <v-col cols="12">
        <v-simple-table class="mx-auto">
          <template>
            <tbody>
              <tr v-for="(key, value) in th_list" :key="value.id" >
                <th class="text-center text-h5">{{ key }}</th>
                <td class="text-center text-h6">{{ activity[value] }}</td>
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

// const url = "http:localhost:7777/msm_activity/api/"

export default {
  name: "ActivityIndex",
  data() {
    return {
      th_list: { 
        id: "顧客ID",
        project_id: "案件名",
        created_by: "作成者",
        updated_by: "更新者",
        title: "活動名",
        content: "活動内容",
        started_at: "開始時間",
        finished_at: "終了時間",
        item_name: "商品名",
        item_amount: "商品個数",
        item_price: "商品価格",
        created_at: "登録日",
        updated_at: "更新日",
      },
      activity: { 
        id: this.$route.query.id,
        project_id: this.$route.query.project_id,
        created_by: this.$route.query.created_by,
        updated_by: this.$route.query.updated_by,
        title: this.$route.query.title,
        content: this.$route.query.title,
        started_at: this.$route.query.started_at,
        finished_at: this.$route.query.finished_at,
        item_name: this.$route.query.item_name,
        item_amount: this.$route.query.item_amount,
        item_price: this.$route.query.item_price,
        created_at: this.$route.query.created_at,
        updated_at: this.$route.query.updated_at,
      },
    };
  },
  methods: {
    // searchProject(){
    //   this.$router.push({ path: '/projects/list'})

    //   // 必要に応じて
    //   // window.close()
    // },
    openEditor() {
      this.$router.push({ path: '/activitys/edit' })
    },
    deleteActivity() {
      if(confirm('本当に削除しますか？')){
        // this.$router.back()

        // 削除処理
        // axios.delete(url + `activitys/${this.activity.id}/delete`)
        //   .then((res) => {
        //     console.log(res)
        //   }).catch((err) => {
        //     console.log(err)
        //   })
        
        window.close()
      }
    }
  }
};
</script>