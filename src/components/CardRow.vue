<template>

  <div>

    <small>{{ label }}</small>
    <div class="row">
      <div v-for="(card,index) in rowCards" :key="index" class="rowEntry">
        <Card :card="card" />
      </div>
    </div>

  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import Card from "@/components/Card";

export default {

  name: 'CardRow',
  props: ['rowCards','label'],
  components: {
    Card
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {}

}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

.row {
  display: flex;
  background-color: #dddddd;
}
.rowEntry {
  flex: 1;
  margin: 5px;
}

small {
  display: block;
  background-color: #eeeeee;
  margin-top: 5px
}

</style>