<template lang="pug">
  .plat_desc
    .fr
      el-button(@click="$refs.tp.isAdd = true" size="mini") 新增课程
    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn" @ept="ept" @sortChange="sortChange")

    el-dialog(
      :visible.sync="editVisible" :before-close="_handleEditClose"
      v-if="editKeys && editKeys.length && editVisible" :close-on-click-modal="false"
    )
      div
        List(:isChoose="true")
      div
        el-button 取消
        el-button 保存
</template>

<script>
import TableCp from "@/components/TableCp";
import List from "./Course1.vue";
export default {
  name: "Class",
  components: { TableCp, List },
  data() {
    return {
      config: {
        apis: {
          list: { url: "/admin/classes/list" },
          del: { url: "/admin/classes/delete" },
          add: { url: "/admin/classes/add" },
          edit: { url: "/admin/classes/update" }
        },
        operates: [
          { name: "编辑", fn: "_edit" },
          { name: "学员", fn: "ept" },
          { name: "删除", fn: "_del" },
          { name: "关联", fn: "_del" }
        ],
        tableItems: [
          { name: "课程", prop: "name", sortable: true },
          {
            name: "操作人",
            prop: "createBy",
            handle: row => row.admin && row.admin.username
          },
          {
            name: "发布时间",
            prop: "createtime",
            handle: (row, list) => row.createtime.slice(0, 16),
            sortable: true
          }
        ],
        seachOpt: {},
        editKeys: [{ label: "班级名称", key: "name" }]
      }
    };
  },
  created() {},
  methods: {
    sortChange(data) {
      let { prop, order } = data;
      order = (order || "").replace(/ending/, "");
      this.$refs.tp._getList(1, { orderBy: order ? prop + " " + order : "" }); // 第二个参数 会一直影响 table组件的 列表请求 切换为无排序状态的时候须 重置这些参数值为''
    },
    hadleEditItemFn(data, row) {
      return {
        ...data,
        status: data.status || false,
        category: "notify"
      };
    },
    ept(row) {
      this._goUrl("/stu", { query: { cid: row.id, cname: row.name } });
    }
  }
};
</script>

<style lang="scss" scoped></style>
