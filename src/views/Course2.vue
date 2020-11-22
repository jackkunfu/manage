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
    let vm = this
    return {
      type: 2, // 1管理  2教学
      config: {
        apis: {
          // list: { url: '/api/lab/list', isList: true },
          list: { url: '/admin/lab/category', isList: true }
        },
        seachOpt: {
          // username: localStorage.EVENGFRONTUSER
        },
        // operates: [
        //   { name: '编辑', fn: 'edit' }
        // ],
        tableItems: [
          {
            name: '实验管理', prop: 'name', html: true,
            handle: row => {
              // console.log(vm.type)
              var name = row.category
              if (row.directory) return `<a href="/cslist?type=${vm.type}&csname=${ name }">${ name }</a>`
              else return `<a href="${vm.type == 1 ? '/testmanage' : '/Jiaoxue'}?type=${vm.type}&csname=实验&tsname=${ name }&tsid=${row.path}">${ name }</a>`
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
