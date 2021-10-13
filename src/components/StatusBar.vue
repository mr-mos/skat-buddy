<template>

  <div class="statusBar">

    <div class="noWrap paddingRight">
      <span @click="update()">Status: &nbsp;</span>
      <div v-if="store.status == PlayStatus.SELECT_MY_CARDS">
        Wähle Deine 10 Karten...
      </div>
      <div v-else="" class="error">
        Unbekannt!
      </div>
    </div>

    <div class="noWrap">
      <span>Spieler: </span>
      <div class="leftPlayer box" :class="moreCss(Player.LEFT)">
        Links ({{countKnownCards(Player.LEFT)}})
      </div>
      <div class="mePlayer box" :class="moreCss(Player.ME)">
        Ich ({{countKnownCards(Player.ME)}})
      </div>
      <div class="rightPlayer box" :class="moreCss(Player.RIGHT)">
        Rechts ({{countKnownCards(Player.RIGHT)}})
      </div>
    </div>

  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import {Player, PlayStatus} from '@/assets/js/definitions';
import {store} from "@/assets/js/store";

export default {
  name: 'Statusbar',
  data() {
    return {
      PlayStatus,
      Player,
      store : store
    }
  },
  methods: {
    moreCss(player) {
      return player === store.player ? 'selected' : '';
    },
    update() {
      this.$forceUpdate();
      alert("forceUpdate clicked. Status: "+store.status);
    },
    countKnownCards(player) {
      return store.cards.filter( card => card.owner === player).length;
    }
  },
  computed: {

  }
}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

.statusBar {
  background-color: #333333;
  color: lightgoldenrodyellow;
  min-height: 35px;
  padding: 0px 20px 0px 20px;
  margin: 0;
}

.statusBar div {
  display: inline-block;
  padding-top: 3px;
}

.statusBar .noWrap div {
  font-weight: bold;
}

.paddingRight {
  padding-right: 20px;
}

.box {
  padding: 6px 15px;
  margin: 0 5px;
}

.error {
  font-weight: bold;
  color: lightcoral;
}

.selected {
  border: 2px solid red;
  color: red;
}

</style>