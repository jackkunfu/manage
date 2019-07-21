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
          list: '/boss/message/v2/getMessagePage'
        },
        operates: [
          { name: '删除', fn: 'del' }
        ],
        tableItems: [
          { name: '标题', prop: 'nghdAddress' },
          { name: '作者', prop: 'nghdAddress' },
          { name: '发布时间', handle: (row, list) => row.succCount + '/' + row.allCount }
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
