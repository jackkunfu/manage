<template lang="pug">
  .list
    .page_top 实验{{csType == 1 ? '管理' : '教学'}}/
      //- span {{csName}}/{{tsName}}
      span {{tsName}}
      .fr
        el-button.btn(@click="pageBack" size="mini" type="primary") 返回

    el-tabs(v-model="activeName" type="card" @tab-click="handleTabClick" lazy)
      el-tab-pane(label="实验报告" name="1")
        div(style="margin-bottom: 20px;'")
          el-select(v-model="searchClassId" size="mini")
            el-option(v-for="(cls, i) in classList" :key="i" :label="cls.name" :value="cls.id")
          span.s_btn(@click="searchTp1") 搜索
          .fr
            el-button(size="mini" @click="etBaogao" style="background: #66b1ff;color: #fff;") 导出Excel
        TableCp(:config="config1" ref="tp1" @setScore="setScore")
        el-dialog(:visible.sync="isEditScore" :before-close="closeSetScore" :close-on-click-modal="false")
          el-form(v-model="editScore" label-width="80px" size="mini")
            el-form-item(label="评分")
              el-input-number(v-model="editScore.score" placeholder="请输入分数" :min="0" :max="100")
            //- el-form-item(label="评语")
              el-input(v-model="editScore.content" placeholder="请输入评语")
          .op-btns
            el-button(@click="scoreAjax" size="mini") 确定
            el-button(@click="closeSetScore" size="mini") 取消

      el-tab-pane(label="数据统计" name="2")
        div(style="margin-bottom: 20px;'")
          el-select(v-model="searchClassId" size="mini")
            el-option(v-for="(cls, i) in classList" :key="i" :label="cls.name" :value="cls.id")
          span.s_btn(@click="searchTp2") 搜索
          .fr
        div 成绩分布统计
        .bar.chart
        TableCp(:config="config2" ref="tp2" style="display: none;")
        //- div(style="margin-bottom: 20px;") 采分点错误率统计
        //- .pie.chart
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
      searchClassId: '',
      classList: [],
      searchStr: '',
      isEditScore: false,
      editScore: {},
      config1: { // 报告
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
          { name: '打分', fn: 'setScore', ishow: row => row.id }
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
          // { name: '实验操作打分', prop: 'opScore', handle: data => data.result && data.result.opScore || '' },
          { name: '实验操作打分', prop: 'opScore', handle: data => data.opScore ? data.opScore.toFixed(1) : 0 },
          { name: '实验报告打分', prop: 'score', handle: data => data.result && data.result.score || '' },
          // { name: '评语', prop: 'score', handle: data => data.result && data.result.content || '' }
        ],
        seachOpt: { cid: vm.searchClassId, labId: vm.tsName }
      },
      config2: { // 数据统计
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
        seachOpt: { cid: vm.searchClassId, labId: vm.tsName }
      }
    }
  },
  created () {
    this.getClassList()
  },
  mounted () {},
  watch: {
    async searchClassId (v) { // 班级改变，同时改变所有tab的数据
      let labId = this.tsName
      this.$refs.tp1.seachOpt = { cid: this.searchClassId, labId: labId }
      this.$refs.tp1._getList(1)
      this.$refs.tp2.seachOpt = { cid: this.searchClassId, labId: labId }
      var data = await this.$refs.tp2._getList(1)
      this.handleRef2Data(data)
    }
  },
  methods: {
    handleList (list) {
      list = list.sort((a, b) => b.errRate - a.errRate)
      return list.map(el => {
        el.errRate = el.errRate % 1 > 0 ? el.errRate.toFxed(1) : el.errRate
        return el
      })
    },
    async redo () {
      let res = await this._fetch('/admin/labSpotReport/redo', { cid: this.searchClassId, labId: this.tsName }, 'post')
      if (res && res.code == 1) {
        this._messageTip(res.msg || '操作成功', 1)
        this.$refs.tp1._getList(1)
      } else {
        this._messageTip(res.msg || '操作失败')
      }
    },
    async etPeizhi () {
      window.open(this.reqBasic + '/admin/labReport/export?cid=' + this.searchClassId + '&labId=' + this.tsName)

      // let labId = this.tsName
      // let res = await this._fetch('/admin/labReport/export', { cid: this.searchClassId, labId: labId }, 'get')

      // let res = await axios.get(this.reqBasic + '/admin/labReport/export?cid=' + this.searchClassId + '&labId=' + labId, { cid: this.searchClassId, labId: labId }, { responseType: 'blob' })
      // axios.get(
      //   this.reqBasic + '/admin/labReport/export?cid=' + this.searchClassId + '&labId=' + labId,
      //   { cid: this.searchClassId, labId: labId },
      //   { responseType: 'stream', headers: { 'content-type': 'application/x-www-form-urlencoded' } }
      // ).then(res => {
      //   console.log('res')
      //   console.log(res)
      // })
      // let res = await axios({
      //   methods: 'get',
      //   url: this.reqBasic + '/admin/labSpotReport/export',
      //   params: { cid: this.searchClassId, labId: labId },
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
      window.open(this.reqBasic + '/admin/labReport/export?cid=' + this.searchClassId + '&labId=' + this.tsName)
      // let labId = this.tsName
      // let res = await this._fetch('/admin/labReport/export', { cid: this.searchClassId, labId: labId }, 'get')
      // let res = await axios.get(this.reqBasic + '/admin/labReport/export?cid=' + this.searchClassId + '&labId=' + labId, { cid: this.searchClassId, labId: labId }, { responseType: 'blob' })
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
        this.$refs.tp1._getList();
      } else {
        this._messageTip(res.msg || '操作成功')
      }
    },
    chartSetData (dom, opts) {
      dom.setOption(opts)
    },
    handleRef2Data (res) {
      let data = res.data || {}
      this.$refs.tp2.tableData = this.handleList(data.spot || [])
      this.$nextTick(() => {
        let stat = (data.stat || [])[0] || {}
        let xx = ['0-59', '60-69', '70-79', '80-89', '90-100']
        let yy = [stat.lv1 || 0, stat.lv2 || 0, stat.lv3 || 0, stat.lv4 || 0, stat.lv5 || 0]
        let all = eval(yy.join('+'))
        console.log('all:', all);
        this.chartSetData(echarts.init(document.querySelector('.bar')), {
          xAxis: {
            type: 'category',
            axisTick: { alignWithLabel: true },
            data: xx
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' },
            formatter: (a, b, c) => {
              let data = a[0]
              return `${data.name}分 \n ${data.data}人，占${(data.data / all * 100).toFixed(1)}%`
            }
          },
          grid: { top: '6%' },
          yAxis: { type: 'value', max: all },
          series: [{
            data: yy,
            barWidth: '40%',
            type: 'bar'
          }]
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
      // console.log(tabVm)
      // console.log(a)
      // console.log(b)
    },
    upSus () {
      this.searchTp1()
    },
    searchTp1 () {
      this.$refs.tp1._getList()
    },
    searchTp2 () {
      this.$refs.tp2._getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 1100px;
  height: 500px;
}
.s_btn {
  display: inline-block;
  width: 80px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
  margin-left: 0;
  background: #66b1ff;
  color: #fff;
  font-size: 12px;
}
</style>
