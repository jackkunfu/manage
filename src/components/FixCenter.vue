<template lang="pug">
  el-dialog(
      :visible.sync="editVisible" :before-close="handleDialogClose"
    )
      slot
</template>

<script>
export default {
  name: 'FixCenter',
  data () {
    return {
      editVisible: false
    }
  },
  created () {
  },
  methods: {
    handleDialogClose () {}
  }
}
</script>

<style lang="scss" scoped>
</style>
