<template>
  <Badge>{{ version }}</Badge>
</template>

<script>
import pkg from '@/package.json'
export default {
  name: 'Version',
  data() {
    return {
      version: pkg.version
    }
  }
}
</script>
