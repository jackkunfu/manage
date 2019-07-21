<template lang="pug">
  .downloads
    .fr
      Upload(:name="上传")
    TableCp(:config="config")
</template>

<script>
import TableCp from '@/components/TableCp'
import Upload from '@/components/Upload'
export default {
  name: 'Downloads',
  components: { TableCp, Upload },
  data () {
    return {
      config: {
        apis: {
          list: '/boss/message/v2/getMessagePage'
        },
        operates: [
          { name: '删除', fn: 'edit' }
        ],
        tableItems: [
          { name: '标题', prop: 'nghdAddress' },
          { name: '作者', prop: 'nghdAddress' },
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
