<!--
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-25 17:22:56
-->
<template>
  <div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
      :pagination="false"
      size="small"
    >
      <div slot="action" slot-scope="row">
        <a-popconfirm
          title="是否确认要删除该数据？"
          ok-text="Yes"
          cancel-text="No"
          @confirm="()=>(deleteFun(row))"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>
        <a href="javascript:;" @click="()=>(editFun(row))">编辑</a>

      </div>

    </a-table>
    <div class="table-pagination">
      <a-pagination
        v-model="pageData.current"
        :page-size-options="pageSizeOptions"
        :total="pageData.total"
        show-size-changer
        :page-size="pageData.pageSize"
        @showSizeChange="onShowSizeChange"
      >
        <template slot="buildOptionText" slot-scope="props">
          <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
          <span v-if="props.value === '50'">全部</span>
        </template>
      </a-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "columns",
    "data",
    "selectChange",
    "deleteData",
    "pageData",
    "pageChange",
    "editModelShow"
  ],
  data() {
    return {
      selectedRowKeys: [],
      selectedRowId: [],
      pageSizeOptions: ["10", "20", "30", "40", "50"],
    };
  },
  methods: {
    onShowSizeChange(current, pageSize) {
      // this.pageSize = pageSize;
      this.$emit("pageChange", current, pageSize);
    },
    editFun(e){
      console.log('编辑数据',e)
      this.$emit('editModelShow',e)
    },
    deleteFun(e) {
      let parames = {
        _id: e["_id"],
      };
      this.$emit("deleteData", parames);
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      selectedRowKeys.forEach((element) => {
        this.selectedRowId.push(this.data[element]["_id"]);
      });
      this.$emit("selectChange", this.selectedRowId);
    },
  },
};
</script>
<style lang="less">
.table-pagination {
  padding-top: 10px;
  text-align: right;
}
</style>