<template lang="pug">
  .downloads
    el-container
      el-aside
        el-button(@click="addNode('')") 新增
        el-tree(:data="dirs" @node-click="nodeClick" node-key="id" :default-expanded-keys="[0]")
          .item_node(slot-scope="{ node, data }")
            span {{ data.categoryName }}
            span
              el-button(@click.stop="addNode(data)" type="text") 新增子级
              el-button(@click.stop="cdDel(data)" type="text") 删除

      el-main
        .fr
          //- Upload(name="上传" @upSus="upSus" :otherData="otherObj" :http-request="upFile" :url="reqBasic + '/admin/file/upload'")
          el-upload(action="/admin/file/upload" :http-request="upFile" :show-file-list="false")
            el-button 上传
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

    el-dialog(:visible.sync="isAddCd" :before-close="cdCancel" :close-on-click-modal="false")
      el-form(v-model="newNode" label-width="200px")
        el-form-item(label="类型")
          el-select(v-model="newNode.type" @change="changeNodeType")
            el-option(label="文件夹" value="1")
            el-option(label="文件" value="2")
        template(v-if="newNode.type == 1")
          el-form-item(label="文件夹名称")
            el-input(v-model="newNode.categoryName" placeholder="文件夹名称")
        template(v-if="newNode.type == 2")
          el-form-item(label="上传文件")
            Upload(v-if="showUpBtn" name="上传" @upSus="upSusType" :otherData="otherObj")
          //- el-form-item(label="是否展示")
              el-switch(v-model="newStu.display")

        el-form-item(v-if="newNode.type == 1")
          el-button(@click="cdAdd") 确定
          el-button(@click="cdCancel") 取消
</template>

<script>
import TableCp from "@/components/TableCp";
import Upload from "@/components/Upload";

import { deepFillParent } from "@/js/fn";

let handleCate = {
  add: async function() {
    let type = this.newNode.type;
    if (!this.newNode.type) return tip("请选择类型");
    let opt = {
      parentId: (this.curHandleItem && this.curHandleItem.id) || 0
    };
    if (type == 1) {
      let name = (this.newNode.categoryName || "").trim();
      if (!name) return tip("请输入文件夹名称");
      this.newNode.categoryName = opt.categoryName = name;
      handleCate.addCate.call(this, opt);
    } else if (type == 2) {
      handleCate.addFile.call(this, opt);
    }
  },
  addCate(opt) {
    this.reqCb("/admin/file/category/add", opt, () => {
      this.getCdList();
      handleCate.cancel.call(this);
    });
  },
  cancel: function() {
    this.newNode.categoryName = "";
    this.newNode.type = "";
    this.showUpBtn = false;
    // delete this.newNode.parentId;
    this.isAddCd = false;
  },
  del: function(item) {
    this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      this.reqCb("/admin/file/category/delete", { id: item.id }, () => {
        this.curHandleItem = item.parent || null;
        this.getCdList();
      });
    });
  }
  // list: function() {
  //   this.reqCb("/admin/file/category/list", item, () => {
  //     this.getCdList();
  //   });
  // }
};

export default {
  name: "Downloads",
  components: { TableCp, Upload },
  data() {
    return {
      isAddCd: false,
      curHandleItem: null,
      showUpBtn: false,
      newNode: {
        type: ""
      },
      isAddNew: false,
      dirs: [{ categoryName: "全部", id: 0, children: [] }],
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
          // { name: "作者", prop: "createBy" },
          {
            name: "是否展示",
            prop: "display",
            handle: item => (item.display ? "是" : "否")
          },
          { name: "上传时间", prop: "createtime" }
        ],
        seachOpt: { categoryId: 0 }
      },
      otherObj: { display: false },
      newStu: { name: "", display: false },
      editVisible: false
    };
  },
  created() {
    this.getCdList();
  },
  methods: {
    changeNodeType(t) {
      console.log(t);
      this.otherObj.categoryId = this.curHandleItem.id;
      this.showUpBtn = true;
    },
    upFile(data) {
      console.log(data);
      let fd = new FormData();
      fd.append(
        "categoryId",
        (this.curHandleItem && this.curHandleItem.id) || 0
      );
      fd.append("file", data.file);
      this.reqCb("/admin/file/upload", fd, res => {
        this.$refs.TableCp._getList();
      });
    },
    ...{
      cdAdd: handleCate.add,
      cdDel: handleCate.del,
      cdCancel: handleCate.cancel,
      addCate: handleCate.addCate,
      addFile: handleCate.addCate
    },
    addNode(item) {
      console.log(item);
      this.curHandleItem = item || null;
      // this.newNode.parentId = (item && item.id) || 0;
      this.isAddCd = true;
    },
    nodeClick(item, node) {
      // 展示当前点击文件夹中得图片
      // if (this.config.seachOpt.categoryId != item.id) {}
      this.config.seachOpt.categoryId = item.id;
      this.$refs.TableCp._getList();

      if (!node.expanded) return; // 收起不请求子集文件夹列表

      this.curHandleItem = item;
      // this.getCdList();
    },
    async getCdList() {
      let item = this.curHandleItem;
      let itemId = (item && item.id) || 0;
      this.reqCb(
        "/admin/file/category/list",
        { categoryId: itemId },
        "get",
        res => {
          let list = res.data || [];
          if (item) {
            item.children = list.map(el => {
              el.parent = item;
              return el;
            });
          } else {
            deepFillParent(list);
            this.dirs[0].children = list;
          }
          this.$forceUpdate();
          this.curHandleItem = null;
        }
      );
      // this.reqCb(
      //   "/admin/file/list",
      //   { categoryId: (this.curHandleItem && this.curHandleItem.id) || 0 },
      //   "get",
      //   res => {
      //     this.fileList = res.data || [];
      //   }
      // );
    },
    updateName(data) {
      this.newStu.id = data.id;
      this.newStu.name = data.name;
      this.newStu.display = data.display;

      let item = this.curHandleItem;
      this.newStu.categoryId = (item && item.id) || 0;

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
    upSusType(res, file, fileList) {
      this._messageTip("上传成功", 1);
      this.$refs.TableCp._getList();
      this.cdCancel();
    }
    // beforeFn() {
    //   var a = prompt("请输入名称");
    //   if (a && a.trim() != "") {
    //     this.otherObj = { ...this.newStu, name: a.trim() };
    //     return true;
    //   } else return false;
    // }
  }
};
</script>

<style lang="scss" scoped>
.downloads {
  height: 100%;
  .el-aside,
  .el-main {
    height: 100%;
    overflow: auto;
  }
  .el-aside {
    border-right: 1px solid #eee;
    padding-right: 10px;
    .el-tree {
      margin-top: 30px;
    }
  }
  .item_node {
    display: flex;
    flex: 1;
    justify-content: space-between;
    line-height: 32px;
  }
}
</style>
