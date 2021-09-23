<template lang="pug">
  .plat_desc
    .fr
      el-button(@click="$refs.tp.isAdd = true" size="mini") 新增课程
    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn" @ept="ept" @rowLink="rowLink" @sortChange="sortChange")

    el-dialog(
      v-if="showLink" :visible.sync="showLink" :close-on-click-modal="false"
    )
      div
        List(:isChoose="true" @selectChange="selectChange")
      div
        el-button(@click="cancelLink") 取消
        el-button(@click="saveLink") 保存
</template>

<script>
import TableCp from "@/components/TableCp";
import List from "./Course1.vue";
export default {
  name: "Link",
  components: { TableCp, List },
  data() {
    return {
      curLinkObj: null,
      showLink: false,
      choose: [],
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
          { name: "关联", fn: "rowLink" }
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
    async saveLink() {
      if (!this.choose.length) return this._messageTip("请选择实验", 2);
      let res = await this._fetch("/admin/classes/labs", {
        classId: this.curLinkObj.id,
        labIds: this.choose.map(el => el.id).join(",")
      });
      if (res && res.code === 1) {
        this._messageTip(res.msg || "关联成功", 1);
        this.cancelLink();
      } else this._messageTip((res && res.msg) || "操作失败，请稍微重试");
    },
    selectChange(data) {
      this.choose = data;
    },
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
    },
    rowLink(row) {
      this.curLinkObj = row;
      this.showLink = true;
    },
    cancelLink() {
      this.showLink = false;
      this.curLinkObj = null;
    }
  }
};
</script>

<style lang="scss" scoped></style>
