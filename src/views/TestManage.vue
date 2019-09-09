<template lang="pug">
  .list
    .page_top 实验{{csType == 1 ? '管理' : '教学'}}/
      span {{csName}}/{{tsName}}
      .fr
        span.btn(@click="pageBack") 返回
    el-tabs(v-model="activeName" type="card" @tab-click="handleTabClick" lazy)
      el-tab-pane(label="指导书管理" name="1")
        //- el-input(placeholder="请输入实验名称搜索" v-model="searchStr")
          el-button(slot="append" @click="searchTest") 搜索
        div
          .fr
            el-button(size="mini" @click="$refs.tp1.isAdd = true") 上传指导书
        TableCp(:config="config1" ref="tp1" :hadleEditItemFn="hadleEditItemFn1")
          //- template(slot="operate" slot-scope="row")
            //- Upload( name="上传" url="/api/admin/labGuide/add" @upSus="upSus" :otherData="{ labId: row.labId }")

      el-tab-pane(label="标准答案设置" name="2")
        div
          .fr
            el-button(size="mini" @click="isAddAns = true") 设置标准答案
        TableCp(:config="config2" ref="tp2")
        FixCenter(v-model="isAddAns")
          el-form(v-model="newAns" label-width="70px")
            el-form-item(label="设备节点")
              el-select(v-model="newAns.id")
                el-option(v-for="(item, i) in testNodesData" :label="item.name" :value="item.id")
            el-form-item(label="答案")
              Wangeditor(v-model="newAns.content")
            el-form-item
              el-button(type="primary" @click="addAnsFn") 新增
              el-button(@click="newAns = {};isAddAns = false;") 取消

      el-tab-pane(label="采分点设置" name="3")
        div
          .fr
            el-button(size="mini" @click="isAddScPoint= true") 设置采分点
        TableCp(:config="config3" ref="tp3")
        FixCenter(v-model="isAddScPoint")
          el-form(v-model="newAns")
            el-form-item
              div(style="max-height: 400px;overflow: scroll;")
                div(v-for="(item, i) in scorePoints" style="margin-bottom: 10px;overflow: hidden;")
                  el-col(:span="10")
                    el-select(v-model="item.id" placeholder="请选择节点")
                      el-option(v-for="(item, i) in testNodesData" :label="item.name" :value="item.id")
                  el-col(:span="13")
                    el-input(v-model="item.text")
            el-form-item
              el-button(@click="scorePoints.push({})") 新增采分点
            el-form-item
              el-button(type="primary" @click="addScorePoint") 新增
              el-button(@click="scorePoints = [];isAddScPoint = false;") 取消
</template>

<script>
import TableCp from '@/components/TableCp'
import Upload from '@/components/Upload'
import FixCenter from '@/components/FixCenter'
import Wangeditor from '@/components/Wangeditor.vue'
export default {
  name: 'TestManage',
  components: { TableCp, Upload, FixCenter, Wangeditor },
  data () {
    let query = this.$route.query
    return {
      csType: query.type, // 1管理  2教学
      csName: query.csname,
      tsName: query.tsname,
      tsId: query.tsid,
      activeName: '1',
      config1: { // 指导书
        apis: {
          list: { url: '/admin/labGuide/list' },
          del: { url: '/admin/labGuide/delete' },
          add: { url: '/admin/labGuide/add' },
          edit: { url: '/admin/labGuide/update' }
        },
        operates: [
          { name: '编辑', fn: '_edit', ishow: row => row.id },
          { name: '删除', fn: '_del', ishow: row => row.id },
          // { name: '上传', fn: 'up', ishow: row => row.id }
        ],
        tableItems: [
          { name: '实验指导书', prop: 'title' },
          { name: '作者', prop: 'createBy' },
          { name: '上传时间', prop: 'createtime' }
        ],
        seachOpt: {},
        editKeys: [
          { label: '标题', key: 'title' },
          { label: '内容', key: 'content', isEdt: true }
        ]
      },
      searchStr: '',
      isAddAns: false,
      config2: { // 标准答案
        apis: {
          list: { url: '/admin/labAnswer/list' },
          del: { url: '/admin/labAnswer/delete' },
          add: { url: '/admin/labAnswer/add' },
          edit: { url: '/admin/labAnswer/update' }
        },
        operates: [
          { name: '编辑', fn: '_edit', ishow: row => row.id },
          { name: '删除', fn: '_del', ishow: row => row.id },
          // { name: '上传', fn: 'up', ishow: row => row.id }
        ],
        tableItems: [
          { name: 'ID', prop: 'nghdAddress' },
          { name: 'Name', prop: 'name' },
          { name: '操作时间', prop: 'createtime' }
        ],
        seachOpt: {}
      },
      config3: { // 采分点
        apis: {
          list: { url: '/admin/labSpot/list' },
          del: { url: '/admin/labSpot/delete' },
          add: { url: '/admin/labSpot/add' },
          edit: { url: '/admin/labSpot/update' }
        },
        operates: [
          { name: '编辑', fn: '_edit', ishow: row => row.id },
          { name: '删除', fn: '_del', ishow: row => row.id },
          // { name: '上传', fn: 'up', ishow: row => row.id }
        ],
        tableItems: [
          { name: '实验采分点', prop: 'nghdAddress' },
          { name: '操作时间', prop: 'createtime' }
        ],
        seachOpt: { labId: query.tsid }
      },
      testNodesData: [],
      newAns: { labId: '', content: '' },
      scorePoints: [{}],
      isAddScPoint: false
    }
  },
  created () {
    this.getNodes()
  },
  methods: {
    async getNodes () {
      let res = await this._fetch('/api/lab/device/list', { path: this.$route.query.tsid }, 'get')
      if (res && res.code == 1 && res.data && res.data.topology) this.testNodesData = res.data.topology.nodes || []
    },
    hadleEditItemFn1 (data, row) {
      return {
        ...data, labId: this.tsId
      }
    },
    searchTest () {
      this.config.seachOpt.name = this.searchStr.trim()
    },
    handleTabClick (tabVm) {
      console.log(tabVm)
    },
    upSus () {
      alert(1)
    },
    async addAnsFn () {
      let res = await this._fetch('/admin/labAnswer/add', { ...this.newAns, labId: this.tsId })
      if (res && res.code == 1) {
        this.isAddAns = false
        this.$refs.tp2._getList()
      }
    },
    async addScorePoint () {
      let res = await this._fetch('/admin/labAnswer/add', { ...this.newAns, labId: this.tsId })
      if (res && res.code == 1) {
        this.isAddScPoint = false
        this.$refs.tp3._getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
