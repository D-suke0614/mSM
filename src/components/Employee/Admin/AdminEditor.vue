<template>
  <div>
    <h1>保留で</h1>
    <p>登録画面貼り付け</p>
  </div>
</template>

<script>
export default {
  name: 'AdminEditor',

  data () {
      return {
        tab: null,
        items: [
          { id: 0 , tab: '検索'},
          { id: 1 , tab: '登録'},
        ],
        headers: [
          {
            text: '案件ID',
            align: 'start',
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
}
</script>

<style>
  .search {
    margin-left: 25%;
    margin-right: 25%;
    margin-top: 5vh;
  }
  .searchButton {
    margin-left: 25%;
    margin-bottom: 8vh;
    margin-top: 6vh;
  }
  .tab {
    height: 8vh;
  }
</style>
