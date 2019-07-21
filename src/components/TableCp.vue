<template lang="pug">
  .table_cp
    el-table(:data="tableData" @row-click="(row, column, event) => { $emit('rowClick', row, column, event) }")
      //- slot header
      template(slot="header")
        slot(name="header")
      //- 多选
      el-table-column(type="selection" width="55" v-if="isChoose")
      //- 主展示区
      template(v-for="(item, i) in tableItems")
        //- img, 须配置 handle方法处理返回结果
        template(v-if="item.img")
          el-table-column(:label="item.name" :key="i")
            img(:src="item.handle ? item.handle(row, tableData) : item.prop")
        //- video, 须配置 handle方法处理返回结果
        template(v-else-if="item.video")
          el-table-column(:label="item.name" :key="i")
            video(:src="item.handle ? item.handle(row, tableData) : item.prop")
        //- html, 须配置 handle方法处理返回结果
        template(v-else-if="item.html")
          el-table-column(:label="item.name" :key="i")
            template(slot-scope="{row}" v-html="item.handle(row, tableData)")
        //- 需要显示处理后的数据的
        template(v-else-if="item.handle")
          el-table-column(:label="item.name" :key="i")
            template(slot-scope="{row}") {{item.handle(row, tableData)}}
        //- 直接显示
        template(v-else)
          el-table-column(:label="item.name" :prop="item.prop" :key="i")
      //- 操作区域
      el-table-column(label="操作" v-if="operates.length > 0")
        template(slot-scope="{row}")
          el-button(
            v-for="(op, idx) in operates" :key="idx"
            v-if="!op.ishow || op.ishow(row)"
            @click="handleOperate(op, row)"
          ) {{op.name}}
          slot(:data="row" :list="tableData" name="operate")
    //- 页码区域
    .table_cp_page
      el-pagination(
        @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper"
        :current-page="pageInfo.cur" :page-size="pageInfo.size" :total="pageInfo.total"
      )
    //- 编辑弹窗
    el-dialog(
      v-if="editKeys && editKeys.length"
    )
      el-form(v-model="curOperateRow")
        el-form-item(v-for="(item, i) in editKeys" :label="item.label" :key="i")
          el-select(v-model="curOperateRow[item.key]" v-if="item.select")
            el-option(
              v-for="(each, idx) in item.list" :key="idx"
              :label="each.label" :value="each.value"
            )
          el-radio-group(v-model="curOperateRow[item.key]" v-else-if="item.radio")
            el-radio(
              v-for="(each, idx) in item.list" :key="idx"
              :label="each.label" :value="each.value"
            )
          el-checkbox-group(v-model="curOperateRow[item.key]" v-else-if="item.checkbox")
            el-checkbox(
              v-for="(each, idx) in item.list" :key="idx"
              :label="each.label" :value="each.value"
            )
          el-input(v-else v-model="curOperateRow[item.key]")
</template>

<script>
/*
 *列表增删改查操作组件：
 *组件使用指南：
 *实例配置------------
 *config: {
 *  apis: {
 *     lis: '', add: '', del: '', edit: ''
 *  },
 *  tableItems: [
 *    { name: '小区名称', prop: 'nghdAddress', handle: (row, list) => row.succCount + '/' + row.allCount, img: true/video: true }, // 如果是展示 img/video时 img/video设置为true
 *  ],
 *  isChoose: false
 *  operates: [
 *    { name: '编辑', handleFn: 'edit', isShow: data => data.xxx, handleSelf: true } // isShow 需要判断展示的时候使用，可以不设置, handleSelf配置为true时 不使用组件内部的处理方法处理
 *  ]
 *}
 *------------
 */
export default {
  name: 'TableCp',
  props: {
    config: {
      apis: {},
      tableItems: [],
      isChoose: false,
      searchOpts: {},
      editKeys: []
    }
  },
  data () {
    let config = this._props.config || {}
    return {
      // props数据
      isChoose: false,
      editKeys: [],
      ...config,

      // 内部数据
      tableData: [],
      pageInfo: { cur: 1, size: 10, total: 0 },
      curOperateRow: null
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      let res = await this.fetch(this.apis.list, {
        pageSize: this.pageInfo.size,
        pageNum: this.pageInfo.cur,
        ...this.searchOpts
      })
      if (res.code === 0) {
        this.tableData = res.data.list || []
        this.pageInfo.total = res.data.total || 0
      }
    },
    handleOperate (op, row) {
      if (!op.handleSelf && this[op.fn] && typeof this[op.fn] === 'function') {
        this[op.fn](row, this.tableData)
      } else {
        this.$emit(op.fn, row, this.tableData)
      }
    },
    edit (row, list) {
      this.curOperateRow = JSON.parse(JSON.stringify(row))
    },
    handleSizeChange (v) {
      this.pageInfo.cur = 1
      this.pageInfo.size = v
      this.getList()
    },
    handleCurrentChange (v) {
      alert(v)
      this.pageInfo.cur = v
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.table_cp {
  .table_cp_page {
    margin-top: 20px;
  }
}
</style>
