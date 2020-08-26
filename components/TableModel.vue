<!--
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-25 17:22:56
-->
<template>
  <a-table
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    :columns="columns"
    :data-source="data"
    size="small"
  >
    <a slot="action" slot-scope="row" @click="()=>(deleteFun(row))">删除</a>
  </a-table>
</template>
<script>
export default {
  props:['columns','data','selectChange','deleteData'],
  data(){
    return{
      selectedRowKeys:[],
      selectedRowId:[]
    }
  },
  methods:{
    deleteFun(e){
       let parames = {
        _id: e["_id"],
      };
      this.$emit('deleteData',parames)
    },
    onSelectChange(selectedRowKeys){
      this.selectedRowKeys = selectedRowKeys;
      selectedRowKeys.forEach((element) => {
        this.selectedRowId.push(this.data[element]["_id"]);
      });
      this.$emit('selectChange',this.selectedRowId)
    }
  }
};
</script>