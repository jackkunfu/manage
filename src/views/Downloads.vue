<template lang="pug">
  .downloads
    .fr
      Upload(:name="上传" @upSus="upSus" :otherData="{}")
    TableCp(:config="config")
</template>

<script>
import TableCp from '@/components/TableCp'
import Upload from '@/components/Upload'
export default {
  name: 'Downloads',
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
          { name: '删除', fn: 'edit' }
        ],
        tableItems: [
          { name: '标题', prop: 'nghdAddress' },
          { name: '作者', prop: 'nghdAddress' },
          { name: '上传时间', handle: (row, list) => row.succCount + '/' + row.allCount }
        ],
        seachOpt: { name: '' }
      }
    }
  },
  created () {
  },
  methods: {
    upSus (res, file, fileList) {
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
