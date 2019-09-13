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
            el-option(v-for="(cls, i) in classList" :key="i" :label="cls.name" :value="cls.name")
          span(@click="searchTp1" style="margin-left: 10px;") 搜索
          .fr
            el-button(size="mini") 重新批阅
            el-button(size="mini") 导出Excel
        TableCp(:config="config1" ref="tp1")
          template(slot="operate" slot-scope="row")
            Upload( name="上传" url="/api/admin/labGuide/add" @upSus="upSus" :otherData="{ labId: row.labId }")

      el-tab-pane(label="实验报告" name="2")
        div(style="margin-bottom: 20px;'")
          el-select(v-model="searchClassId" size="mini")
            el-option(v-for="(cls, i) in classList" :key="i" :label="cls.name" :value="cls.name")
          span(@click="searchTp1" style="margin-left: 10px;") 搜索
        TableCp(:config="config2")

      el-tab-pane(label="数据统计" name="3")
        div(style="margin-bottom: 20px;'")
          el-select(v-model="searchClassId" size="mini")
            el-option(v-for="(cls, i) in classList" :key="i" :label="cls.name" :value="cls.name")
          span(@click="searchTp1" style="margin-left: 10px;") 搜索
          .fr
            el-button(size="mini") 导出Excel
        .bar(style="width: 300px;height: 300px;")
        .pie(style="width: 300px;height: 300px;")
        TableCp(:config="config3")
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
  name: 'TestManage',
  components: { TableCp, Upload },
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
          { name: '实验指导书', prop: 'nghdAddress' },
          { name: '作者', prop: 'createBy' },
          { name: '上传时间', prop: 'createtime' }
        ],
        seachOpt: { cid: this.searchClassId }
      },
      searchClassId: '',
      classList: [],
      searchStr: '',
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
        seachOpt: { cid: this.searchClassId }
      },
      config3: { // 数据统计
        apis: {
          list: { url: '/admin/lab/statistics' }
        },
        // operates: [
        //   { name: '编辑', fn: '_edit', ishow: row => row.id },
        //   { name: '删除', fn: '_del', ishow: row => row.id },
        //   // { name: '上传', fn: 'up', ishow: row => row.id }
        // ],
        tableItems: [
          { name: '实验采分点', prop: 'nghdAddress' },
          { name: '命令', prop: 'command' },
          { name: '分值', prop: 'score' },
          { name: '错误率', prop: 'nghdAddress' }
        ],
        seachOpt: { cid: this.searchClassId }
      }
    }
  },
  created () {
    this.getClassList()
  },
  mounted () {
    var barChart = echarts.init(document.querySelector('.bar'))
    var pieChart = echarts.init(document.querySelector('.pie'))
    console.log(barChart)
    console.log(pieChart)
    barChart.setOption({
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }]
    })
  },
  methods: {
    async getClassList () {
      let res = await this._fetch('/admin/classes/list', { pageNum: 1, pageSize: 100 }, 'get')
      if (res && res.code == 1 && res.data) {
        this.classList = res.data.list || []
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
    searchTp1 () {
      this.$refs.tp1._getList();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
