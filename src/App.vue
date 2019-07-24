<template lang="pug">
  #app
    router-view(v-if="isLogin" name="login")
    router-view(v-else)
</template>

<script>
import '@/css/element.scss'
export default {
  name: 'App',
  computed: {
    isLogin () { return this.$store.state.isLogin }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
