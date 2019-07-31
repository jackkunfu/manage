<template lang="pug">
  .downloads
    .fr
      Upload(name="上传" @upSus="upSus" :otherData="{}")
    TableCp(:config="config" ref="TableCp")
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
          list: { url: '/admin/file/list' },
          del: { url: '/admin/file/delete' }
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
      this._messageTip('上传成功', 1)
      this.$refs.TableCp.getList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
