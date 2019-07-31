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
          list: { url: '/admin/article/list' },
          del: { url: '/admin/article/delete' },
          add: { url: '/admin/article/add' },
          edit: { url: '/admin/article/update' }
        },
        operates: [
          { name: '编辑', fn: 'edit' },
          { name: '删除', fn: 'edit' }
        ],
        tableItems: [
          { name: '标题', prop: 'title' },
          { name: '作者', prop: 'username', handle: row => row.admin ? (row.admin.username || '') : '' },
          { name: '发布时间', handle: (row, list) => row.createtime.slice(0, 16) }
        ],
        seachOpt: { category: 'introduce' }
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
