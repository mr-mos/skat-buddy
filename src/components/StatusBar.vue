<template>

  <div class="statusBar">


    <div class="noWrap paddingRight">
      <StatusBarText :store="store"/>
    </div>


    <div class="noWrap paddingRight">
      <div v-if="store.status == PlayStatus.OPEN_SKAT && storeFunctions.countPlayerCars(Player.ME) == 10">
        <div class="box clickable handButton" @click="storeFunctions.handGameClicked()">
          Hand-Spiel
        </div>
      </div>
    </div>

    <div class="noWrap paddingRight">
      <span>Spieler: </span>
      <div class="playerArea">
        <StatusBarPlayer :player-def="Player.ME" :clickable="choosePlayer" :orderPos="1"/>
        <StatusBarPlayer :player-def="Player.LEFT" :clickable="choosePlayer" :orderPos="2"/>
        <StatusBarPlayer :player-def="Player.RIGHT" :clickable="choosePlayer" orderPos="3"/>
      </div>
    </div>

    <div class="noWrap" v-if="[PlayStatus.PLAY, PlayStatus.END].includes(store.status)">
      <span>Punkte: </span>
      <span class="points" :class="meSolo">
        {{ storeFunctions.getPointsSoloplayer() }}
      </span>
      |
      <span class="points" :class="meNotSolo">
        {{ storeFunctions.getPointsOthers() }}
      </span>
    </div>

    <div class="noWrap floatRight">
      <div v-if="store.status == PlayStatus.SELECT_MY_CARDS && store.firstSeatPlayer && storeFunctions.countPlayerCars(Player.ME) == 0"
           class="box clickable nextGameButton" @click="storeFunctions.resetStoreStatus(false)">
        Neue Vorhand/Spiel
      </div>
      <div v-else
          class="box clickable nextGameButton" @click="storeFunctions.resetStoreStatus(true)">
        Neues Spiel
      </div>
      Spiel Nr. {{ store.gameCounter }}
    </div>


  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import {Player, PlayStatus} from '@/assets/js/definitions';
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
      return [PlayStatus.SELECT_PLAYER, PlayStatus.SELECT_FIRST_SEAT].includes(this.store.status);
    },
    meSolo() {
      return storeFunctions.getSoloPlayer() === Player.ME ? 'bold' : 'gray';
    },
    meNotSolo() {
      return storeFunctions.getSoloPlayer() !== Player.ME ? 'bold' : 'gray';
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

.statusBar .playerArea {
  display: inline-flex;
  align-items: center;
}

.handButton {
  background-color: #a03e3e;
  color: white;
}

.nextGameButton {
  background-color: #666666;
  color: white;
  font-size: 10px;
  padding: 3px 7px;
  margin: 6px 6px;
}

.points {
  min-width: 20px;
  padding: 0 5px;
}

.gray {
  color: #d4d4d4;
}



</style>