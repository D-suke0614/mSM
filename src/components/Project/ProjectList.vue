<template>
  <v-sheet elevation="6">
    <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
          class="tab"
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
                :items="projects"
                :items-per-page="10"
                class="elevation-5"
                v-for="project in sa" :key="project.id"
                v-cloak
                @click:row="showProjectDetail"
                >
                {{project.title}}
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

const url = "http://localhost:7773/msm_project/api/projects/"

  export default {
    name: 'PrijectList',
    data () {
      return {
        tab: null,
        loading: true,
        errored: false,
        error: null,
        projects: null,
        sa: 1,
        items: [
          '検索', '登録',
        ],
        headers: [
          {
            text: '案件ID',
            align: 'start',
            value: 'id',
          },
          { text: '案件名', value: 'title' },
          { text: '内容', value: 'content' },
          { text: '顧客ID', value: 'client_id' },
          { text: '削除', value: 'is_deleted' },
          { text: '登録者', value: 'created_by' },
          { text: '更新者', value: 'updated_by' },
          { text: '登録日', value: 'created_at' },
          { text: '更新日', value: 'updated_at' },
        ],
      }
    },
    methods: {
      showProjectDetail(data){
        console.log(data)
        let resolvedRoute = this.$router.resolve({
          name: 'project_detail',
          query: {
            // APIと接続後に変更
            id: data.id,
            created_by: data.created_by,
            updated_by: data.updated_by,
            client_id: data.client_id,
            title: data.title,
            content: data.content,
            created_at: data.created_at,
            updated_at: data.updated_at,
          }
        })

        window.open( resolvedRoute.href, null, "_blank")
      }
    },
    created() {
      let qu = this.$route.query
      axios
        .get(url + `search?id=${qu.id}&title=${qu.title}&client_id=`)
        .then(response => {
          this.projects = response.data;
        })
        .catch(err => {
          (this.errored = true), (this.error = err);
        })
        .finally(() => (this.loading = false));
      },
  }
</script>

<style>
  .tab {
    height: 8vh;
  }
</style>
