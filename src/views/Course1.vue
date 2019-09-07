<template lang="pug">
  .list
    TableCp(:config="config" :hadleEditItemFn="hadleEditItemFn" :selfEdit="selfEdit")
</template>

<script>
import TableCp from '@/components/TableCp'
export default {
  name: 'Course1',
  components: { TableCp },
  data () {
    return {
      type: 1,
      config: {
        apis: {
          list: {
            url: '/api/lab/list',
            data: [
              { name: 'CCNA' }
            ]
          }
        },
        seachOpt: {
          username: localStorage.EVENGFRONTUSER
        },
        // operates: [
        //   { name: '编辑', fn: 'edit' }
        // ],
        tableItems: [
          // { name: '序号', prop: 'contentDetaile' },
          { name: '实验名称', prop: 'name' }
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
