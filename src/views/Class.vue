<template lang="pug">
  .plat_desc
    .fr
      el-button(@click="$refs.tp.isAdd = true" size="mini") 新增班级
    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn" @ept="ept" @sortChange="sortChange")
</template>

<script>
import TableCp from '@/components/TableCp'
export default {
  name: 'Class',
  components: { TableCp },
  data () {
    return {
      config: {
        apis: {
          list: { url: '/admin/classes/list' },
          del: { url: '/admin/classes/delete' },
          add: { url: '/admin/classes/add' },
          edit: { url: '/admin/classes/update' }
        },
        operates: [
          { name: '编辑', fn: '_edit' },
          { name: '学员', fn: 'ept' },
          { name: '删除', fn: '_del' }
        ],
        tableItems: [
          { name: '课程', prop: 'name', sortable: true },
          { name: '操作人', prop: 'createBy', handle: row => row.admin && row.admin.username },
          { name: '发布时间', prop: 'createtime', handle: (row, list) => row.createtime.slice(0, 16), sortable: true }
        ],
        seachOpt: {},
        editKeys: [
          { label: '班级名称', key: 'name' }
        ]
      }
    }
  },
  created () {},
  methods: {
    sortChange (data) {
      let { prop, order } = data
      order = (order || '').replace(/ending/, '')
      this.$refs.tp._getList(1, { orderBy: order ? prop + ' ' + order : '' })
    },
    hadleEditItemFn (data, row) {
      return {
        ...data, status: data.status || false, category: 'notify'
      }
    },
    ept (row) {
      this._goUrl('/stu', { query: { cid: row.id, cname: row.name } })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
