<template>

  <div id="cardTable">

    <div class="rowLabel">
      Trumpf
    </div>
    <CardRow v-bind:row-cards="trumpCards" v-if="trumpCards.length>0"/>

    <div class="rowLabel">
      Kreuz
    </div>
    <CardRow :row-cards="clubCards" v-if="clubCards.length>0"/>

    <div class="rowLabel">
      Pik
    </div>
    <CardRow :row-cards="spadeCards" v-if="spadeCards.length>0"/>

    <div class="rowLabel">
      Herz
    </div>
    <CardRow :row-cards="heartCards" v-if="heartCards.length>0"/>

    <div class="rowLabel">
      Karo
    </div>
    <CardRow :row-cards="diamondCards" v-if="diamondCards.length>0"/>

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
      return this.cards.filter(card => card.trump)
    },
    clubCards() {
      return this.cards.filter(card => card.color === "club" && !card.trump)
    },
    spadeCards() {
      return this.cards.filter(card => card.color === "spade" && !card.trump)
    },
    heartCards() {
      return this.cards.filter(card => card.color === "heart" && !card.trump)
    },
    diamondCards() {
      return this.cards.filter(card => card.color === "diamond" && !card.trump)
    }
  },
  methods: {}

}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

#cardTable {
  flex-grow: 1;

  display: flex;
  flex-direction: column; /* top to bottom;  instead of left to right */
  justify-content: center; /* top to bottom alignment  (alignment main-axis) */
  align-items: stretch; /* left to right alignment  (alignment cross-axis) */
  align-content: normal;
  row-gap: 1px;

}

.rowLabel {
  background-color: #eeeeee;
  font-size: 90%;
  margin-top: 5px;
  padding: 0 10px;
}

</style>