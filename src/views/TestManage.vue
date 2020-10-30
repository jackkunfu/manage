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
            //- el-button(size="mini" @click="$refs.tp1.isAdd = true") 上传指导书
            Upload(name="上传指导书(pdf)" @upSus="upSus" accept=".pdf")
        TableCp(:config="config1" ref="tp1" :hadleEditItemFn="hadleEditItemFn1" @downZhidao="downZhidao")
          //- template(slot="operate" slot-scope="row")
          //-   Upload(name="上传" url="/api/admin/labGuide/add" @upSus="upSus" :otherData="{ labId: row.labId }")

      el-tab-pane(label="标准答案设置" name="2")
        div
          .fr
            el-button(size="mini" @click="isAddAns = true") 设置标准答案
        TableCp(:config="config2" ref="tp2" @editAns="editAns")
        FixCenter(v-model="isAddAns" @close="newAns = {}")
          el-form(v-model="newAns" label-width="70px" size="mini")
            el-form-item(label="设备节点")
              el-select(v-model="newAns.nodeId")
                el-option(v-for="(item, i) in testNodesData" :key="item.id" :label="item.name" :value="item.id")
            el-form-item(label="答案")
              //- Wangeditor(v-model="newAns.content")
              el-input(size="mini" type="textarea" v-model="newAns.content")
            el-form-item(label="是否展示")
              el-switch(size="mini" v-model="newAns.display")
            el-form-item
              el-button(type="primary" @click="addAnsFn") 确定
              el-button(@click="newAns = {};isAddAns = false;") 取消

      el-tab-pane(label="采分点设置" name="3")
        div
          .fr
            el-button(size="mini" @click="isAddScPoint= true") 批量设置采分点
            el-button(size="mini" @click="$refs.tp3.isAdd = true") 新增
        TableCp(:config="config3" ref="tp3" :hadleEditItemFn="hadleEditItemFnPoint" @spread="spreadScorePoint")
          div(slot="header") 111
        FixCenter(v-model="isAddScPoint" @close="scorePoints = [{}]")
          el-form(size="mini")
            el-form-item
              div(style="max-height: 400px;overflow: scroll;")
                div(v-for="(item, i) in scorePoints" style="margin-bottom: 10px;overflow: hidden;")
                  el-col(:span="5")
                    el-select(v-model="item.nodeId" placeholder="请选节点")
                      el-option(v-for="(item, i) in testNodesData" :label="item.name" :value="item.id")
                  el-col(:span="5")
                    el-input(v-model="item.title" placeholder="采分点名称")
                  el-col(:span="8")
                    el-input(v-model="item.command" type="textarea" placeholder="输入命令")
                  el-col(:span="4")
                    el-input-number(v-model="item.score" placeholder="请输入分数" :min="0" :max="100")
            el-form-item
              .fr
                el-button(@click="scorePoints.push({})") 新增
            el-form-item
              el-button(type="primary" @click="addScorePoint") 确定
              el-button(@click="scorePoints = [{}];isAddScPoint = false;") 取消
</template>

