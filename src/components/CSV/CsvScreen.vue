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
          <form method="post" action="http://localhost:7780/mSM_CSV/CSVtoDBforActive" enctype="multipart/form-data">
          <input
          class="input"
          type="file" name="file"
          >
          <input type="submit" name="upload_file" value="ファイルをアップロード" class="input">
          <input type="hidden" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
        </form>

          <v-form
          method="post"
          action="http://localhost:7780/mSM_CSV/CSVtoDBforActive"
          enctype="multipart/form-data"
          >
            <v-file-input
            v-model="im_activ"
            class="input"
            label="顧客・案件・活動"
            ></v-file-input>

            <v-file-input
            v-model="im_emp"
            show-size
            counter
            multiple
            class="input"
            label="社員"
            name="im_emp"
            ></v-file-input>
            <input type="hidden" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" /><input type="submit" name="upload_file" value="ファイルをアップロード" class="input">
            <v-btn
            type="submit"
            class="mr-4 button"
            color="primary"
            name="upload_file"
            >
              読み込み
            </v-btn>
          </v-form>
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
            @click="exportCSV"
            :href="url"
            class="mr-4 button"
            color="primary"
            >出力</v-btn>
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

        url: '',
        ex_active_url: 'http://localhost:7780/mSM_CSV/DBtoCSVforActive',
        ex_emp_url: 'http://localhost:7780/mSM_CSV/DBtoCSVforEmployees',
}),

methods: {
  exportCSV() {
          console.log('マジ卍')

          if (this.radioGroup === 'ex_activ') {
            this.url = this.ex_active_url;
          } else if (this.radioGroup === 'ex_emp') {
            this.url = this.ex_emp_url;
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
  .button {
    border: 1px solid blue;
    padding: 10px 6px;
    text-decoration: none;
  }
</style>
