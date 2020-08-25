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
    <a-button>送审</a-button>
    <a-button @click="deleteDatas">删除</a-button>
    <a-button>发布</a-button>
        <!-- <a-divider></a-divider> -->
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
      size="small"
    >
      <a slot="action" slot-scope="row" @click="()=>(deleteData(row))">删除</a>
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

import { searchAll,deleteServer } from "@/api/articleList";
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
      selectedRowId:[],
      searchData:{
        page:1,
        size:20,
      }
    };
  },
  methods: {
    // 删除单条数据
    deleteData(e){
      console.log('删除',e)
      let parames = {
        '_id':e['_id']
      }
      deleteServer(parames).then(res=>{
        if(res.status===200){
          this.$message.success('删除成功！')
          this.getTableList()
        }
      })

    },
    // 删除多条数据
    deleteDatas(){
      let parames = {
        '_id':this.selectedRowId.join()
      }
      // console.log('删除多条数据',parames)
      deleteServer(parames).then(res=>{
        if(res.status===200){
          this.$message.success('删除成功！')
          this.getTableList()
        }
      })
    },
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
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      selectedRowKeys.forEach(element => {
        this.selectedRowId.push(this.data[element]['_id'])
      });
        console.log('element',this.selectedRowId)

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