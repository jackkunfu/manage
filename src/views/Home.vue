<template lang="pug">
  el-container.ctn
    el-header header
    el-container
      el-aside(width="200px")
        el-menu(:default-openeds="[0]")
          //- el-submenu(v-for="(menu, i) in menus" :index="i")
          //-   el-menu-item(v-for="(item, j) in menu.children" :key="j") {{item.name}}
          el-menu-item(v-for="(item, j) in menus" :key="j" @click="clickItem(item)") {{item.name}}
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
    return {
      menus: [
        { name: '实验教学', path: '/jiaoxue' },
        { name: '实验管理', path: '/testmanage' },
        { name: '平台介绍', path: '/platdesc' },
        { name: '资料下载', path: '/downloads' },
        { name: '通知中心', path: '/notices' },
        { name: '管理员设置', path: '/adminManage' }
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
      this._goUrl(item.path)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.ctn {
  .el-header {
    border-bottom: 1px solid #e6e6e6;
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
  }
}
</style>
