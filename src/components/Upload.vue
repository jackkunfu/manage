<template lang="pug">
  .upload
    el-upload(
      :action="actionUrl" :data="otherData" :show-file-list="false" :headers="headers"
      :on-success="handleSuccess" :on-error="handleError" :on-progress="handleProgress"
      :before-upload="beforeUp"
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
      actionUrl: this.url || this.reqBasic + '/admin/file/upload',
      headers: {
        token: localStorage.MToken || ''
      },
      loading: null
    }
  },
  created () {
  },
  methods: {
    beforeUp () {
      this.loading = this.$loading()
      return true
    },
    handleSuccess (res, file, fileList) {
      if (res) this.$emit('upSus', res, file, fileList)
      this.loading.close()
    },
    handleError (err) {
      console.log(err)
      this.loading.close()
    },
    handleProgress () {}
  }
}
</script>

<style lang="scss" scoped>
.upload {
  display: inline-block;
}
</style>
