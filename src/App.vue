<template>
  <div id="app">
    <effect-scatter />
  </div>
</template>

<script>
import EffectScatter from '@components/Lines'

export default {
  name: 'App',
  components: {
    EffectScatter
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
