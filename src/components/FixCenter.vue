<template lang="pug">
  el-dialog(:visible.sync="editVisible" :before-close="handleDialogClose" :close-on-click-modal="false")
    slot
</template>

<script>
export default {
  name: 'FixCenter',
  props: {
    value: Boolean
  },
  data () {
    return {
      // editVisible: false
    }
  },
  computed: {
    editVisible: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  created () {
  },
  methods: {
    handleDialogClose (done) {
      done()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
