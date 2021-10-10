<template>

  <div class="cardTable">

    <CardRow label="Trumpf" v-bind:row-cards="trumpCards"  />

    <CardRow label="Kreuz" :row-cards="clubCards"  />

    <CardRow label="Pik" :row-cards="spadeCards"  />

    <CardRow label="Herz" :row-cards="heartCards"  />

    <CardRow label="Karo" :row-cards="diamondCards"  />

  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import CardRow from "@/components/CardRow";

export default {

  name: 'CardTable',
  props: ['cards'],
  components: {
    CardRow
  },
  data() {
    return {

    }
  },
  computed: {
    trumpCards() {
      return this.cards.filter( card => card.trump)
    },
    clubCards() {
      return this.cards.filter( card => card.color === "club")
    },
    spadeCards() {
      return this.cards.filter( card => card.color === "spade")
    },
    heartCards() {
      return this.cards.filter( card => card.color === "heart")
    },
    diamondCards() {
      return this.cards.filter( card => card.color === "diamond")
    }
  },
  methods: {}

}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>


</style>