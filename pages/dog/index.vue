<template lang="pug">
#page

  //- pre {{model}}
  
  .flex
    label.mr-2(v-for="(_,key) in model")
      | {{key}}
      InpDate(
        v-if="key === 'birth_time'"
        @setdate="model.birth_time = $event"
      )
      select(
        v-else-if="key === 'trustee'"
        v-model="model[key]"
      )
        option(
          :value="''"
        ) Выбрать
        option(
          v-for="item in trustee"
          :value="item.id"
        ) {{item.fio}}
      input(
        v-else
        type="text"
        v-model="model[key]"
      )

  .flex.mt-3.y_center.x_sb
    input(
      type="file"
      ref="file"
      @change="handleFileUpload"
    )

    
    div
      small заполните все поля &emsp;
      //- :disabled="Object.values(model).includes(Boolean) && !file"
      button(
        :disabled="Object.values(model).includes('')"
        @click="POST(model)"
      ) add new item



  VueGoodTable.mt-5(
    :columns="columns"
    :rows="rows"
    :search-options="{enabled:true, placeholder:'ПОИСК'}"
    :pagination-options="{enabled: true, mode: 'records', perPage: 10, perPageDropdown: [3, 5, 10, 20, 50, 100 ], nextLabel: 'туда »', prevLabel: '« сюда', rowsPerPageLabel: ' строк: ', ofLabel: ' из ', allLabel: 'все'}"
  )
    template(
      slot="table-row"
      slot-scope="props"
    )
      //- links
      template(v-if="props.column.field === 'id'")
        N-link(
          :title="`перейти /dog/${props.row.id}`"
          :to="`/dog/${props.row.id}`"
        ) {{`link ${props.row.id}`}}
      template(v-else-if="props.column.field === 'trustee'")
        N-link(
          :title="`перейти /trustee/${props.row.trustee}`"
          :to="`/trustee/${props.row.trustee}`"
        ) {{`link ${props.row.trustee}`}}

      //- inputs
      template(v-else-if="props.column.field === 'name' || props.column.field === 'kind'")
        input(
          type="text"
          v-model="props.row[props.column.field]"
        )

      template(v-else-if="props.column.field === 'birth_time'")
        InpDate(
          :propSetDateFrom="new Date(props.row[props.column.field])"
          @setdate="props.row.birth_time = $event"
        )

      template(v-else-if="props.column.field === 'reg_time'")
        span(
          v-text="new Date(props.row.reg_time).toLocaleDateString()"
        )

      //- photo 
      template(v-else-if="props.column.field === 'photo'")
        .imgView
          .imgView_full(

          )
            img(
              :src="props.row.photo"
            )
          img.imgView_pre(
            :src="props.row.photo"
          )

      template(v-else-if="props.column.field === 'ACTION'")
        .flex
          .button.button-outline(
            @click="PUT(props.row)"
          ) edit
          | &nbsp;
          .button.button-outline(
            @click="DEL(props.row.id)"
          ) del



  //- pre {{$data}}
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import InpDate from "~/components/InpDate.vue";
export default {
  components: {
    VueGoodTable,
    InpDate
  },
  async asyncData({ app }) {
    let [Dog, Trustee] = await Promise.all([
      app.$axios.$get("/dog"),
      app.$axios.$get("/trustee")
    ]);
    return {
      rows: Dog.results,
      trustee: Trustee.results.map(({ id, fio }) => ({ id, fio }))
    };
  },
  data() {
    return {
      file: null,
      model: {
        name: "",
        kind: "",
        trustee: "",
        birth_time: "" // YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].
        // reg_time: ""
        // photo: ""
      },
      columns: [
        {
          label: "id",
          field: "id",
          type: "number",
          width: "5em"
        },
        {
          label: "name",
          field: "name"
        },
        {
          label: "kind",
          field: "kind"
        },
        {
          label: "trustee",
          field: "trustee",
          type: "number"
        },
        {
          label: "birth_time",
          field: "birth_time"
        },
        {
          label: "reg_time",
          field: "reg_time"
        },
        {
          label: "photo",
          field: "photo"
        },
        {
          field: "ACTION",
          label: "# EDIT",
          sortable: false
        }
      ]
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    async POST(postData) {
      // !TODO
      if (this.file) {
        this.POST_FILE(postData);
        return;
      }
      const data = await this.$axios.$post("/dog/", postData);
      this.UP();
    },
    async POST_FILE(postData) {
      const formData = new FormData();
      for (let key in postData) {
        formData.append(key, postData[key]);
      }
      formData.append("photo", this.file);
      const data = await this.$axios.$post(`/dog/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      this.file = null;
      this.UP();
    },

    async PUT(postData) {
      const data = await this.$axios.$put(`/dog/${postData.id}/`, postData);
      this.UP();
    },
    async DEL(ID) {
      const data = await this.$axios.$delete(`/dog/${ID}/`);
      this.UP();
    },

    async UP(postData) {
      const { results } = await this.$axios.$get("/dog/");
      this.rows = results;
    }
  }
};
</script>

<style lang="stylus">
.imgView
  position relative
  cursor pointer

  &:hover
    .imgView_full
      display block

  &_full
    display none
    border 1em solid rgba(#000, .2)
    position absolute
    left -310px
    bottom 0
    width 300px

  &_pre
    max-height 2em

  img
    display block
</style>
