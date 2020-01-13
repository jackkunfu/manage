<template lang="pug">
  .plat_desc
    .fr
      el-button(@click="$refs.tp.isAdd = true" size="mini") 发布介绍
    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn")
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
          { name: '编辑', fn: '_edit' },
          { name: '删除', fn: '_del' }
        ],
        tableItems: [
          { name: '标题', prop: 'title' },
          { name: '作者', prop: 'username', handle: row => row.admin ? (row.admin.username || '') : '' },
          { name: '发布时间', handle: (row, list) => row.createtime.slice(0, 16) },
          { name: '是否置顶', handle: (row, list) => row.status ? '是' : '否' }
        ],
        seachOpt: { category: 'useDesc' },
        editKeys: [
          { label: '标题', key: 'title' },
          { label: '内容', key: 'content', isEdt: true },
          { label: '是否置顶', key: 'status', switch: true }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    hadleEditItemFn (data, row) {
      return {
        ...data, status: data.status || false, category: 'useDesc'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
