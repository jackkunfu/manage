<template lang="pug">
  .list
    .page_top 实验{{csType == 1 ? '管理' : '教学'}}/
      span {{csName}}/{{tsName}}
      .fr
        span.btn(@click="pageBack") 返回
    el-tabs(v-model="activeName" type="card" @tab-click="handleTabClick")
      el-tab-pane(label="作业管理" name="1")
        el-input(placeholder="请输入实验名称搜索" v-model="searchStr")
          el-button(slot="append" @click="searchTest") 搜索
        TableCp(:config="config")
      el-tab-pane(label="数据统计" name="2")
        TableCp(:config="config")
</template>

<script>
import TableCp from '@/components/TableCp'
export default {
  name: 'TestManage',
  components: { TableCp },
  data () {
    let query = this.$route.query
    return {
      csType: query.type, // 1管理  2教学
      csName: query.csname,
      tsName: query.tsname,
      activeName: '1',
      config: {
        apis: {
          list: { url: '/admin/user/list' },
          del: { url: '/admin/user/delete' },
          add: { url: '/admin/user/add' },
          edit: { url: '/admin/user/update' }
        },
        operates: [
        ],
        tableItems: [
          { name: '实验名称', prop: 'nghdAddress' },
          { name: '作业管理', handle: (row, list) => row.succCount + '/' + row.allCount }
        ],
        seachOpt: { name: '' }
      },
      searchStr: ''
    }
  },
  created () {
  },
  methods: {
    searchTest () {
      this.config.seachOpt.name = this.searchStr.trim()
    },
    handleTabClick (tabVm) {
      console.log(tabVm)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
