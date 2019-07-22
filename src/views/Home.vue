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
        { name: '实验管理', path: '/guanli' },
        { name: '平台介绍', path: '' },
        { name: '资料下载', path: '' },
        { name: '通知中心', path: '' },
        { name: '管理员设置', path: '' }
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
    padding: 20px;
    overflow: auto;
  }
  .el-menu {
    height: 100%;
  }
}
</style>
