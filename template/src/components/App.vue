<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>
<style>
[v-cloak] {
  display: none;
}
</style>
<script>
export default {
  name: 'app',
  metaInfo: {
    title: 'Vue Project',
    titleTemplate: null,
    meta: [{
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=utf-8'
    }, {
      'http-equiv': 'Content-language',
      content: 'zh-tw'
    }, {
      name: 'viewport',
      content: 'initial-scale=1, maximum-scale=1, user-scalable=no'
    }, {
      name: 'keywords',
      content: 'vue.js, vue-router, vuex, vue-meta, webpack 2, server-render'
    }]
  }
}
</script>
