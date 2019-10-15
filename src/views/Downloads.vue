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
          { name: '删除', fn: '_del' }
        ],
        tableItems: [
          { name: '标题', prop: 'name', html: true, handle: item => `<a target="_blank" href="${item.url}">${item.name}</a>` },
          { name: '作者', prop: 'createBy' },
          { name: '上传时间', prop: 'createtime' }
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
