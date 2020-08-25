<!--
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-21 14:12:49
-->
<template>
  <div>
    <TableSearch :columns="searchColumns" @search="handleSearch"/>
        <!-- <a-divider></a-divider> -->
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
      size="small"
    >
      <!-- <a slot="action" slot-scope="text">action</a> -->
    </a-table>
  </div>
</template>
<script>
const searchColumns = [
  {
    label:'标题',
    key:'title',
    type:'input',
    placeholder:"请输入标题",
    // defa
  },
  {
    label:'作者',
    key:'author',
    type:'input',
    placeholder:"请输入作者",
    // defa
  },
]
const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    fixed: "left",
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
    fixed: "left",
  },
  { title: "内容", dataIndex: "content", key: "content",  },
  { title: "状态", dataIndex: "status", key: "status", },
  { title: "创建时间", dataIndex: "createTime", key: "createTime",},
  {
    title: "点赞数量",
    dataIndex: "likesNumber",
    key: "likesNumber",
  },
  {
    title: "最终审核人",
    dataIndex: "finalReviewer",
    key: "finalReviewer",
  },
  { title: "发布时间", dataIndex: "address", key: "5",  },

  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" },
  },
];

import { searchAll } from "@/api/articleList";
import TableSearch from "@/components/TableSearch"
export default {
  components:{TableSearch},
  data() {
    return {
      collapsed: false,
      searchColumns,
      data:[],
      columns,
      selectedRowKeys: [],
    };
  },
  methods: {
    /**
     * 检索
     */
    handleSearch(e){
      console.log('搜索',e)
      searchAll(e).then((res) => {
        console.log("请求接口all", res);
        if (res.status === 200) {
          this.data = res.data;
        }
      });
    },
    onSelectChange(e) {
      console.log(e);
    },
    getTableList() {
      searchAll().then((res) => {
        console.log("请求接口all", res);
        if (res.status === 200) {
          this.data = res.data;
        }
      });
      // searchAll1().then(res=>{
      //   console.log('请求接口all1',res)
      // })
    },
  },

  mounted() {
    this.getTableList();
  },
};
</script>
<style>
</style>