<template>

  <div id="screen">


    <StatusBar :store="this.store"/>

    <CardTable :cards="this.store.cards"/>


  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

import { store } from "@/assets/js/store";
import StatusBar from "@/components/StatusBar";
import CardTable from "@/components/CardTable";

export default {
  name: 'App',
  components: {
    CardTable,
    StatusBar
  },
  data() {
    return {
      store
    }
  }
}
</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

#screen {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

</style>
