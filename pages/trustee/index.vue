<template lang="pug">
#page
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
          :title="`перейти /trustee/${props.row.id}`"
          :to="`/trustee/${props.row.id}`"
        ) {{`link ${props.row.id}`}}

      //- inputs
      template(v-else-if="props.column.field == 'fio'")
        input(
          type="text"
          v-model="props.row.fio"
        )

      //- photo 
      template(v-else-if="props.column.field == 'photo'")
        img(
          :src="props.row.photo"
        )


  pre {{$data}}
</template>

<script>
import { VueGoodTable } from "vue-good-table";
export default {
  components: {
    VueGoodTable
  },
  async asyncData({ app, store }) {
    const data = await app.$axios.$get("/trustee");
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
          label: "fio",
          field: "fio"
        },
        {
          label: "birth_time",
          field: "birth_time"
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
