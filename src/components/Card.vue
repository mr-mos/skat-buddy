<template>
  <div class="playingCard" >
      <img :src="imagePath" @click="clicked" :class="cardBackground"/>
  </div>
</template>

<!-- -------------------------------------------------------------   -->

<script>


import {Player} from "@/assets/js/definitions";
import {storeFunctions} from "@/assets/js/store";

export default {
  name: 'Card',
  props: ['card'],
  data() {
    return {
    }
  },
  methods: {
    clicked() {
      storeFunctions.cardClickedAction(this.card);
    }
  },
  computed: {
    imagePath() {
      return require("@/assets/cards/"+this.card.value+"_"+this.card.color+".svg")
    },
    cardBackground() {
      switch (this.card.owner) {
        case Player.ME: return "meCardFilter";
        case Player.LEFT: return "leftCardFilter";
        case Player.RIGHT: return "rightCardFilter";
        default: return "";
      }
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