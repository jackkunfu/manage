<template lang="pug">
  .plat_desc
    .fr
      el-button(@click="$refs.tp.isAdd = true" size="mini") 新增
    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn" :selfAdd="selfAdd" :selfEdit="selfEdit")
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
          { name: '图片', prop: 'image', img: true },
          { name: '发布时间', handle: (row, list) => row.createtime.slice(0, 16) }
        ],
        seachOpt: { category: 'introduce' },
        editKeys: [
          { label: '标题', key: 'title' },
          { label: '图片', key: 'image', upload: true },
          { label: '内容', key: 'content', isEdt: true }
        ]
      }
    }
  },
  methods: {
    hadleEditItemFn (data, row) {
      return {
        ...data, status: data.status || false, category: 'introduce'
      }
    },
    selfAdd (row, editObj) {
      editObj.image = ''
      editObj.content = ''
    },
    selfEdit (row, editObj) {
      editObj.image = row.image
      editObj.content = row.content
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
