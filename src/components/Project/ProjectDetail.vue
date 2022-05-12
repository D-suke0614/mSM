<template>
  <v-container>
    
    <v-row class="my-2">
      <v-col cols="5" sm="4" align="center">
          <p class="text-h4 d-inline">Project</p>
      </v-col>
      <v-col cols="3" sm="3"></v-col>
      <v-col cols="4" sm="5" align="center">
          <v-btn color="green" class="ml-5 mx-2 white--text" @click="searchActivity">活動一覧</v-btn>
          <v-btn color="primary" class="mx-2" @click="openEditor">編集</v-btn>
          <v-btn color="red" class="mx-2 white--text" @click="deleteProject">削除</v-btn>
      </v-col>
    </v-row>
        
    <v-row class="my-2">
      <v-col cols="12">
        <v-simple-table class="mx-auto">
          <template>
            <tbody>
              <tr v-for="(key, value) in th_list" :key="value.id" >
                <th class="text-center text-h5">{{ key }}</th>
                <td class="text-center text-h6">{{ project[value] }}</td>
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

const url = "http://localhost:7773/msm_project/api/projects/"

export default {
  name: "ProjectDetail",
  data() {
    return {
      th_list: { 
        id: "案件ID",
        created_by: "作成者",
        updated_by: "更新者",
        client_id: "顧客ID",
        title: "案件名",
        content: "案件内容",
        created_at: "登録日",
        updated_at: "更新日",
      },
      project: null,
    };
  },
  methods: {
    searchActivity(){
      this.$router.push({
        path: '/activities/list',
        query: {
          title: '',
          id: '',
          project_id: this.project.id,
          item_name: '',
          item_amount: '',
          item_price: '',
        }
      })
    },
    openEditor() {
      this.$router.push({
        path: '/projects/edit',
        query: {
          id: this.project.id
        }
      })
    },
    deleteProject() {
      if(confirm('本当に削除しますか？')){
        // this.$router.back()

        // 削除処理
        // console.log(url + `${this.project.id}/delete`)
        axios.post(url + `${this.project.id}/delete`)
          .then((res) => {
            console.log(res)
            // this.$router.push({
            //   path: '/projects/list'
            // })
          }).catch((err) => {
            console.log(err)
          })
        
        window.close()
        this.$router.back()
      }
    }
  },
  created() {
    this.project = this.$route.query.project
    console.log(this.project)
    if(this.project == null){
      axios.get(url + this.$route.query.id)
        .then((res) => {
          this.project = res.data
        })
    }
  }
};
</script>