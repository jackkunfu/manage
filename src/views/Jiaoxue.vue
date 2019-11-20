<template lang="pug">
  .list
    .page_top 实验{{csType == 1 ? '管理' : '教学'}}/
      span {{csName}}/{{tsName}}
      .fr
        span.btn(@click="pageBack") 返回
    el-tabs(v-model="activeName" type="card" @tab-click="handleTabClick")
      el-tab-pane(label="实验配置" name="1")
        //- el-input(placeholder="请输入实验名称搜索" v-model="searchStr")
          el-button(slot="append" @click="searchTest") 搜索
        div(style="margin-bottom: 20px;'")
          el-select(v-model="searchClassId" size="mini")
            el-option(v-for="(cls, i) in classList" :key="i" :label="cls.name" :value="cls.id")
          span.s_btn(@click="searchTp1") 搜索
          .fr
            el-button(size="mini" @click="redo" style="background: rgba(102, 204, 0, 1);color: #fff;") 重新批阅
            el-button(size="mini" @click="etPeizhi" style="background: rgba(60, 141, 188, 1);color: #fff;") 导出Excel
        TableCp(:config="config1" ref="tp1")
          template(slot="operate" slot-scope="row")
            Upload(name="上传" :url="reqBasic + '/admin/labGuide/add'" @upSus="upSus" :otherData="{ labId: row.labId }")

      el-tab-pane(label="实验报告" name="2")
        div(style="margin-bottom: 20px;'")
          el-select(v-model="searchClassId" size="mini")
            el-option(v-for="(cls, i) in classList" :key="i" :label="cls.name" :value="cls.id")
          span.s_btn(@click="searchTp2") 搜索
          .fr
            el-button(size="mini" @click="etBaogao" style="background: rgba(60, 141, 188, 1);color: #fff;") 导出Excel
        TableCp(:config="config2" ref="tp2" @setScore="setScore")
        el-dialog(:visible.sync="isEditScore" :before-close="closeSetScore")
          el-form(v-model="editScore" label-width="80px" size="mini")
            el-form-item(label="评分")
              el-input-number(v-model="editScore.score" placeholder="请输入分数" :min="0" :max="100")
            el-form-item(label="评语")
              el-input(v-model="editScore.content" placeholder="请输入评语")
          .op-btns
            el-button(@click="scoreAjax" size="mini") 确定
            el-button(@click="closeSetScore" size="mini") 取消

      el-tab-pane(label="数据统计" name="3")
        div(style="margin-bottom: 20px;'")
          el-select(v-model="searchClassId" size="mini")
            el-option(v-for="(cls, i) in classList" :key="i" :label="cls.name" :value="cls.id")
          span.s_btn(@click="searchTp3") 搜索
          .fr
        .bar(style="width: 300px;height: 300px;")
        .pie(style="width: 300px;height: 300px;")
        TableCp(:config="config3" ref="tp3")
</template>

