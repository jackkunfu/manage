<template lang="pug">
  div(ref="editor" style="text-align:left")
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: 'editor',
    props: ['value'],
    watch: {
      value: {
        immediate: true,
        handler (v) {
          this.editorContent = v
          if (this.editor) this.editor.txt.html(v || '')
        }
      }
    },
    data () {
      return {
        editor: null,
        editorContent: ''
      }
    },
    methods: {
      
    },
    mounted() {
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.$emit('input', html)
      }
      this.editor.create()
      if (this.value) this.editor.txt.html(this.value || '')
    }
  }
</script>

<style scoped>
</style>