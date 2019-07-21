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
          list: '/boss/message/v2/getMessagePage'
        },
        operates: [
          { name: '编辑', fn: 'edit' },
          { name: '删除', fn: 'del' }
        ],
        tableItems: [
          { name: '姓名', prop: 'nghdAddress' },
          { name: '手机号', prop: 'nghdAddress' },
          { name: '账号', handle: (row, list) => row.succCount + '/' + row.allCount },
          { name: '上传时间', handle: (row, list) => row.succCount + '/' + row.allCount }
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
