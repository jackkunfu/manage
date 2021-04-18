<template lang="pug">
div
  div(v-for="item in list")
    template(v-show="curNode === item")
      Wangeditor(v-model="item.content")
      el-button(@click="saveNode") 保存
    .node(@click="curNode = item") {{ item.nodeName }}
  div 暂无节点
</template>

<script>
import Wangeditor from "@/components/Wangeditor.vue";
export default {
  name: "NodeContent",
  props: ["nodes"],
  component: { Wangeditor },
  data() {
    return {
      curNode: {},
      list: []
    };
  },
  created() {
    let list = JSON.parse(JSON.stringify(this.nodes || []));
    if (list.length) {
      this.list = list;
      this.curNode = list[0];
    }
  },
  methods: {
    saveNode(item) {
      this.$emit("save", item);
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
