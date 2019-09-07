<template lang="pug">
  div(ref="editor" style="text-align:left")
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: 'editor',
    data () {
      return {
        editorContent: ''
      }
    },
    methods: {
      
    },
    mounted() {
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.$emit('input', html)
      }
      editor.create()
    }
  }
</script>

<style scoped>
</style>