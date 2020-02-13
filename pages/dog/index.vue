<template lang="pug">
div
  VueGoodTable.mt-5(
    :columns="columns"
    :rows="res.results"
    :search-options="{enabled:true, placeholder:'ПОИСК'}"
    :pagination-options="{enabled: true, mode: 'records', perPage: 10, perPageDropdown: [3, 5, 10, 20, 50, 100 ], nextLabel: 'туда »', prevLabel: '« сюда', rowsPerPageLabel: ' строк: ', ofLabel: ' из ', allLabel: 'все'}"
  )
    template(
      slot="table-row"
      slot-scope="props"
    )
      template(v-if="props.column.field == 'id'")
        N-link(
          :title="`перейти /dog/${props.row.id}`"
          :to="`/dog/${props.row.id}`"
        ) {{`link ${props.row.id}`}}
      template(v-else-if="props.column.field == 'trustee'")
        N-link(
          :title="`перейти /trustee/${props.row.trustee}`"
          :to="`/trustee/${props.row.trustee}`"
        ) {{`link to ${props.row.trustee}`}}


  //- pre {{$data}}
</template>

<script>
import { VueGoodTable } from "vue-good-table";
export default {
  components: {
    VueGoodTable
  },
  async asyncData({ app, store }) {
    const data = await app.$axios.$get("/dog");
    return { res: data };
  },
  data() {
    return {
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
          label: "photo",
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
        }
      ]
    };
  }
};
</script>

<style lang="stylus"></style>
