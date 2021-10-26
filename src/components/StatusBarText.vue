<template>

  <div>

    <span @click="update()">Status: &nbsp;</span>
    <div class="bold">
      <template v-if="store.status === PlayStatus.SELECT_FIRST_SEAT">
        Welcher Spieler ist Vorhand ?
      </template>
      <template v-else-if="store.status === PlayStatus.SELECT_MY_CARDS">
        Wähle Deine 10 Karten...
      </template>
      <template v-else-if="store.status === PlayStatus.SELECT_PLAYER">
        Wer ist Alleinspieler ?
      </template>
      <template v-else-if="store.status === PlayStatus.OPEN_SKAT">
        unten Skat auswählen oder
      </template>
      <template v-else-if="store.status === PlayStatus.CLOSE_SKAT">
        zwei Skat-Karten drücken
      </template>
      <template v-else-if="store.status === PlayStatus.SELECT_TRUMP">
        Welches Spiel? Wähle die Trumpf-Farbe / Grand.. (Erste Karte in Reihe anklicken) ...
      </template>
      <template v-else-if="store.status === PlayStatus.PLAY">
        Spiel "{{storeFunctions.translatePlayOption(store.selectedTrump)}}" läuft. Karten klicken ...
      </template>
      <template v-else-if="store.status === PlayStatus.END">
        Spiel beendet!
      </template>
      <template v-else="" class="error">
        Unbekannt!
      </template>
    </div>

  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import {PlayStatus} from '@/assets/js/definitions';
import {storeFunctions} from '@/assets/js/store';

export default {
  name: 'StatusBarText',
  props: ['store'],
  data() {
    return {
      PlayStatus,
      storeFunctions
    }
  },
  methods: {
    update() {
      this.$forceUpdate();
      alert("forceUpdate clicked. Status: " + this.store.status);
    }
  }
}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>


.statusText span {
  font-weight: bold;
}

.error {
  font-weight: bold;
  color: lightcoral;
}

div {
  display: inline-block;
}


</style>