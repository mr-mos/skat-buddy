<template>

  <div class="statusBar">
    Status
  </div>

</template>

<!-- -------------------------------------------------------------   -->

<script>

export default {
  name: 'Statusbar',
  props: ['cards'],
  methods: {},
  computed: {
  }
}

</script>

<!-- -------------------------------------------------------------   -->

<style scoped>

.statusBar {
  background-color: #333333;
  color: lightcyan;
  height: 50px;
}

</style>