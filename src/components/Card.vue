<template>
  <div class="playingCard">
      <img :src="imagePath"/>
  </div>
</template>

<!-- -------------------------------------------------------------   -->

<script>

export default {
  name: 'Card',
  props: ['card'],
  methods: {},
  computed: {
    imagePath() {
      return require("@/assets/cards/"+this.card.value+"_"+this.card.color+".svg")
    }
  }
}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

.playingCard {
  max-width: 220px;
  margin-left:auto;
  margin-right: auto;
}

.playingCard img {
  width: 100%;
}

</style>