<template>
  <v-card>
    <v-toolbar
      color="light-blue lighten-2"
      dark
      flat
      dense
    >
      <template v-slot:extension>
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
      </template>
    </v-toolbar>

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
  </v-card>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        tab: null,
        loading: true,
        errored: false,
        error: null,
        todos: null,
        sa: 1,
        items: [
          'web', 'shopping', 'videos', 'images', 'news',
        ],
        headers: [
          {
            text: '案件ID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: '案件名', value: 'title' },
          { text: '顧客名', value: 'title' },
          { text: '内容', value: 'title' },
          { text: '登録者', value: 'title' },
          { text: '更新者', value: 'title' },
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
