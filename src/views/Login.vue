<template lang="pug">
  .login
    video(src="../assets/login_bg.mp4" muted autoplay loop)
    div
      h1.top web渗透测试虚拟仿真实验管理后台
      .form
        el-form(:model="formData")
          el-form-item(label="账号")
            el-input(v-model="formData.username")
          el-form-item(label="密码")
            el-input(v-model="formData.password" type="password")

        el-button(@click="fn" style="width: 300px;margin-top: 15px;") 登录

</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      formData: { username: "", password: "" }
    };
  },
  methods: {
    async fn() {
      let res = await this._fetch("/admin/user/login", this.formData, "post");
      if (res && res.code === 1) {
        localStorage.setItem("MToken", res.data.token);
        // localStorage.setItem('EVENGFRONTUSER', this.formData.username.trim())
        localStorage.setItem("EVENGFRONTUSER", JSON.stringify(res.data || {}));
        this.$store.commit("setStoreData", { key: "isLogin", value: false });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
  padding-top: 150px;
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: fill;
    z-index: 0;
  }
  > div {
    position: relative;
    z-index: 1;
    color: #fff;
  }
  .top {
    margin-bottom: 10px;
    z-index: 1;
  }
  .form {
    width: 300px;
    margin: 0 auto;
    z-index: 1;
    ::v-deep .el-form-item__label {
      color: #fff;
    }
  }
}
</style>
