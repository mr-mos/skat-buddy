<template>

  <div id="screen">

    <div v-for="(color,colorIndex) in cardColors" style="display: flex;"
         :key="colorIndex">
        <div v-for="(cardDef,cardNumber) in cardValues" style="flex:1; margin:5px"
           :key="cardNumber">
            {{cardNumber}} ({{cardDef.scoreValue}}) &nbsp; {{color.name}} ({{color.baseValue}})
         <Card :color="color.name" :cardValue="cardNumber"/>
        </div>
    </div>

  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import Card from "@/components/Card";
import {cardColors, cardValues} from "@/assets/js/data";

export default {
  name: 'App',
  components: {
    Card
  },
  data() {
    return {
      cardColors,
      cardValues
    }
  }
}
</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

</style>
