<template lang="pug">
  .plat_desc
    .fr
      Upload(name="学员批量导入" url="/api/admin/student/import" @upSus="upSus" :otherData="{}")
    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn" @ept="ept")
</template>

<script>
import Upload from '@/components/Upload'
import TableCp from '@/components/TableCp'
export default {
  name: 'Class',
  components: { TableCp, Upload },
  data () {
    let query = this.$route.query
    return {
      config: {
        apis: {
          list: { url: '/admin/student/list' },
          del: { url: '/admin/student/delete' },
          add: { url: '/admin/student/add' },
          edit: { url: '/admin/student/update' }
        },
        // operates: [
        //   { name: '编辑', fn: '_edit' },
        //   { name: '学员导入', fn: 'export' },
        //   { name: '删除', fn: '_del' }
        // ],
        tableItems: [
          { name: '学号', prop: 'name' },
          { name: '姓名', prop: 'name', handle: row => row.admin && row.admin.username },
          { name: '性别', prop: '' }
        ],
        seachOpt: { cid: query.cid },
        editKeys: [
          { label: '班级名称', key: 'name' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    hadleEditItemFn (data, row) {
      return {
        ...data, status: data.status || false, category: 'notify'
      }
    },
    ept (row) {
      this._goUrl('/stu', { query: { cid: row.id, cname: row.name } })
    },
    upSus () {}
  }
}
</script>

<style lang="scss" scoped>

</style>
