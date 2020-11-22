<template lang="pug">
  .list
    .page_top 实验{{csType == 1 ? '管理' : '教学'}}/
      //- span {{csName}}/{{tsName}}
      span {{tsName}}
      .fr
        span.btn(@click="pageBack") 返回

    el-tabs(v-model="activeName" type="card" @tab-click="handleTabClick" lazy)
      el-tab-pane(label="指导书管理" name="1")
        div
          .fr
            //-  :otherData="{ type: 1 }"
            Upload(name="上传指导书(pdf)" @upSus="upSus" accept=".pdf")
        TableCp(:config="config1" ref="tp1" :hadleEditItemFn="hadleEditItemFn1" @downZhidao="downZhidao")

      el-tab-pane(label="实验视频管理" name="2")
        div
          .fr
            //-  :otherData="{ type: 1 }"
            Upload(name="上传视频(mp4)" @upSus="upSus" accept=".mp4")
        TableCp(:config="config2" ref="tp2" :hadleEditItemFn="hadleEditItemFn1" @downZhidao="downZhidao")

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
    var query = this.$route.query
    var vm = this
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
        seachOpt: { labId: query.tsname, type: 0 },
        editKeys: [
          { label: '标题', key: 'title' },
          { label: '内容', key: 'content', isEdt: true }
        ]
      },
      config2: { // 指导书
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
        seachOpt: { labId: query.tsname, type: 1 },
        editKeys: [
          { label: '标题', key: 'title' },
          { label: '内容', key: 'content', isEdt: true }
        ]
      },
      searchStr: '',
      isAddAns: false,
      testNodesData: [],
      // newAns: { labId: '', command: '', title: '',  },
      newAns: {},
      scorePoints: [{}],
      isAddScPoint: false
    }
  },
  computed: {
    configRow () {
      var vm = this
      return data => {
        var row = data.row
        return {
          noPage: true,
          apis: {
            list: { url: '/admin/labSpot/node' },
            del: { url: '/admin/labSpot/delete' },
            add: { url: '/admin/labSpot/add' },
            edit: { url: '/admin/labSpot/update' }
          },
          operates: [
            { name: '编辑', fn: '_edit', ishow: row => row.id },
            { name: '删除', fn: '_del', ishow: row => row.id }
          ],
          tableItems: [
            { name: '采分点名称', prop: 'title' },
            { name: '采分点', prop: 'command' },
            { name: '采分点分值', prop: 'score', handle: data => { return (data.score || 0) + '分' } },
            { name: '操作时间', prop: 'createtime' }
          ],
          editKeys: [
            { label: '采分点名称', key: 'title' },
            { label: '命令', key: 'command', textarea: true },
            { label: '分数', key: 'score', number: true }
          ],
          seachOpt: { labId: vm.tsName, nodeId: row.nodeId }
        }
      }
    }
  },
  created () {
    // this.getNodes()
  },
  methods: {
    editSpreadItemRow (opt, row) {
      console.log(opt, row);
      opt.labId = row.labId
      opt.nodeId = row.nodeId
      opt.nodeName = row.nodeName
      return opt
    },
    // get
    async spreadScorePoint (data) {
      var res = await this._fetch('/admin/labSpot/node', { nodeId: data.nodeId, labId: this.$route.query.tsame }, 'get')
      if (res && res.code === 1) {
        console.log(res);
        data.children = res.data || []
      } else {
        data.children = []
      }
      console.log('this.$refs.tp3.tableData');
      console.log(this.$refs.tp3.tableData);
      this.$forceUpdate()
    },
    downZhidao (data) {
      // window.open(data.content)
      var a = document.createElement('a');
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
      let res = await this._fetch('/api/lab/device/list', { path: this.tsName }, 'get')
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
      el.labId = this.tsName
      return el
    },
    hadleEditItemFnPoint (data, row) {
      let item = data
      item.labId = this.tsName
      // console.log(el)
      item.nodeName = this.testNodesData.filter(el => el.id == item.nodeId)[0].name
      return item
    },
    searchTest () {
      this.config.seachOpt.name = this.searchStr.trim()
    },
    handleTabClick (tabVm) {
      // console.log(tabVm)
    },
    async upSus (res) {
      // console.log(data)
      if (res.code == 1) {
        let file = res.data || {}
        let req = await this._fetch(this.config1.apis.add.url, {
          title: file.name || '', content: file.url || '', labId: this.tsName, type: this.activeName == 1 ? 0 : 1
        })
        if (req && req.code == 1) {
          this._messageTip(req.msg || '操作成功', 1)
          if (this.activeName == 1) this.$refs.tp1._getList(1) // 指导书列表
          else if (this.activeName == 2) this.$refs.tp2._getList(1) // 视频列表
        }
      }
    },
    async addAnsFn () {
      let url = this.newAns.id ? '/admin/labAnswer/update' : '/admin/labAnswer/add'
      let testNodesData = this.testNodesData
      let nodeIds = testNodesData.map(el => el.id)
      // if (this.newAns.id) url = '/admin/labAnswer/update'
      let res = await this._fetch(url, { ...this.newAns, display: this.newAns.display || false, labId: this.tsName, nodeName: testNodesData[nodeIds.indexOf(this.newAns.nodeId)].name })
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
        return { ...el, labId: this.tsName, nodeName: testNodesData[nodeIds.indexOf(el.nodeId)].name }
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
      if (res && res.data) {
        let data = res.data
        if (data.code == 1) {
          this._messageTip('添加成功', 1)
          this.isAddScPoint = false
          this.scorePoints = [{}]
          this.$refs.tp3._getList()
        } else {
          this._messageTip(data.msg || '操作失败')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  ::v-deep .el-tabs {
    .el-tabs__content {
      .el-table__row {
        &.expanded {
          background: #409EFF;
          color: #fff;
        }
        &:hover {
          td {
            background: #409EFF;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
