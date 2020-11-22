<template lang="pug">
  el-container.ctn
    el-header
      span.span web渗透测试虚拟仿真实验管理后台
      .fr
        span {{userName}}
        el-button(size="mini" @click="logout" style="margin: 15px 0 0 10px;") 退出登录
    el-container(style="height: calc(100% - 60px);")
      el-aside(width="200px")
        el-menu(:default-openeds="[0]" :default-active="activeUrl")
          //- el-submenu(v-for="(menu, i) in menus" :index="i")
          //-   el-menu-item(v-for="(item, j) in menu.children" :key="j") {{item.name}}
          el-menu-item(v-for="(item, j) in menus" :key="j" @click="clickItem(item)" :index="item.path") {{item.name}}
      el-main
        .main-ctn
          router-view
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data () {
    let user = JSON.parse(localStorage.EVENGFRONTUSER).user
    return {
      userName: user && user.auth || 'admidsdsdn',
      activeUrl: this.$route.path,
      menus: [
        { name: '实验管理', path: '/course1' },
        { name: '实验教学', path: '/course2' },
        { name: '学生中心', path: '/class' },
        // { name: '管理员设置', path: '/adminManage' }
      ]
    }
  },
  methods: {
    clickItem (item) {
      this.activeUrl = item.path
      this._goUrl(item.path, item.data || {})
    },
    logout () {
      this.goLogin()
    }
  },
  mounted () {
    if (this.$route.path === '/') {
      this.activeUrl = '/course1'
      this._goUrl('/course1')
    } else if (this.$route.path === '/testmanage') {
      this.activeUrl = '/course1'
    } else if (this.$route.path === '/Jiaoxue') {
      this.activeUrl = '/course2'
    }
    // console.log(localStorage.EVENGFRONTUSER)
    let user = JSON.parse(localStorage.EVENGFRONTUSER).user
    if (user && user.auth == 'admin') {
      this.menus.push({ name: '管理员设置', path: '/adminManage' })
    }
  }
}
</script>

<style lang="scss" scoped>
.ctn {
  .el-header {
    border-bottom: 1px solid #409eff;
    background: #409eff;
    > span {
      line-height: 60px;
      color: #fff;
      font-size: 20px;
    }
    .fr {
      span {
        color: #fff;
      }
    }
  }
  .el-main {
    padding: 0;
    overflow: hidden;
    height: 100%;
    .main-ctn {
      padding: 20px;
      height: 100%;
      position: relative;
      overflow: auto;
    }
  }
  .el-menu {
    height: 100%;
    background: #F5F7FA;
    li {
      color: #5E5E5E;
      font-size: 16px;
      text-align: center;
      &.is-active {
        color: #fff;
        background: $--color-primary-light-2;
        font-size: 18px;
      }
      &:hover {
        color: #fff;
        background: $--color-primary-light-6;
        font-size: 18px;
      }
    }
  }
}
</style>
