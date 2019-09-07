<template lang="pug">
  .plat_desc
    .fr
      el-button(@click="addFn") 发布通知
    TableCp(:config="config" ref="TableCp")
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
          { name: '删除', fn: '_del' }
        ],
        tableItems: [
          { name: '标题', prop: 'title' },
          { name: '作者', prop: 'username', handle: row => row.admin ? (row.admin.username || '') : '' },
          { name: '发布时间', handle: (row, list) => row.createtime.slice(0, 16) }
        ],
        seachOpt: { category: 'notify' },
        editKeys: [
          { label: '标题', key: 'title' },
          { label: '内容', key: 'content', type: 'textarea' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    addFn () {
      this.$refs.TableCp.isAdd = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
