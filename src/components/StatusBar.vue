<template>

  <div class="statusBar">

    <div class="noWrap paddingRight">
      <span @click="update()">Status: &nbsp;</span>
      <div v-if="store.status === PlayStatus.SELECT_MY_CARDS">
        Wähle Deine 10 Karten...
      </div>
      <div v-else-if="store.status === PlayStatus.SELECT_PLAYER">
        Wer ist Alleinspieler ?
      </div>
      <div v-else-if="store.status === PlayStatus.OPEN_SKAT">
        unten Skat auswählen oder
      </div>
      <div v-else-if="store.status === PlayStatus.CLOSE_SKAT">
        zwei Skat-Karten drücken
      </div>
      <div v-else-if="store.status === PlayStatus.PLAY">
        Gespielte Karten klicken ...
      </div>
      <div v-else="" class="error">
        Unbekannt!
      </div>
    </div>

    <div class="noWrap paddingRight">
        <div v-if="store.status == PlayStatus.OPEN_SKAT && storeFunctions.countPlayerCars(Player.ME) == 10">
          <div class="box clickable handButton"  @click="storeFunctions.handGameClicked()">
            Hand-Spiel
          </div>

        </div>
    </div>

    <div class="noWrap">
      <span>Spieler: </span>
      <StatusBarPlayer :player-def="Player.LEFT" :clickable="choosePlayer" />
      <StatusBarPlayer :player-def="Player.ME" :clickable="choosePlayer" />
      <StatusBarPlayer :player-def="Player.RIGHT" :clickable="choosePlayer" />
    </div>

  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import {Player, PlayStatus} from '@/assets/js/definitions';
import {storeFunctions} from '@/assets/js/store';
import StatusBarPlayer from "@/components/StatusBarPlayer";

export default {
  name: 'Statusbar',
  props: ['store'],
  components: {
    StatusBarPlayer
  },
  data() {
    return {
      PlayStatus,
      Player,
      storeFunctions
    }
  },
  methods: {
    update() {
      this.$forceUpdate();
      alert("forceUpdate clicked. Status: "+this.store.status);
    }
  },
  computed: {
    choosePlayer() {
      return [PlayStatus.SELECT_PLAYER].includes(this.store.status);
    }
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
  padding-top: 2px;
}

.statusBar .noWrap div {
  font-weight: bold;
}

.paddingRight {
  padding-right: 20px;
}

.handButton {
  background-color: #a03e3e;
  color: white;
}

.error {
  font-weight: bold;
  color: lightcoral;
}


</style>