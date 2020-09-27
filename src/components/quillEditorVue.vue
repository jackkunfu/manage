<template lang="pug">
.editor-ctn
  quillEditor(ref="editor" style="text-align:left" v-model="content")
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'QuillEditorVue',
  components: { quillEditor },
  props: ['value'],
  data () {
    return {}
  },
  computed: {
    content: {
      get () {
        return this.value || null
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>