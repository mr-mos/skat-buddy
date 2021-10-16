<template>
  <div class="playingCard">
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
    return {}
  },
  methods: {
    clicked() {
      storeFunctions.cardClickedAction(this.card);
    }
  },
  computed: {
    imagePath() {
      return require("@/assets/cards/" + this.card.value + "_" + this.card.color + ".svg")
    },
    cardBackground() {
      let classes = '';
      if (this.card.played) {
        classes += "disabled "
      }
      switch (this.card.owner) {
        case Player.ME:
          classes += "meCardFilter";
          break;
        case Player.LEFT:
          classes += "leftCardFilter";
          break;
        case Player.RIGHT:
          classes += "rightCardFilter";
          break;
      }
      return classes;
    }
  }
}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

.playingCard {
  height: 100%; /* responsive scale of images in height (part 2)*/
}

.playingCard img {
  max-width: 100%;
  max-height: 100%;
}

.leftCardFilter {
  filter: invert(77%) sepia(66%) saturate(545%) hue-rotate(246deg) brightness(87%) contrast(95%);
  border: 1px solid #da87da;
  box-sizing: border-box;
}

.meCardFilter {
  filter: sepia(30%) saturate(635%) hue-rotate(60deg) brightness(101%) contrast(87%);
  border: 1px solid lightgreen;
  box-sizing: border-box;
}

.rightCardFilter {
  filter: invert(86%) sepia(24%) saturate(331%) hue-rotate(157deg) brightness(92%) contrast(96%);
  border: 1px solid lightblue;
  box-sizing: border-box;
}

.disabled {
  opacity: 30%;
}


</style>