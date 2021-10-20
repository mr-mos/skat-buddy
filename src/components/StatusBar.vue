<template>

  <div class="statusBar">


    <div class="noWrap paddingRight">
      <StatusBarText :store="store" />
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

import {Player, PlayStatus } from '@/assets/js/definitions';
import {storeFunctions} from '@/assets/js/store';
import StatusBarPlayer from "@/components/StatusBarPlayer";
import StatusBarText from "@/components/StatusBarText";

export default {
  name: 'Statusbar',
  props: ['store'],
  components: {
    StatusBarText,
    StatusBarPlayer
  },
  data() {
    return {
      Player,
      PlayStatus,
      storeFunctions
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

.paddingRight {
  padding-right: 20px;
}

.handButton {
  background-color: #a03e3e;
  color: white;
}



</style>