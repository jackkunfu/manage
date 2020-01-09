<template lang="pug">
  .plat_desc
    .fr
      el-button(size="mini" @click="editVisible = true" style="margin-right: 10px;padding: 9 15px;") 添加
      el-button(size="mini" @click="downEc" style="margin-right: 10px;padding: 9 15px;") 学生模板下载
      Upload(name="学员批量导入" :url="reqBasic + '/admin/student/import'" @upSus="upSus" :otherData="{}")
    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn" @ept="ept" @edit="editItem")
    el-dialog(:visible.sync="editVisible" :before-close="editClose")
      el-form(v-model="newStu" label-width="80px" size="mini")
        //- el-form-item(label="班级")
          el-select(v-model="newStu.cid")
            el-option(v-for="(each, idx) in classList" :key="idx" :label="each.name" :value="each.id")
        el-form-item(label="姓名")
          el-input(v-model="newStu.name" placeholder="请输入姓名")
        el-form-item(label="学号")
          el-input(v-model="newStu.sno" placeholder="请输入学号")
        el-form-item(label="性别")
          el-select(v-model="newStu.sex")
            el-option(label="男" :value="true")
            el-option(label="女" :value="false")
      .op-btns
        el-button(@click="editOk" size="mini") 确定
        el-button(@click="editClose" size="mini") 取消
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
      editVisible: false,
      newStu: { sex: true },
      classList: [],
      config: {
        tbIndex: true,
        apis: {
          list: { url: '/admin/student/list' },
          del: { url: '/admin/student/delete' },
          add: { url: '/admin/student/add' },
          edit: { url: '/admin/student/update' }
        },
        operates: [
          { name: '编辑', handleSelf: true, fn: 'edit' },
          { name: '删除', fn: '_del' }
        ],
        tableItems: [
          { name: '学号', prop: 'sno' },
          { name: '姓名', prop: 'name' },
          { name: '性别', prop: 'sex', handle: row => row.sex ? '男' : '女' }
        ],
        seachOpt: { cid: query.cid },
        editKeys: [
          // { label: '班级名称', key: 'cid', select: true, list: [] },
          { label: '姓名', key: 'name' },
          { label: '学号', key: 'sno' },
          { label: '性别', key: 'sex', select: true, list: [{ label: '男', value: true }, { label: '女', value: false }] }
        ]
      }
    }
  },
  created () {
    // this.getClassList()
  },
  methods: {
    editItem (item) {
      this.newStu = item
      this.editVisible = true
    },
    async editOk () {
      let url = this.newStu.id ? '/admin/student/update' : '/admin/student/add'
      this.newStu.cid = this.$route.query.cid
      let res = await this._fetch(url, this.newStu)
      if (res) {
        if (res.code == 1) {
          this._messageTip(res.msg || '操作成功', 1)
          this.$refs.tp._getList()
        }
        else this._messageTip(res.msg || '操作失败')
        this.editClose()
      }
    },
    editClose () {
      this.newStu = { sex: true }
      this.editVisible = false
    },
    // async getClassList () {
    //   let res = await this._fetch('/admin/classes/list', { pageNum: 1, pageSize: 100 }, 'get')
    //   if (res && res.code == 1 && res.data) {
    //     this.classList = res.data.list || []
    //   }
    // },
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
