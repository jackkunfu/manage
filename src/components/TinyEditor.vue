<template>
  <div class="tinymce-editor">
    <Editor v-model="myValue" :init="init" />
  </div>
</template>
<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  components: { Editor },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount powerpaste"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat"
    }
  },
  data() {
    return {
      init: {
        language_url: "/tinymce/zh_CN.js", //public目录下
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide", //public目录下
        height: 300,
        plugins: this.plugins, // 父组件传入 或者 填写个默认的插件 要选用什么插件都可以 去官网可以查到
        toolbar: this.toolbar, // 工具栏 我用到的也就是lists image media table wordcount 这些 根据需求而定
        // images_upload_url: this.reqBasic + '/admin/file/upload', //上传路径
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler

        // wordpaster 参考  https://www.jianshu.com/p/23badd25f6d2    https://www.e-learn.cn/topic/3788204

        // 官网抄的图片上传 项目如果用了vue-resource可以用$http 因为比较懒就没改
        images_upload_handler: async (blobInfo, success, failure) => {
          let fd = new FormData();
          fd.append("file", blobInfo.blob(), blobInfo.filename());
          let res = await this._fetch("/admin/file/upload", fd, "post");
          if (res && res.code === 1) {
            success((res.data && res.data.url) || "");
          } else {
            failure("上传失败");
          }
        }
      },
      myValue: this.value
    };
  },
  mounted() {
    // tinymce.init({})
  },
  methods: {
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>

<style lang="scss">
.tox-tinymce-aux {
  z-index: 8888 !important;
}
</style>
