<template>
    <!-- <input type="text" v-model="userId"/> -->
    <!-- <button @click="getUserName">Click</button> -->
    <!-- <button @click="getUserName">button</button> -->
      <div>
        {{ list }}
      </div>
</template>

<script>
import axios from 'axios';

export default {

  name: 'ClientIndex',

  data() {
    return {
      list: null,
    }
  },
  mounted(){
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.list = response))

  }
}
</script>

// <script>
// import axios from 'axios'

// const url = 'https://jsonplaceholder.typicode.com/users/'

// export default {
//   name: 'ClientIndex',

//   data: function(){
//     return {
//       userId: '',
//       name: '',
//       list: [],
//       length: '',
//       }
//     },

//   methods: {
//     getUserName: function() {
//     // getUserName: function() {
//     // wondow:onload = function() {

//       var vm = this

//       axios.get(url+ this.userId)
//       .then(function (response) {
//           // vm.id = response.data.id
//           // vm.name = response.data.name
//           vm.list = response.data
//       }).catch(function () {
//           this.name = '不正なID'
//       })
//     },
//     // },
//   },
// }
// </script>
