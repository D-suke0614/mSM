<template>
  <v-sheet>
    <v-tabs
          v-model="tab"
          align-with-title
    >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item.id"
            class="tab"
          >
            {{ item.tab }}
          </v-tab>
      </v-tabs>
      <h2>CSV</h2>
      <v-tabs-items v-model="tab">
        <!-- インポートタブ -->
        <v-tab-item>
          <v-file-input
          v-model="im_activ"
          class="input"
          label="顧客・案件・活動"
          ></v-file-input>
          <v-file-input
          v-model="im_emp"
          class="input"
          label="社員"
          ></v-file-input>
          <v-btn
          type="submit"
          class="mr-4 button"
          color="primary"
          >
            読み込み
          </v-btn>
        </v-tab-item>

      <!-- エクスポートタブ -->
        <v-tab-item>
          <v-radio-group
          v-model="radioGroup"
          column
          ><v-radio
            class="input"
            value="ex_activ"
            label="顧客・案件・活動"
            ></v-radio>
            <v-radio
            class="input"
            value="ex_emp"
            label="社員"
            ></v-radio>
          </v-radio-group>
            <v-btn
            class="mr-4 button"
            color="primary"
            @click="exportCSV"
            >
              出力
            </v-btn>
        </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>


<script>
export default {
  name: 'CsvScreen',

  data: () => ({
    tab: null,
        items: [
          { id: 0 , tab: 'インポート'},
          { id: 1 , tab: 'エクスポート'},
        ],

        radioGroup: 0,

        // import
        im_activ: '',
        im_emp: '',

        // export
        ex_activ: '',
        ex_emp: '',
}),

methods: {
  exportCSV() {
          console.log('マジ卍')

          if (this.radioGroup === 'ex_activ') {
            this.$router.push({
              path: '/7780/mSM_CSV/DBtoCSVforActive'
              })
          } else if (this.radioGroup === 'ex_emp') {
            this.$router.push({
              path: '7780/mSM_CSV/DBtoCSVforEmployees'
            })
          }
        },
}

}

</script>

<style>
  .input {
    margin-left: 25%;
    margin-right: 25%;
    margin-top: 5vh;
  }
  .button {
    margin-left: 25%;
    margin-bottom: 8vh;
    margin-top: 6vh;
  }
  .tab {
    height: 8vh;
  }
</style>
