<template lang="pug">
  .plat_desc
    .fr
      el-button(@click="$refs.tp.isAdd = true" size="mini") {{ addBtnText }}
    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn")
</template>

<script>
import TableCp from "@/components/TableCp";
export default {
  props: ["pageData"],
  name: "ArticleComp",
  components: { TableCp },
  data() {
    let { addBtnText, type } = this.pageData || {};
    return {
      addBtnText,
      type,
      config: {
        apis: {
          list: { url: "/admin/article/list" },
          del: { url: "/admin/article/delete" },
          add: { url: "/admin/article/add" },
          edit: { url: "/admin/article/update" }
        },
        operates: [
          { name: "编辑", fn: "_edit" },
          { name: "删除", fn: "_del" }
        ],
        tableItems: [
          { name: "标题", prop: "title" },
          {
            name: "作者",
            prop: "username",
            handle: row => (row.admin ? row.admin.username || "" : "")
          },
          { name: "图片", prop: "image", img: true },
          {
            name: "发布时间",
            handle: (row, list) => row.createtime.slice(0, 16)
          },
          {
            name: "是否置顶",
            handle: (row, list) => (row.status ? "是" : "否")
          }
        ],
        seachOpt: { category: type || "" },
        editKeys: [
          { label: "标题", key: "title" },
          { label: "图片", key: "image", upload: true },
          { label: "内容", key: "content", isEdt: true },
          { label: "是否置顶", key: "status", switch: true }
        ]
      }
    };
  },
  created() {},
  methods: {
    hadleEditItemFn(data, row) {
      return {
        ...data,
        status: data.status || false,
        category: this.type || ""
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
