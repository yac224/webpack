<template>
  <div id="index">
    <h1>\{{ msg }}</h1>
  </div>
</template>
<script>
import {
  mapState
} from 'vuex'
export default {
  name: 'index',
  metaInfo() {
    return {
      titleTemplate: '%s - index'
    }
  },
  computed: {
    ...mapState({
      msg: state => state.app.msg
    })
  }
}
</script>
