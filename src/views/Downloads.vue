<template lang="pug">
  .downloads
    .fr
      Upload(name="上传" @upSus="upSus" :otherData="otherObj" :beforeFn="beforeFn")
    TableCp(:config="config" ref="TableCp" @update="updateName")
    el-dialog(:visible.sync="editVisible" :before-close="editClose" :close-on-click-modal="false")
      el-form(v-model="newStu" label-width="80px" size="mini")
        el-form-item(label="文件名称")
          el-input(v-model="newStu.name" placeholder="请输入名称")
        el-form-item(label="是否展示")
          el-switch(v-model="newStu.display")
      .op-btns
        el-button(@click="editOk" size="mini") 确定
        el-button(@click="editClose" size="mini") 取消
</template>

<script>
import TableCp from "@/components/TableCp";
import Upload from "@/components/Upload";
export default {
  name: "Downloads",
  components: { TableCp, Upload },
  data() {
    return {
      config: {
        apis: {
          list: { url: "/admin/file/list" },
          del: { url: "/admin/file/delete" }
        },
        operates: [
          { name: "删除", fn: "_del" },
          { name: "更改名称/展示", fn: "update", handleSelf: true }
        ],
        tableItems: [
          {
            name: "标题",
            prop: "name",
            html: true,
            handle: item =>
              `<a target="_blank" href="${item.url}">${item.name}</a>`
          },
          { name: "作者", prop: "createBy" },
          {
            name: "是否展示",
            prop: "display",
            handle: item => (item.display ? "是" : "否")
          },
          { name: "上传时间", prop: "createtime" }
        ],
        seachOpt: { name: "" }
      },
      otherObj: { name: "", display: false },
      newStu: { name: "", display: false },
      editVisible: false
    };
  },
  created() {},
  methods: {
    updateName(data) {
      this.newStu.id = data.id;
      this.newStu.name = data.name;
      this.newStu.display = data.display;
      this.editVisible = true;
    },
    async editOk() {
      let res = await this._fetch("/admin/file/update", this.newStu);
      if (res && res.code == 1) {
        this.$refs.TableCp._getList();
        this._messageTip(res.msg || "操作成功", 1);
        this.editClose();
      } else this._messageTip(res.msg || "操作失败");
    },
    editClose() {
      this.newStu.name = "";
      this.newStu.display = false;
      this.newStu.id = "";
      this.editVisible = false;
    },
    upSus(res, file, fileList) {
      this._messageTip("上传成功", 1);
      this.$refs.TableCp._getList();
    },
    beforeFn() {
      var a = prompt("请输入名称");
      if (a && a.trim() != "") {
        this.otherObj = { ...this.newStu, name: a.trim() };
        return true;
      } else return false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
