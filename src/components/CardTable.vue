<template>

  <div id="cardTable">

    <div class="rowLabel">
      Trumpf
    </div>
    <CardRow v-bind:row-cards="trumpCards"  />

    <div class="rowLabel">
      Kreuz
    </div>
    <CardRow :row-cards="clubCards"  />

    <div class="rowLabel">
      Pik
    </div>
    <CardRow :row-cards="spadeCards"  />

    <div class="rowLabel">
      Herz
    </div>
    <CardRow :row-cards="heartCards"  />

    <div class="rowLabel">
      Karo
    </div>
    <CardRow :row-cards="diamondCards"  />

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