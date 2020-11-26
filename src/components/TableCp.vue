<template lang="pug">
  .table_cp
    el-table(:data="tableData" @row-click="(row, column, event) => { $emit('rowClick', row, column, event) }" @sort-change="sortChange")
      //- slot header
      template(slot="header")
        slot(name="header")

      el-table-column(type="expand" v-if="config.isExpand")
        template(slot-scope="{row}")
          //- slot(:name="'expand'+row.nodeName" :row="row")
          slot(name="expand" :row="row")

      el-table-column(type="index" v-if="config.tbIndex")
      
      //- 多选
      el-table-column(type="selection" width="55" v-if="isChoose")
      //- 主展示区
      template(v-for="(item, i) in tableItems")
        //- img, 须配置 handle方法处理返回结果
        template(v-if="item.img")
          el-table-column(:label="item.name" :key="i")
            img(slot-scope="{row}" :src="item.handle ? item.handle(row, tableData) : row[item.prop]" style="height: 100px;")
        //- video, 须配置 handle方法处理返回结果
        template(v-else-if="item.video")
          el-table-column(:label="item.name" :key="i")
            video(slot-scope="{row}" :src="item.handle ? item.handle(row, tableData) : row[item.prop]" style="height: 100px;")
        //- html, 须配置 handle方法处理返回结果
        template(v-else-if="item.html")
          el-table-column(:label="item.name" :key="i")
            div(slot-scope="{row}" v-html="item.handle(row, tableData)")
        //- 需要显示处理后的数据的
        template(v-else-if="item.handle")
          el-table-column(:label="item.name" :key="i" :sortable="item.sortable" :prop="item.prop")
            template(slot-scope="{row}") {{item.handle(row, tableData)}}
        //- 直接显示
        template(v-else)
          el-table-column(:label="item.name" :prop="item.prop" :key="i" :sortable="item.sortable")
      //- 操作区域
      el-table-column(label="操作" v-if="operates.length > 0" :width="operates.length*100")
        template(slot-scope="{row}")
          el-button(
            size="mini" style="margin-bottom： 10px;"
            v-for="(op, idx) in operates" :key="idx"
            v-if="!op.ishow || op.ishow(row)"
            @click="_handleOperate(op, row)"
          ) {{op.name}}
          slot(:data="row" :list="tableData" name="operate")
    //- 页码区域
    .table_cp_page(v-if="!config.noPage")
      el-pagination(
        @size-change="_handleSizeChange" @current-change="_handleCurrentChange"
        :page-sizes="[2, 10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
        :current-page="pageInfo.cur" :page-size="pageInfo.size" :total="pageInfo.total"
      )
    //- 编辑弹窗
    el-dialog(
      :visible.sync="editVisible" :before-close="_handleEditClose"
      v-if="editKeys && editKeys.length && editVisible" :close-on-click-modal="false"
    )
      el-form(v-model="curOperateRow" label-width="80px" size="mini")
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
          el-switch(v-else-if="item.switch" v-model="curOperateRow[item.key]")
          el-input-number(v-else-if="item.number" v-model="curOperateRow[item.key]")
          el-input(v-else-if="item.textarea" type="textarea" v-model="curOperateRow[item.key]")
          //- Wangeditor(v-else-if="item.isEdt" v-model="curOperateRow[item.key]")
          QuillEditorVue(v-else-if="item.isEdt" v-model="curOperateRow[item.key]")
          div(v-else-if="item.upload")
            .up-img(v-if="curOperateRow[item.key]")
              img(:src="curOperateRow[item.key]")
              i.el-icon-close.del(@click="curOperateRow[item.key] = ''")
            el-upload(
              v-else
              v-model="curOperateRow[item.key]" :limit="1"
              :action="reqBasic + '/admin/file/upload'" accept="image/jpg,image/jpeg,image/png"
              :on-success="data => upSus(data, item)"
            )
              el-button(size="mini") 点击上传
          el-input(v-else v-model="curOperateRow[item.key]" placeholder="请输入")
      .op-btns
        el-button(@click="_editSure") 确定
        el-button(@click="_handleEditClose") 取消
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
import Wangeditor from '@/components/Wangeditor.vue'
import QuillEditorVue from '@/components/quillEditorVue.vue'
export default {
  name: 'TableCp',
  components: { Wangeditor, QuillEditorVue },
  props: {
    config: {
      apis: {},
      tableItems: [],
      isChoose: false,
      seachOpt: {},
      operates: [],
      editKeys: [],
      tbIndex: false
    },
    hadleEditItemFn: Function,
    selfEdit: Function,
    selfAdd: Function,
    editCheck: Function,
    handleList: Function
  },
  data () {
    let config = this._props.config || {}
    // console.log(config)
    return {
      // props数据
      isChoose: false,
      editKeys: [],
      seachOpt: {},
      operates: [],
      ...config,

      // 内部数据
      tableData: [],
      pageInfo: { cur: 1, size: 10, total: 0 },
      curOperateRow: {},
      editVisible: false,
      isAdd: false, // 是否是新增， 新增和编辑走同一个逻辑， 以此区分  this.$refs.tp.isAdd = true
      upFileList: []
    }
  },
  created () {
    if (!this.config.firstNoReq) this._getList()
  },
  watch: {
    isAdd (v) {
      if (v) this._edit() // 外部改变 isAdd 为 true 时 显示新增编辑弹窗
    }
  },
  methods: {
    sortChange () {
      this.$emit('sortChange', arguments[0] || {})
    },
    upSus (res, item) {
      // console.log(res, item);
      if (res && res.code === 1) {
        this.curOperateRow[item.key] = (res.data || {}).url || ''
        this.$forceUpdate()
      }
    },
    async _getList (p, otherOpts) {
      let listApi = this.apis.list || {}
      if (listApi.data && listApi.data.length) {
        this.tableData = listApi.data
        return
      }
      this.seachOpt = { ...this.seachOpt, ...(otherOpts || {}) }
      if (p) this.pageInfo.cur = p
      if (this.config.noPage) this.pageInfo.size = 1000
      let res = await this._fetch(this.apis.list.url, {
        pageSize: this.pageInfo.size,
        pageNum: this.pageInfo.cur,
        ...this.seachOpt,
      }, this.apis.list.type || 'get')
      if (res && res.code === 1 && res.data) {
        let isDataList = Object.prototype.toString.call(res.data) === '[object Array]'
        let list = isDataList ? (res.data || []) : (res.data.list || [])
        // console.log(list);
        this.tableData = this.handleList ? this.handleList(list) : list
        this.pageInfo.total = res.data.total || 0
      }
      return res // 暴漏给外部使用
    },
    _handleOperate (op, row) {
      if (!op.handleSelf && this[op.fn] && typeof this[op.fn] === 'function') {
        this[op.fn](row, this.tableData)
        this.$emit(op.fn, row, this.tableData)
      } else {
        this.$emit(op.fn, row, this.tableData)
      }
    },
    _edit (row, list) {
      if (!this.isAdd) { // 编辑时可能需要走的步骤
        this.curOperateRow = JSON.parse(JSON.stringify(row))
        this.selfEdit && typeof this.selfEdit === 'function' && this.selfEdit(row, this.curOperateRow)
      } else {
        this.selfAdd && typeof this.selfAdd === 'function' && this.selfAdd(row, this.curOperateRow)
      }
      this.editVisible = true
    },
    _handleEditClose () {
      this.curOperateRow = {}
      this.editVisible = false
      if (this.isAdd) this.isAdd = false
    },
    _getEditParam () {
      let data = {}
      this.editKeys.forEach(el => {
        data[el.key] = this.curOperateRow[el.key]
      })
      if (!this.isAdd) {
        let key = this.apis.edit.idKey || 'id'
        data[key] = this.curOperateRow[key]
      }
      return data
    },
    async _editSure () {
      if (this.editCheck) { // 输入验证提示
        let checkData = this.editCheck()
        if (!checkData.ok) return this._messageTip(checkData.msg)
      }
      let params = this._getEditParam()
      let op = this.isAdd ? 'add' : 'edit'
      let { url, type } = this.apis[op]
      let hadleEditItemFn = this.hadleEditItemFn
      let res = await this._fetch(
        url,
        hadleEditItemFn && typeof hadleEditItemFn === 'function' ? hadleEditItemFn(params, this.curOperateRow) : params,
        type || 'post'
      )
      if (res && res.code === 1) {
        this._handleEditClose()
        this._getList()
        this._messageTip(res.msg || '操作成功', 1)
      } else {
        this._messageTip((res && res.msg) || '请求失败')
      }
    },
    _handleSizeChange (v) {
      this.pageInfo.cur = 1
      this.pageInfo.size = v
      this._getList()
    },
    _handleCurrentChange (v) {
      this.pageInfo.cur = v
      this._getList()
    },
    _del (row) {
      this._confirm('确定删除?').then(async _ => {
        let key = this.apis.del.idKey ? this.apis.del.idKey : 'id'
        let data = {}
        data[key] = row[key]
        let res = await this._fetch(this.apis.del.url, data, this.apis.del.type || 'post')
        if (res && res.code === 1) {
          this._messageTip(res.msg || '操作成功', 1)
          this._getList()
        } else this._messageTip(res.msg || '操作失败')
      })
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
.op-btns {
  text-align: center;
  margin-top: 20px;
}
.up-img {
  img {
    max-width: 90%;
    height: 100px;
  }
  .del {
    cursor: pointer;
    color: red;
    font-size: 20px;
    vertical-align: top;
  }
}
</style>
