<template lang="pug">
  el-container.ctn
    el-header
      span.span 网络工程虚拟仿真管理后台
      .fr
        span {{userName}}
        el-button(size="mini" @click="logout" style="margin: 15px 0 0 10px;") 退出登录
    el-container
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
        // { name: '实验教学', path: '/jiaoxue' },
        // { name: '实验管理', path: '/testmanage' },
        { name: '实验管理', path: '/course1' },
        { name: '实验教学', path: '/course2' },
        { name: '平台介绍', path: '/platdesc' },
        { name: '资料下载', path: '/downloads' },
        { name: '通知中心', path: '/notices' },
        { name: '学生中心', path: '/class' },
        // { name: '管理员设置', path: '/adminManage' }
      ]
      // menus: [
      //   {
      //     name: '主页',
      //     children: [
      //       { name: '实验教学', path: '' },
      //       { name: '实验管理', path: '' },
      //       { name: '平台介绍', path: '' },
      //       { name: '资料下载', path: '' },
      //       { name: '通知中心', path: '' },
      //       { name: '管理员设置', path: '' }
      //     ]
      //   }
      // ]
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
    // border-bottom: 1px solid #e6e6e6;
    background: #00AAEE;
    > span {
      line-height: 60px;
      color: #c4ce73;
      font-size: 25px;
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
    background: #00AAEE;
    li {
      border-top: 1px solid #fff;
      color: #fff;
      font-size: 16px;
      &.is-active {
        background: #00AAEE;
        text-align: center;
        font-size: 18px;
      }
      &:hover {
        background: #00AAEE;
        text-align: center;
        font-size: 18px;
      }
    }
  }
}
</style>
