<template lang="pug">
  .list
    TableCp(:config="config")
</template>

<script>
import TableCp from '@/components/TableCp'
export default {
  name: 'List',
  components: { TableCp },
  data () {
    return {
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
  }
}
</script>

<style lang="scss" scoped>

</style>
