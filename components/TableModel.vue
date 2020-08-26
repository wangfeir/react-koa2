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
      <a slot="action" slot-scope="row" @click="()=>(deleteFun(row))">删除</a>
    </a-table>
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
</template>
<script>
export default {
  props: ["columns", "data", "selectChange", "deleteData","pageData"],
  data() {
    return {
      selectedRowKeys: [],
      selectedRowId: [],
            pageSizeOptions: ['10', '20', '30', '40', '50'],

    };
  },
  methods: {
    onShowSizeChange(current, pageSize) {
      // this.pageSize = pageSize;
      console.log('分页变化',current, pageSize)
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