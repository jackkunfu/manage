<template lang="pug">
  .plat_desc
    TableCp(:config="config")
</template>

<script>
import TableCp from '@/components/TableCp'
export default {
  name: 'PlatDesc',
  components: { TableCp },
  data () {
    return {
      config: {
        apis: {
          list: '/boss/message/v2/getMessagePage'
        },
        operates: [
          { name: '编辑', fn: 'edit' },
          { name: '删除', fn: 'edit' }
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
