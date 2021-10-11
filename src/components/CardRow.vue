<template>

  <div class="row">
    <div v-for="(card,index) in rowCards" :key="index" class="rowEntry">
      <Card :card="card"/>
    </div>
  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import Card from "@/components/Card";

export default {

  name: 'CardRow',
  props: ['rowCards'],
  components: {
    Card
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}

}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

.row {
  flex-grow: 1;
  padding: 0 5px;

  display: flex;
  background-color: #dddddd;
  column-gap: 5px;

  height: 50px;     /* responsive scale of images in height (part 1)*/
}

.rowEntry {
  /*flex-grow: 1;*/  /* cards gleichverteilt over the whole row */
                     /* TODO firefox bug:  there is a space between cards, which isn't there in chrome */
}


</style>