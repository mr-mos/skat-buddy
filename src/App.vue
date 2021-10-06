<template>

  <div id="screen">

    <div v-for="(color,colorIndex) in cardColors" style="display: flex;"
         :key="colorIndex">
        <div v-for="(type,typeIndex) in cardTypes" style="flex:1; margin:5px"
           :key="typeIndex">
          <Card :name="type+'_'+color"/>
        </div>
    </div>

  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import Card from "@/components/Card";

export default {
  name: 'App',
  components: {
    Card
  },
  data() {
    return {
      cardColors: ['club', 'spade', 'heart', 'diamond'],
      cardTypes: ['7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
    }
  }
}
</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

</style>