<script>
import TableCp from '@/components/TableCp'
import Upload from '@/components/Upload'
import echarts from 'echarts'
// import Bar from 'echarts/lib/chart/bar'
// import Pie from 'echarts/lib/chart/pie'
// console.log(Bar)
// console.log(Pie)
export default {
  name: 'Jiaoxue',
  components: { TableCp, Upload },
  data () {
    let vm = this
    let query = this.$route.query
    return {
      csType: query.type, // 1管理  2教学
      csName: query.csname,
      tsName: query.tsname,
      tsId: query.tsid,
      activeName: '1',
      config1: { // 配置
        firstNoReq: true,
        apis: {
          list: { url: '/admin/labSpotReport/list' },
          del: { url: '/admin/labGuide/delete' },
          add: { url: '/admin/labGuide/add' },
          edit: { url: '/admin/labGuide/update' }
        },
        // operates: [
        //   { name: '编辑', fn: '_edit', ishow: row => row.id },
        //   { name: '删除', fn: '_del', ishow: row => row.id },
        //   // { name: '上传', fn: 'up', ishow: row => row.id }
        // ],
        tableItems: [
          { name: '学号', prop: 'sno', handle: data => { return data.student && data.student.sno || '' } },
          { name: '姓名', prop: 'name', handle: data => { return data.student && data.student.name || ''} },
          { name: '提交时间', prop: 'createtime' },
          { name: '得分', prop: 'score' }
        ],
        seachOpt: { cid: vm.searchClassId, labId: vm.tsId }
      },
      searchClassId: '',
      classList: [],
      searchStr: '',
      isEditScore: false,
      editScore: {},
      config2: { // 报告
        firstNoReq: true,
        apis: {
          list: { url: '/admin/labReport/list' },
          del: { url: '/admin/labReport/delete' },
          add: { url: '/admin/labReport/add' },
          edit: { url: '/admin/labReport/update' }
        },
        operates: [
          // { name: '编辑', fn: '_edit', ishow: row => row.id },
          { name: '删除', fn: '_del', ishow: row => row.id },
          { name: '打分评语', fn: 'setScore', ishow: row => row.id }
          // { name: '上传', fn: 'up', ishow: row => row.id }
        ],
        tableItems: [
          { name: '学号', prop: 'sno', handle: data => { return data.user && data.user.sno || '' } },
          { name: '姓名', prop: 'name', handle: data => { return data.user && data.user.name || '' } },
          { name: '报告', prop: 'url', html: true,
            handle: data => {
              // return data.user && data.user.name || ''
              let file = data.content
              let fileNameSps = file.split('/')
              let fn = (data.user && data.user.name || '') + fileNameSps[fileNameSps.length - 1]
              // return '<a href="' + file + '" download="' + fn + '" style="text-decoration: underline;">' + fn + '</a>'
              return '<a href="' + file + '" download="' + fn + '" style="text-decoration: underline;" target="_blank">下载报告</a>'
            }
          },
          { name: '提交时间', prop: 'createtime' },
          { name: '操作人', prop: 'score', handle: data => data.user && data.user.name || '' },
          { name: '实验报告打分', prop: 'score', handle: data => data.result && data.result.score || '' },
          { name: '评语', prop: 'score', handle: data => data.result && data.result.content || '' }
        ],
        seachOpt: { cid: vm.searchClassId, labId: vm.tsId }
      },
      config3: { // 数据统计
        firstNoReq: true,
        apis: {
          list: { url: '/admin/lab/statistics' }
        },
        // operates: [
        //   { name: '编辑', fn: '_edit', ishow: row => row.id },
        //   { name: '删除', fn: '_del', ishow: row => row.id },
        //   // { name: '上传', fn: 'up', ishow: row => row.id }
        // ],
        tableItems: [
          { name: '实验采分点', prop: 'title' },
          { name: '命令', prop: 'command' },
          { name: '分值', prop: 'score' },
          { name: '错误率', prop: 'errRate', handle: data => data.errRate + '%' }
        ],
        seachOpt: { cid: vm.searchClassId, labId: vm.tsId }
      }
    }
  },
  created () {
    this.getClassList()
  },
  mounted () {},
  watch: {
    async searchClassId (v) { // 班级改变，同时改变所有tab的数据
      let query = this.$route.query
      this.$refs.tp1.seachOpt = { cid: this.searchClassId, labId: query.tsid }
      this.$refs.tp1._getList(1)
      this.$refs.tp2.seachOpt = { cid: this.searchClassId, labId: query.tsid }
      this.$refs.tp2._getList(1)
      this.$refs.tp3.seachOpt = { cid: this.searchClassId, labId: query.tsid }
      var data = await this.$refs.tp3._getList(1)
      this.handleRef3Data(data)
    }
  },
  methods: {
    async redo () {
      let res = await this._fetch('/admin/labSpotReport/redo', { cid: this.searchClassId, labId: this.tsId }, 'post')
      if (res && res.code == 1) {
        this._messageTip(res.msg || '操作成功', 1)
      } else {
        this._messageTip(res.msg || '操作失败')
      }
    },
    async etPeizhi () {
      window.open(this.reqBasic + '/admin/labReport/export?cid=' + this.searchClassId + '&labId=' + this.tsId)

      // let res = await this._fetch('/admin/labReport/export', { cid: this.searchClassId, labId: this.tsId }, 'get')

      // let res = await axios.get(this.reqBasic + '/admin/labReport/export?cid=' + this.searchClassId + '&labId=' + this.tsId, { cid: this.searchClassId, labId: this.tsId }, { responseType: 'blob' })
      // axios.get(
      //   this.reqBasic + '/admin/labReport/export?cid=' + this.searchClassId + '&labId=' + this.tsId,
      //   { cid: this.searchClassId, labId: this.tsId },
      //   { responseType: 'stream', headers: { 'content-type': 'application/x-www-form-urlencoded' } }
      // ).then(res => {
      //   console.log('res')
      //   console.log(res)
      // })
      // let res = await axios({
      //   methods: 'get',
      //   url: this.reqBasic + '/admin/labSpotReport/export',
      //   params: { cid: this.searchClassId, labId: this.tsId },
      //   // responseType: 'blob',
      //   responseType: 'stream',
      //   // headers: { 'content-type': 'application/x-www-form-urlencoded' }
      //   // headers: {
      //   //   'Content-Type': 'application/json;'
          
      //   // }
      // })
      return
      console.log('res.data')
      console.log(res.data)
      if (res && res.code == 1) {
        // var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
        var blob = new Blob([res.data]);
        var downloadElement = document.createElement('a');
        var href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.style.display = 'none';
        downloadElement.href = href;
        downloadElement.download = filename ; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href);
      }
    },
    async etBaogao () {
      window.open(this.reqBasic + '/admin/labReport/export?cid=' + this.searchClassId + '&labId=' + this.tsId)
      // let res = await this._fetch('/admin/labReport/export', { cid: this.searchClassId, labId: this.tsId }, 'get')
      // let res = await axios.get(this.reqBasic + '/admin/labReport/export?cid=' + this.searchClassId + '&labId=' + this.tsId, { cid: this.searchClassId, labId: this.tsId }, { responseType: 'blob' })
      // if (res && res.code == 1) {

      // }
    },
    setScore (row) {
      this.isEditScore = true
      this.editScore = {
        resportId: row.id, score: row.result && row.result.score || 0, content: row.result && row.result.content || ''
      }
    },
    closeSetScore () {
      this.isEditScore = false
      this.editScore = {}
    },
    async scoreAjax () {
      let res = await this._fetch('/admin/labReportResult', this.editScore);
      if (res && res.code == 1) {
        this._messageTip(res.msg || '操作成功', 1)
        this.closeSetScore();
        this.$refs.tp2._getList();
      } else {
        this._messageTip(res.msg || '操作成功')
      }
    },
    chartSetData (dom, opts) {
      dom.setOption(opts)
    },
    handleRef3Data (res) {
      let data = res.data || {}
      this.$refs.tp3.tableData = data.spot || []
      this.$nextTick(() => {
        this.chartSetData(echarts.init(document.querySelector('.bar')), {
          xAxis: {
            type: 'category',
            data: data.spot.map(el => el.title)
          },
          yAxis: {
              type: 'value'
          },
          series: [{
            data: data.spot.map(el => el.num),
            type: 'line'
          }]
        })
        this.chartSetData(echarts.init(document.querySelector('.pie')), {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data.stat && data.stat.length ? Object.keys(data.stat[0]).map(el => {
                return { value: data.stat[0][el], name: el } 
              }) : []
              // [
              //   {value:335, name:'直接访问'},
              //   {value:310, name:'邮件营销'},
              //   {value:234, name:'联盟广告'},
              //   {value:135, name:'视频广告'},
              //   {value:1548, name:'搜索引擎'}
              // ]
            }
          ]
        })
      })
    },
    async getClassList () {
      let res = await this._fetch('/admin/classes/list', { pageNum: 1, pageSize: 100 }, 'get')
      if (res && res.code == 1 && res.data) {
        this.classList = res.data.list || []
        if (this.classList.length > 0) {
          this.searchClassId = this.classList[0].id
        }
      }
    },
    searchTest () {
      this.config.seachOpt.name = this.searchStr.trim()
    },
    handleTabClick (tabVm, a, b) {
      console.log(tabVm)
      console.log(a)
      console.log(b)
    },
    upSus () {
      this.searchTp1()
    },
    searchTp1 () {
      this.$refs.tp1._getList()
    },
    searchTp2 () {
      this.$refs.tp2._getList()
    },
    searchTp3 () {
      this.$refs.tp3._getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.s_btn {
  cursor: pointer;
  margin-left: 10px;
}
</style>
