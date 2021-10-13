<template>

  <div class="box" :class="moreCss(playerDef)">
    {{ playerText[playerName] }} ({{ countKnownCards(playerDef) }})
  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import {Player} from '@/assets/js/definitions';
import {storeFunctions} from "@/assets/js/store";

export default {
  name: 'Statusbar',
  props: ['playerDef'],
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
      cssDefs += this.playerName.toLowerCase() +"Player";
      return cssDefs
    },
    countKnownCards(player) {
      return storeFunctions.countPlayerCars(player);
    }
  },
  computed: {}
}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>


.box {
  padding: 6px 15px;
  margin: 0 5px;
}

.selected {
  border: 2px solid red;
  color: red;
}

</style>