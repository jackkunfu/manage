<template lang="pug">
  .plat_desc
    .fr
      el-button(size="mini" @click="downEc" style="margin-right: 10px;padding: 9 15px;") 学生模板下载
      Upload(name="学员批量导入" :url="reqBasic + '/api/admin/student/import'" @upSus="upSus" :otherData="{}")
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
    downEc () {
      window.open(this.reqBasic + '/admin/student/import/template')
    },
    hadleEditItemFn (data, row) {
      return {
        ...data, status: data.status || false, category: 'notify'
      }
    },
    ept (row) {
      this._goUrl('/stu', { query: { cid: row.id, cname: row.name } })
    },
    upSus () {
      this.$refs.tp._getList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
