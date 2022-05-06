<template>
  <div class="about">
    <h1>This is list display</h1>
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
</template>

<script>
import axios from 'axios'
export default {
  name: "ClientIndex",
  data() {
    return {
      loading: true,
      errored: false,
      error: null,
      todos: null,
      sa: 1,
      headers: [
          {
            text: '会社名',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'カイシャメイ', value: 'title' },
          { text: '住所', value: 'fat' },
          { text: '電話番号', value: 'carbs' },
          { text: 'メールアドレス', value: 'protein' },
          { text: '登録日', value: 'iron' },
          { text: '更新日', value: 'iron' },
        ],
    };
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
};
</script>

<style>
[v-cloak] {
  display: none;
}
h1 {
  margin-top: 6px;
  margin-bottom: 6px;
}
</style>
