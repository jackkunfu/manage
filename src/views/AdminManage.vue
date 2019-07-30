<template lang="pug">
  .plat_desc
    .fr
      el-button(@click="showAdd") 新增管理员
    TableCp(:config="config" ref="TableCp" :editCheck="editCheck")
</template>

<script>
import TableCp from '@/components/TableCp'
import Upload from '@/components/Upload'

export default {
  name: 'AdminManage',
  components: { TableCp, Upload },
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
          { name: '编辑', fn: '_edit' },
          { name: '删除', fn: '_del' }
        ],
        tableItems: [
          { name: '姓名', prop: 'name' },
          { name: '手机号', prop: 'nghdAddress' },
          { name: '账号', prop: 'name' },
          { name: '上传时间', handle: (row, list) => row.createtime.slice(0, 16) }
        ],
        seachOpt: { name: '' },
        editKeys: [
          { label: '姓名', key: 'name' },
          { label: '手机号', key: '' },
          { label: '账号', key: 'username' },
          { label: '密码', key: 'password' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    showAdd () {
      this.$refs.TableCp.isAdd = true
    },
    editCheck (data) {
      let res = { ok: false, msg: '' }
      // if () 
      return { ok: true }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
