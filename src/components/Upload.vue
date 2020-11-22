<template lang="pug">
  .upload
    el-upload(
      :action="actionUrl" :data="otherDataObj" :show-file-list="false" :headers="headers"
      :on-success="handleSuccess" :on-error="handleError" :on-progress="handleProgress"
      :before-upload="beforeUp" :accept="accept"
    )
      el-button(size="small" type="primary") {{name}}
</template>

<script>
export default {
  name: 'Upload',
  props: {
    name: String,
    url: String,
    otherData: Object,
    beforeFn: Function,
    accept: String
  },
  data () {
    return {
      // actionUrl: this.url || '/admin/file/upload'
      actionUrl: this.url || this.reqBasic + '/admin/file/upload',
      headers: {
        token: localStorage.MToken || ''
      },
      loading: null,
      otherDataObj: this.otherData || {}
    }
  },
  methods: {
    beforeUp () {
      this.loading = this.$loading()
      // if (this.beforeFn) {
      //   var data = this.beforeFn()
      //   if (data) {
      //     console.log(data)
      //     // this.otherDataObj = 
      //     return true
      //   }
      //   return false
      // }
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
