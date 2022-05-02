<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="10"
    class="elevation-5"
  ></v-data-table>
</template>

<script>
// import axios from 'axios'
import ClientIndex from '@/assets/ClientIndex.json'

  export default {
    name: 'ClientIndex',
    data () {
      return {
        Clients : ClientIndex,
        headers: [
          {
            text: '会社名',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'カイシャメイ', value: 'calories' },
          { text: '住所', value: 'fat' },
          { text: '電話番号', value: 'carbs' },
          { text: 'メールアドレス', value: 'protein' },
          { text: '登録日', value: 'iron' },
          { text: '更新日', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
        ],
      }
    },
    // mounted() {
    //   axios
    //     .get('https://jsonplaceholder.typicode.com/users/')
    //     .then(response => {this.info = response.data})
    // }
  }
</script>
