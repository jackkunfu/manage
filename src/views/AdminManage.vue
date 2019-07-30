<template lang="pug">
  .plat_desc
    .fr
      el-button() 新增管理员
    TableCp(:config="config")
</template>

<script>
import TableCp from '@/components/TableCp'
import Upload from '@/components/Upload'

export default {
  name: 'AdminManage',
  components: { TableCp, Upload },
  data () {
    return {
      config: {
        apis: {
          list: { url: '/admin/user/list' },
          del: { url: '/admin/user/delete' },
          add: { url: '/admin/user/add' },
          edit: { url: '/admin/user/update' }
        },
        operates: [
          { name: '编辑', fn: 'edit' },
          { name: '删除', fn: 'del' }
        ],
        tableItems: [
          { name: '姓名', prop: 'name' },
          { name: '手机号', prop: 'nghdAddress' },
          { name: '账号', prop: 'name' },
          { name: '上传时间', handle: (row, list) => row.createtime.slice(0, 16) }
        ],
        seachOpt: { name: '' }
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
