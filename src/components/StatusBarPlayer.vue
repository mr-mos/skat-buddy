<template>

  <div class="box" :class="moreCss(playerDef)" @click="playerClicked()">
    {{ playerText[playerName] }} ({{ countKnownCards(playerDef) }})
  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import {Player} from '@/assets/js/definitions';
import {storeFunctions} from "@/assets/js/store";

export default {
  name: 'Statusbar',
  props: ['playerDef','clickable'],
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
      cssDefs += this.playerName.toLowerCase() +"Player ";
      if (this.clickable) {
        cssDefs += "clickable";
      }
      return cssDefs
    },
    countKnownCards(player) {
      return storeFunctions.countPlayerCars(player);
    },
    playerClicked() {
      storeFunctions.playerClickedAction(this.playerDef);
    }
  },
  computed: {}
}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>


.selected {
  border: 2px solid red;
  color: red;
}



</style>