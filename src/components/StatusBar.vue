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
      <StatusBarPlayer :player-def="Player.LEFT" />
      <StatusBarPlayer :player-def="Player.ME" />
      <StatusBarPlayer :player-def="Player.RIGHT" />
    </div>

  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import {Player, PlayStatus} from '@/assets/js/definitions';
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
      Player
    }
  },
  methods: {
    update() {
      this.$forceUpdate();
      alert("forceUpdate clicked. Status: "+this.store.status);
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


.error {
  font-weight: bold;
  color: lightcoral;
}


</style>