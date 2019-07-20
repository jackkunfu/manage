<template lang="pug">
  .login
    .top crm 管理系统

</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    document.body.onclick = () => {
      this.$store.commit('setStoreData', { key: 'isLogin', value: false })
    }
  }
}
</script>
