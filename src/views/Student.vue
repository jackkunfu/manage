<template lang="pug">
  .plat_desc
    .fr
      el-button(size="mini" @click="editVisible = true" style="margin-right: 10px;padding: 9 15px;") 添加
      el-button(size="mini" @click="downEc" style="margin-right: 10px;padding: 9 15px;") 学生模板下载
      Upload(name="学员批量导入" :url="reqBasic + '/admin/student/import'" @upSus="upSus" :otherData="{}")
    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn" @ept="ept")
    el-dialog(
      :visible.sync="editVisible" :before-close="_handleEditClose"
      v-if="editKeys && editKeys.length"
    )
      el-form(v-model="newStu" label-width="80px" size="mini")
        el-form-item(v-for="(item, i) in editKeys" :label="item.label" :key="i")
          el-select(v-model="newStu.cid")
            el-option(
              v-for="(each, idx) in classList" :key="idx"
              :label="each.label" :value="each.value"
            )
          el-input(v-model="newStu.name" placeholder="请输入姓名")
          el-input(v-model="newStu.sno" placeholder="请输入学号")
          el-select(v-model="newStu.sex")
            el-option(label="男" :value="true")
            el-option(label="女" :value="false")
      .op-btns
        el-button(@click="editOk") 确定
        el-button(@click="editClose") 取消
</template>

<script>
import Upload from '@/components/Upload'
import TableCp from '@/components/TableCp'
export default {
  name: 'Student',
  components: { TableCp, Upload },
  data () {
    let query = this.$route.query
    return {
      newStu: {},
      classList: [],
      config: {
        apis: {
          list: { url: '/admin/student/list' },
          del: { url: '/admin/student/delete' },
          add: { url: '/admin/student/add' },
          edit: { url: '/admin/student/update' }
        },
        operates: [
          { name: '编辑', fn: '_edit' },
          { name: '删除', fn: '_del' }
        ],
        tableItems: [
          { name: '学号', prop: 'name' },
          { name: '姓名', prop: 'name', handle: row => row.admin && row.admin.username },
          { name: '性别', prop: '' }
        ],
        seachOpt: { cid: query.cid },
        editKeys: [
          { label: '班级名称', key: 'cid', select: true, list: classList },
          { label: '姓名', key: 'name' },
          { label: '学号', key: 'sno' },
          { label: '性别', key: 'sex', select: true, list: [{label: '男', value: true}, {label: '女', value: false}] }
        ]
      }
    }
  },
  methods: {
    async editOk () {
      let res = await this._fetch('')
      if (res) {
        this.editClose()
      }
    },
    editClose () {
      this.newStu = {}
    },
    async getClassList () {
      let res = await this._fetch('/admin/classes/list', { pageNum: 1, pageSize: 100 }, 'get')
      if (res && res.code == 1 && res.data) {
        return res.data.list || []
      } else return []
    },
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
    upSus (res) {
      if (res && res.code == 1) this.$refs.tp._getList()
      else this._messageTip(res && res.msg || '批量新增失败')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
