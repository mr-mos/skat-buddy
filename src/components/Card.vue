<template>
  <div class="playingCard">
    <img :src="imagePath" @click="clicked" :class="cardBackground"/>
    <div v-if="this.card.wonPlayer" class="roundOverlay" :class="wonRoundCharColorClass">
      {{this.card.played}}
    </div>
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
    },
    wonRoundCharColorClass() {
      return storeFunctions.getPlayersName(this.card.wonPlayer).toLowerCase()+"Player"
    }
  }
}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

.playingCard {
  height: 100%; /* responsive scale of images in height (part 2)*/
  position: relative;
}

.playingCard img {
  max-width: 100%;
  max-height: 100%;
}

.leftCardFilter {
  filter: brightness(0.48) sepia(75%) hue-rotate(-90deg) saturate(3) contrast(87%);
  border: 1px solid #da87da;
  box-sizing: border-box;
}

.meCardFilter {
  filter: sepia(30%) saturate(635%) hue-rotate(60deg) brightness(101%) contrast(87%);
  border: 1px solid lightgreen;
  box-sizing: border-box;
}

.rightCardFilter {
  filter: brightness(0.5) sepia(75%) hue-rotate(140deg) saturate(3) contrast(87%);
  border: 1px solid #c9dfee;
  box-sizing: border-box;
}

.disabled {
  opacity: 0.2;
}

.roundOverlay {
  position: absolute;
  left: 1px;
  bottom: 1px;
  padding: 5px 10px;
  font-weight: bold;
  opacity: 0.75;
}


</style>