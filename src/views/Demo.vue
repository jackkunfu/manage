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
          { name: '消息内容', prop: 'contentDetaile' },
          { name: '下发进度', handle: (row, list) => row.contentType + ':' + row.contentType },
          { name: '备注', prop: 'extra' }
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
