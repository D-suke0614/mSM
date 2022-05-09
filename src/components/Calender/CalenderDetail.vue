<template>
  <v-container>
    
    <v-row class="my-2">
      <v-col cols="5" sm="4" align="center">
          <p class="text-h4 d-inline">Calender</p>
      </v-col>
      <v-col cols="3" sm="3"></v-col>
      <v-col cols="4" sm="5" align="center">
          <v-btn color="primary" class="mx-2" @click="openEditor">編集</v-btn>
          <v-btn color="red" class="mx-2 white--text" @click="deleteCalender">削除</v-btn>
      </v-col>
    </v-row>
        
    <v-row class="my-2">
      <v-col cols="12">
        <v-simple-table class="mx-auto">
          <template>
            <tbody>
              <tr v-for="(key, value) in th_list" :key="value.id" >
                <th class="text-center text-h5">{{ key }}</th>
                <td class="text-center text-h6">{{ calender[value] }}</td>
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

// const url = "http:localhost:7777/msm_calender/api/"

export default {
  name: "CalenderDetail",
  data() {
    return {
      th_list: { 
        id: "予定ID",
        employee_id: "社員ID",
        title: "予定名",
        content: "予定内容",
        started_at: "開始日時",
        finished_at: "終了日時",
        created_at: "作成者",
        updated_at: "更新者",
      },
      calender: { 
        id: this.$route.query.id,
        employee_id: this.$route.query.employee_id,
        title: this.$route.query.title,
        content: this.$route.query.content,
        started_at: this.$route.query.started_at,
        finished_at: this.$route.query.finished_at,
        created_at: this.$route.query.created_at,
        updated_at: this.$route.query.updated_at,
      },
    };
  },
  methods: {
    openEditor() {
      this.$router.push({ path: '/calenders/edit' })
    },
    deleteCalender() {
      if(confirm('本当に削除しますか？')){
        // this.$router.back()

        // 削除処理
        // axios.delete(url + `calenders/${this.calender.id}/delete`)
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