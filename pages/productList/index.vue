<!--
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-21 14:12:49
-->
<template>
  <div>
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
    <!-- <a slot="action" slot-scope="text">action</a> -->
  </a-table>
  </div>
</template>
<script>
const columns = [
  { title: '标题', width: 100, dataIndex: 'title', key: 'title', fixed: 'left' },
  { title: '作者', width: 100, dataIndex: 'author', key: 'author', fixed: 'left' },
  { title: '状态', dataIndex: 'status', key: 'status', width: 150 },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 150 },
  { title: '点赞数量', dataIndex: 'likesNumber', key: 'likesNumber', width: 150 },
  { title: '最终审核人', dataIndex: 'finalReviewer', key: 'finalReviewer', width: 150 },
  { title: '发布时间', dataIndex: 'address', key: '5', width: 150 },
 
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' },
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
import {searchAll,searchAll1} from '@/api/product'
export default {
  data() {
    return {
      collapsed: false,
      data,
      columns,
    };
  },
  methods:{
    getTableList(){
      searchAll().then(res=>{
      console.log('请求接口all',res)
      if(res.status===200){
        this.data = res.data
      }
    })
    // searchAll1().then(res=>{
    //   console.log('请求接口all1',res)
    // })
    }
  },
  
  mounted(){
    this.getTableList()
  }
};
</script>
<style>

</style>