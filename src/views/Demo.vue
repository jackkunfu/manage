<template lang="pug">
  .list
    TableCp(:config="config" :hadleEditItemFn="hadleEditItemFn" :selfEdit="selfEdit")
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
          list: { url: '/admin/user/list' },
          del: { url: '/admin/user/delete' },
          add: { url: '/admin/user/add' },
          edit: { url: '/admin/user/update' }
        },
        operates: [
          { name: '编辑', fn: 'edit' }
        ],
        tableItems: [
          { name: '消息内容', prop: 'contentDetaile' },
          { name: '下发进度', handle: (row, list) => row.contentType + '/' + row.contentType },
          { name: '备注', prop: 'extra' }
        ],
        editKeys: [
          { label: '消息内容', key: 'contentDetaile' },
          { label: '下发进度', key: 'contentType', select: true, list: [] }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    hadleEditItemFn (data, item) { // 需要再次处理edit请求参数的时候配置此数据
      console.log(data) // 当前编辑的数据
      console.log(item) // 原数据所有数据
      return data
    },
    selfEdit (item) { // 点击编辑按钮时，展示的内容可能需要再次处理下的 在此方法里再次处理下
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
