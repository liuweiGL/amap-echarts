<template>
  <a :href="$site.themeConfig.nav[0].link">{{
    $site.themeConfig.nav[0].link
  }}</a>
</template>

<script>
export default {
  name: 'DocV1'
}
</script>