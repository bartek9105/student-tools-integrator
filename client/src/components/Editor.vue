<template>
  <quill-editor
    ref="myQuillEditor"
    v-model="note"
    @input="editNote"
  />
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'Editor',
  components: {
    quillEditor
  },
  data () {
    return {
      note: null
    }
  },
  methods: {
    editNote () {
      this.$emit('editNote', this.note)
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>

<style>

</style>
