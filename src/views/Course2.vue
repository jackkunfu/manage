<template lang="pug">
  .list
    TableCp(ref="tbcp" :config="config" :hadleEditItemFn="hadleEditItemFn" :selfEdit="selfEdit")
</template>

<script>
import TableCp from '@/components/TableCp'
export default {
  name: 'Course1',
  components: { TableCp },
  data () {
    return {
      type: 2, // 1管理  2教学
      config: {
        apis: {
          list: { url: '/api/lab/list', isList: true }
        },
        seachOpt: {
          // username: localStorage.EVENGFRONTUSER
        },
        // operates: [
        //   { name: '编辑', fn: 'edit' }
        // ],
        tableItems: [
          {
            name: '实验名称', prop: 'name', html: true,
            handle: row => {
              if (row.directory) return `<a href="/cslist?type=${this.type}&csname=${row.name}">${row.name}</a>`
              else return `<a href="${this.type == 1 ? '/testmanage' : '/Jiaoxue'}?type=${this.type}&csname=实验&tsname=${row.name}&tsid=${row.path}">${row.name}</a>`
            }
          }
        ],
        // editKeys: [
        //   { label: '消息内容', key: 'contentDetaile' },
        //   { label: '下发进度', key: 'contentType', select: true, list: [] }
        // ]
      }
    }
  },
  created () {
  },
  watch: {
    '$route.query.type' (v) {
      this.$refs.tbcp._getList();
    }
  },
  methods: {
    hadleEditItemFn (data, item) { // 需要再次处理edit请求参数的时候配置此数据
      console.log(data) // 当前编辑的数据
      console.log(item) // 原数据所有数据
      return data
    },
    selfEdit (item) { // 点击编辑按钮时，展示的内容可能需要再次处理下的 在此方法里再次处理下
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
