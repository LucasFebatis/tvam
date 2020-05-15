<template>
  <div id="app">
    <h1>
      {{ name }}
    </h1>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    data: function() {
      return {
        name: 'Hello World!',
      }
    },
  });
</script>

<style scoped>
/* Por padrão tizen renderiza background com black */
#app {
  background: white;
  min-height: 100vh;
  display: flex;
}
</style>