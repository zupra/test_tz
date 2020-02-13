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
      template(v-if="props.column.field == 'dog'")
        N-link(
          :title="`перейти /dog/${props.row.dog}`"
          :to="`/dog/${props.row.dog}`"
        ) {{`link to ${props.row.dog}`}}

      template(v-else-if="props.column.field == 'trustee'")
        N-link(
          :title="`перейти /trustee/${props.row.trustee}`"
          :to="`/trustee/${props.row.trustee}`"
        ) {{`link to ${props.row.trustee}`}}

      template(v-else-if="props.column.field == 'id'")
        N-link(
          :title="`перейти /payment/${props.row.id}`"
          :to="`/payment/${props.row.id}`"
        ) {{`link ${props.row.id}`}}

      //- inputs
      template(v-else-if="props.column.field == 'sum'")
        input(
          type="text"
          v-model="props.row.sum"
        )
      template(v-else-if="props.column.field == 'purpose'")
        input(
          type="text"
          v-model="props.row.purpose"
        )


  //- pre {{$data}}
</template>

<script>
import { VueGoodTable } from "vue-good-table";
export default {
  components: {
    VueGoodTable
  },
  async asyncData({ app, store }) {
    const data = await app.$axios.$get("/payment");
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
          label: "sum",
          field: "sum",
          type: "number"
        },
        {
          label: "purpose",
          field: "purpose"
        },
        {
          label: "time",
          field: "time"
        },
        {
          label: "trustee",
          field: "trustee",
          type: "number"
        },
        {
          label: "dog",
          field: "dog",
          type: "number"
        }
      ]
    };
  }
};
</script>

<style lang="stylus"></style>
