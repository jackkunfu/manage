<template lang="pug">
.editor-ctn
  quillEditor(ref="editor" style="text-align:left" @change="onEditorChange" )
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'quillEditorCp',
  components: { quillEditor },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        alert(v)
        let refEd = this.$refs.editor
        if (refEd) refEd.setText(v || '')
      }
    }
  },
  methods: {
    onEditorChange ({ quill, html, text }) {
      console.log(quill, html, text)
      this.$emit('input', html)
      setTimeout(() => {
        alert(23)
        let refEd = this.$refs.editor
        if (refEd) refEd.setText('')
      })
    }
  }
}
</script>