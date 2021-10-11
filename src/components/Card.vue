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
  height: 100%;     /* responsive scale of images in height (part 2)*/
}

.playingCard img {
  max-width: 100%;
  max-height: 100%;
}

</style>