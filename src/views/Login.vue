<template lang="pug">
  .login
    .top crm 管理系统
    .form
      el-form(:model="formData")
        el-form-item(label="账号")
          el-input(v-model="formData.phone")
        el-form-item(label="密码")
          el-input(v-model="formData.pwd")

</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      formData: { phone: '', pwd: '' }
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

<style lang="scss" scoped>
.login {
  text-align: center;
}
</style>
