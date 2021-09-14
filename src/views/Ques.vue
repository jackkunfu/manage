<template>
  <ArticleComp :pageData="pageData" />
</template>

<script>
import ArticleComp from "@/components/ArticleComp.vue";
export default {
  name: "Ques",
  components: { ArticleComp },
  data() {
    return {
      pageData: {
        addBtnText: "发布常见问题",
        type: "question"
      }
    };
  }
};
</script>
