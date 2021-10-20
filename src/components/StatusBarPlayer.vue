<template>

  <div class="box bold" :class="moreCss(playerDef)" @click="playerClicked()" :style="style">
    <small>{{ firstSeat }}</small>   {{ playerText[playerName] }} ({{ countKnownCards }})
  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import {Player} from '@/assets/js/definitions';
import {storeFunctions} from "@/assets/js/store";

export default {
  name: 'Statusbar',
  props: ['playerDef', 'clickable', 'orderPos'],
  data() {
    return {
      Player,
      playerName: storeFunctions.getPlayersName(this.playerDef),
      playerText: {"LEFT": "Links", "ME": "Ich", "RIGHT": "Rechts"}
    }
  },
  methods: {
    moreCss(player) {
      let cssDefs = storeFunctions.isActivePlayer(player) ? 'selected ' : '';
      cssDefs += this.playerName.toLowerCase() + "Player ";
      if (this.clickable) {
        cssDefs += "clickable";
      }
      return cssDefs
    },
    playerClicked() {
      storeFunctions.playerClickedAction(this.playerDef);
    }
  },
  computed: {
    style() {
      if (storeFunctions.getSoloPlayer()) {
        if (storeFunctions.getSoloPlayer() == this.playerDef) {
          return "order: 1; margin-right:20px;";
        } else {
          return "order: " + this.orderPos + 1;
        }
      } else {
        return this.orderPos ? "order:" + this.orderPos : "";
      }
    },
    countKnownCards() {
      return storeFunctions.countPlayerCars(this.playerDef);
    },
    firstSeat() {
      return storeFunctions.isFirstSeat(this.playerDef) ? "[V]" : '';
    }
  }
}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>


.selected {
  border: 2px solid red;
  color: red;
}


</style>