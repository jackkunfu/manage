<template lang="pug">
  .list
    .page_top 实验{{csType == 1 ? '管理' : '教学'}}/
      span {{csname}}
      .fr
        span.btn(@click="pageBack") 返回
    TableCp(ref="tbcp" :config="config" :hadleEditItemFn="hadleEditItemFn" :selfEdit="selfEdit")
</template>

<script>
import TableCp from '@/components/TableCp'
export default {
  name: 'Course1',
  components: { TableCp },
  data () {
    let query = this.$route.query
    return {
      type: query.type,
      csType: query.type, // 1管理  2教学
      csname: query.csname,
      config: {
        apis: {
          list: { url: '/admin/lab/list', isList: true }
        },
        seachOpt: {
          path: '/opt/unetlab/labs/' + query.csname
        },
        // operates: [
        //   { name: '编辑', fn: 'edit' }
        // ],
        tableItems: [
          {
            name: '实验名称', prop: 'name', html: true,
            handle: row => {
              return `<a href="/testmanage?type=${query.type}&csname=${query.csname}&tsname=${row.name}&tsid=${row.path}">${row.name}</a>`
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
