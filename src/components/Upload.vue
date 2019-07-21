<template lang="pug">
  .upload
    el-upload(
      :action="action" :data="otherData"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
    )
      el-button(size="small" type="primary") {{name}}
</template>

<script>
export default {
  name: 'Upload',
  props: {
    name: String,
    action: String,
    otherData: {}
  },
  data () {
    return {
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
