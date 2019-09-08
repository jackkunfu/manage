<template lang="pug">
  .list
    el-tabs(v-model="activeName" type="card" @tab-click="handleTabClick")
      el-tab-pane(label="实验指导书管理" name="1")
        TableCp(:config="configZhidaoshu")
      el-tab-pane(label="实验配置标准答案管理" name="2")
        TableCp(:config="configAnwswer")
      el-tab-pane(label="实验配置采分点设置" name="3")
        TableCp(:config="configScoer")
</template>

<script>
import TableCp from '@/components/TableCp'
export default {
  name: 'Jiaoxue',
  components: { TableCp },
  data () {
    return {
      activeName: '1',
      configZhidaoshu: {
        apis: {
          list: { url: '/admin/user/list' },
          del: { url: '/admin/user/delete' },
          add: { url: '/admin/user/add' },
          edit: { url: '/admin/user/update' }
        },
        operates: [
          { name: '上传', fn: 'upload', isShow: data => data.aa },
          { name: '编辑', fn: 'edit' },
          { name: '删除', fn: 'del' }
        ],
        tableItems: [
          { name: '实验名称', prop: 'name' },
          { name: '实验指导书', handle: (row, list) => row.succCount + '/' + row.allCount },
          { name: '作者', prop: 'nghdAddress' },
          { name: '上传时间', prop: 'nghdAddress' },
          { name: '实验名称', prop: 'nghdAddress' }
        ],
        editKeys: [
          { label: '', key: '' }
        ]
      },
      configAnwswer: {
        apis: {
          list: { url: '/admin/user/list' },
          del: { url: '/admin/user/delete' },
          add: { url: '/admin/user/add' },
          edit: { url: '/admin/user/update' }
        },
        operates: [
          { name: '上传', fn: 'upload', isShow: data => data.aa },
          { name: '删除', fn: 'del' }
        ],
        tableItems: [
          { name: '实验名称', prop: 'nghdAddress' },
          { name: '实验配置标准答案', handle: (row, list) => row.succCount + '/' + row.allCount },
          { name: '作者', prop: 'nghdAddress' },
          { name: '上传时间', prop: 'nghdAddress' },
          { name: '实验名称', prop: 'nghdAddress' }
        ]
      },
      configScoer: {
        apis: {
          list: { url: '/admin/user/list' },
          del: { url: '/admin/user/delete' },
          add: { url: '/admin/user/add' },
          edit: { url: '/admin/user/update' }
        },
        operates: [
          { name: '上传', fn: 'upload', isShow: data => data.aa },
          { name: '编辑', fn: 'edit' },
          { name: '删除', fn: 'del' }
        ],
        tableItems: [
          { name: '实验名称', prop: 'nghdAddress' },
          { name: '实验采分点', handle: (row, list) => row.succCount + '/' + row.allCount },
          { name: '作者', prop: 'nghdAddress' },
          { name: '上传时间', prop: 'nghdAddress' },
          { name: '实验名称', prop: 'nghdAddress' }
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
