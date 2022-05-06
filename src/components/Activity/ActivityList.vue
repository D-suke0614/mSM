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
                :items="todos"
                :items-per-page="10"
                class="elevation-5"
                v-for="todo in sa" :key="todo.id"
                v-cloak
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
  export default {
    name: 'ActivityList',
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
            text: '活動名',
            align: 'start',
            value: 'id',
          },
          { text: '内容', value: 'title' },
          { text: '開始日時', value: 'title' },
          { text: '終了日時', value: 'title' },
          { text: '登録者', value: 'title' },
          { text: '登録日', value: 'title' },
          { text: '更新日', value: 'title' },
        ],
      }
    },
    created() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos", {
        params: {
          userId: "1"
        }
      })
      .then(response => {
        this.todos = response.data;
      })
      .catch(err => {
        (this.errored = true), (this.error = err);
      })
      .finally(() => (this.loading = false));
  }
  }
</script>
