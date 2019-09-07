<template lang="pug">
  .login
    .top EVE-NG
    .form
      el-form(:model="formData")
        el-form-item(label="账号")
          el-input(v-model="formData.username")
        el-form-item(label="密码")
          el-input(v-model="formData.password")

      el-button(@click="fn") 登录

</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      formData: { username: '', password: '' }
    }
  },
  methods: {
    async fn () {
      let res = await this._fetch('/admin/user/login', this.formData, 'post')
      if (res && res.code === 1) {
        localStorage.setItem('MToken', res.data.token)
        localStorage.setItem('EVENGFRONTUSER', this.formData.username.trim())
        this.$store.commit('setStoreData', { key: 'isLogin', value: false })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
  padding-top: 200px;
  .form {
    width: 300px;
    margin: 20px auto;
  }
}
</style>
