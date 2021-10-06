<template>
  <div class="playingCard">
      <img :src="imagePath"/>
  </div>
</template>

<!-- -------------------------------------------------------------   -->

<script>

export default {
  name: 'Card',
  props: ['color','cardValue'],
  methods: {},
  computed: {
    imagePath() {
      return require("@/assets/cards/"+this.cardValue+"_"+this.color+".svg")
    }
  }
}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

.playingCard {
  max-width: 300px;
  margin-left:auto;
  margin-right: auto;
}

.playingCard img {
  width: 100%;
}

</style>