<script>
import TableCp from '@/components/TableCp'
import Upload from '@/components/Upload'
import FixCenter from '@/components/FixCenter'
import Wangeditor from '@/components/Wangeditor.vue'
import axios from 'axios'
export default {
  name: 'TestManage',
  components: { TableCp, Upload, FixCenter, Wangeditor },
  data () {
    let query = this.$route.query
    let vm = this
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
          { name: '下载', fn: 'downZhidao', ishow: row => row.id },
          // { name: '编辑', fn: '_edit', ishow: row => row.id },
          { name: '删除', fn: '_del', ishow: row => row.id },
          // { name: '上传', fn: 'up', ishow: row => row.id }
        ],
        tableItems: [
          { name: '实验指导书', prop: 'title' },
          { name: '作者', prop: 'createBy', handle: data => data.admin && data.admin.name || '' },
          { name: '上传时间', prop: 'createtime' }
        ],
        seachOpt: { labId: query.tsid },
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
          { name: '编辑', fn: '_edit', ishow: row => row.id, handleSelf: true, fn: 'editAns' },
          { name: '删除', fn: '_del', ishow: row => row.id },
          // { name: '上传', fn: 'up', ishow: row => row.id }
        ],
        tableItems: [
          { name: 'ID', prop: 'id' },
          { name: '节点名称', prop: 'nodeName' },
          { name: '答案', prop: 'content', html: true, handle: data => data.content },
          { name: '操作时间', prop: 'createtime' },
          { name: '是否展示', prop: 'display', handle: data => data.display ? '是' : '否' }
        ],
        editKeys: [
          { label: '标题', key: 'title' },
          { label: '内容', key: 'content', isEdt: true }
        ],
        seachOpt: { labId: query.tsid }
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
          { name: '展开', fn: 'spread' }
          // { name: '上传', fn: 'up', ishow: row => row.id }
        ],
        tableItems: [
          { name: '节点名称', prop: 'nodeName' },
          // { name: '实验采分点', prop: 'command' },
          { name: '采分点数量', prop: 'num' },
          { name: '总分值', prop: 'score', handle: data => { return (data.score || 0) + '分' } },
          { name: '操作时间', prop: 'createtime' }
        ],
        editKeys: [
          { label: '节点', key: 'nodeId', select: true, list: vm.testNodesData },
          { label: '采分点名称', key: 'title' },
          { label: '命令', key: 'command', textarea: true },
          { label: '分数', key: 'score', number: true }
        ],
        seachOpt: { labId: query.tsid }
      },
      testNodesData: [],
      // newAns: { labId: '', command: '', title: '',  },
      newAns: {},
      scorePoints: [{}],
      isAddScPoint: false
    }
  },
  created () {
    this.getNodes()
  },
  methods: {
    async spreadScorePoint (data) {
      let res = await this._fetch('/admin/labSpot/node', { nodeId: data.nodeId, labId: this.$route.query.tsid }, 'get')
      if (res && res.code === 1) {
        console.log(res);
        data.children = res.data || []
      } else {
        data.children = []
      }
      this.$forceUpdate()
    },
    downZhidao (data) {
      // window.open(data.content)
      let a = document.createElement('a');
      a.href = data.content
      a.target = '_blank'
      a.download = data.title
      a.style = "display: none;"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    editAns (row, arr) {
      this.newAns = { ...row, id: row.id + '' }
      this.isAddAns = true
    },
    async getNodes () {
      let res = await this._fetch('/api/lab/device/list', { path: this.$route.query.tsid }, 'get')
      if (res && res.code == 1 && res.data && res.data.topology && res.data.topology.nodes) {
        this.testNodesData = res.data.topology.nodes.node || []
        this.config3.editKeys[0].list = this.testNodesData.map(el => {
          let data = el
          data.label = el.name
          data.value = el.id
          return data
        })
      }
    },
    hadleEditItemFn1 (data, row) {
      let el = data
      el.labId = this.tsId
      return el
    },
    hadleEditItemFnPoint (data, row) {
      let item = data
      item.labId = this.tsId
      // console.log(el)
      item.nodeName = this.testNodesData.filter(el => el.id == item.nodeId)[0].name
      return item
    },
    searchTest () {
      this.config.seachOpt.name = this.searchStr.trim()
    },
    handleTabClick (tabVm) {
      console.log(tabVm)
    },
    async upSus (res) {
      // console.log(data)
      if (res.code == 1) {
        let file = res.data || {}
        let req = await this._fetch(this.config1.apis.add.url, {
          title: file.name || '', content: file.url || '', labId: this.tsId
        })
        if (req && req.code == 1) {
          this._messageTip(req.msg || '操作成功', 1)
          this.$refs.tp1._getList(1)
        }
      }
    },
    async addAnsFn () {
      let url = this.newAns.id ? '/admin/labAnswer/update' : '/admin/labAnswer/add'
      let testNodesData = this.testNodesData
      let nodeIds = testNodesData.map(el => el.id)
      // if (this.newAns.id) url = '/admin/labAnswer/update'
      let res = await this._fetch(url, { ...this.newAns, display: this.newAns.display || false, labId: this.tsId, nodeName: testNodesData[nodeIds.indexOf(this.newAns.nodeId)].name })
      if (res && res.code == 1) {
        this.isAddAns = false
        this.newAns = {}
        this.$refs.tp2._getList()
      }
    },
    async addScorePoint () {
      let testNodesData = this.testNodesData
      let nodeIds = testNodesData.map(el => el.id)
      // if (this.scorePoints.reduce((res, cur) => res + cur.score, 0) < 100) return this._messageTip('分数不足100')
      let spots = this.scorePoints.filter(el => el.nodeId).map(el => {
        return { ...el, labId: this.tsId, nodeName: testNodesData[nodeIds.indexOf(el.nodeId)].name }
      })
      // let res = await this._fetch('/admin/labSpot/add/batch', { spots: spots }, 'post')
      
      let res = await axios({
        method: 'post',
        url: this.reqBasic + '/admin/labSpot/add/batch',
        data: spots,
        headers: {
          'Content-type': 'application/json',
          token: localStorage.MToken || ''
        }
      });
      if (res && res.data && res.data.code == 1) {
        this._messageTip('添加成功', 1)
        this.isAddScPoint = false
        this.scorePoints = [{}]
        this.$refs.tp3._getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
