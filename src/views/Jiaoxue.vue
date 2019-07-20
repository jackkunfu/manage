<template lang="pug">
  .list
    el-tabs(v-model="activeName" type="card" @tab-click="handleTabClick")
      el-tab-pane(label="实验指导书管理" name="1")
        TableCp(:config="config")
      el-tab-pane(label="实验配置标准答案管理" name="2")
        TableCp(:config="config")
      el-tab-pane(label="实验配置采分点设置" name="3")
        TableCp(:config="config")
</template>

<script>
import TableCp from '@/components/TableCp'
export default {
  name: 'List',
  components: { TableCp },
  data () {
    return {
      activeName: '1',
      config: {
        apis: {
          list: '/boss/message/v2/getMessagePage'
        },
        operates: [
          { name: '编辑', fn: 'edit' }
        ],
        tableItems: [
          { name: '小区名称', prop: 'nghdAddress' },
          { name: '下发进度', handle: (row, list) => row.succCount + '/' + row.allCount }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    handleTabClick (tabVm) {
      console.log(tabVm)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
