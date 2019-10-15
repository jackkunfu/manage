<template lang="pug">
  .upload
    el-upload(
      :action="actionUrl" :data="otherData" :show-file-list="false"
      :on-success="handleSuccess" :on-error="handleError" :on-progress="handleProgress"
    )
      el-button(size="small" type="primary") {{name}}
</template>

<script>
export default {
  name: 'Upload',
  props: {
    name: String,
    url: String,
    otherData: {}
  },
  data () {
    return {
      // actionUrl: this.url || '/api/admin/file/upload'
      actionUrl: this.url || this.reqBasic + '/api/admin/file/upload'
    }
  },
  created () {
  },
  methods: {
    handleSuccess (res, file, fileList) {
      if (res) this.$emit('upSus', res, file, fileList)
    },
    handleError (err) {
      console.log(err)
    },
    handleProgress () {}
  }
}
</script>

<style lang="scss" scoped>
</style>
