<template lang="pug">
  .plat_desc
    .fr
      el-button() 发布通知
    TableCp(:config="config")
</template>

<script>
import TableCp from '@/components/TableCp'
import Upload from '@/components/Upload'

export default {
  name: 'Notices',
  components: { TableCp, Upload },
  data () {
    return {
      config: {
        apis: {
          list: { url: '/admin/article/list' },
          del: { url: '/admin/article/delete' },
          add: { url: '/admin/article/add' },
          edit: { url: '/admin/article/update' }
        },
        operates: [
          { name: '删除', fn: 'del' }
        ],
        tableItems: [
          { name: '标题', prop: 'nghdAddress' },
          { name: '作者', prop: 'nghdAddress' },
          { name: '发布时间', handle: (row, list) => row.succCount + '/' + row.allCount }
        ],
        seachOpt: { category: 'notify' },
        editKeys: [
          { label: '姓名', key: 'name' },
          { label: '手机号', key: 'phone' },
          { label: '账号', key: 'username' },
          { label: '密码', key: 'password' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
