<!--
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-21 14:12:49
-->
<template>
  <div>
    <TableSearch :columns="searchColumns" @search="handleSearch" />
    <a-row>
      <a-col span="12"></a-col>
      <a-col span="12"></a-col>
    </a-row>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="待审">
        <TableModel
          :columns="columns"
          :data="data"
          @selectChange="selectChange"
          @deleteData="deleteData"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="一审">
        <TableModel
          :columns="columns"
          :data="data"
          @selectChange="selectChange"
          @deleteData="deleteData"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="二审">
        <TableModel
          :columns="columns"
          :data="data"
          @selectChange="selectChange"
          @deleteData="deleteData"
        />
      </a-tab-pane>
      <a-tab-pane key="4" tab="终审">
        <TableModel
          :columns="columns"
          :data="data"
          @selectChange="selectChange"
          @deleteData="deleteData"
        />
      </a-tab-pane>
      <a-tab-pane key="5" tab="发布">
        <TableModel
          :columns="columns"
          :data="data"
          @selectChange="selectChange"
          @deleteData="deleteData"
        />
      </a-tab-pane>
      <a-tab-pane key="6" tab="全部">
        <TableModel
          :columns="columns"
          :data="data"
          @selectChange="selectChange"
          @deleteData="deleteData"
        />
      </a-tab-pane>
      <ul slot="tabBarExtraContent" class="tab-extra-btn">
        <li>
          <!-- 新增弹窗 -->
    <CreateDataModel
      :fromlist="createFromList"
      @refreshTable = "getTableList"
    />
        </li>
        <li>
          <a-button @click="deleteDatas">删除</a-button>
        </li>
        <li>
          <a-button>送审</a-button>
        </li>
        <li>
          <a-button>发布</a-button>
        </li>
      </ul>
    </a-tabs>
    
    <!-- <a-modal
      title="新增数据"
      :visible="visible"
      width="900px"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>111</p>
    </a-modal>-->
    <!-- <a-divider></a-divider> -->
  </div>
</template>
<script>
const searchColumns = [
  {
    label: "标题",
    key: "title",
    type: "input",
    placeholder: "请输入标题",
    // defa
  },
  {
    label: "作者",
    key: "author",
    type: "input",
    placeholder: "请输入作者",
    // defa
  },
];
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
  { title: "内容", dataIndex: "content", key: "content" },
  { title: "状态", dataIndex: "status", key: "status" },
  { title: "创建时间", dataIndex: "createTime", key: "createTime" },
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
  { title: "发布时间", dataIndex: "address", key: "5" },

  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" },
  },
];
const createFromList = [
  {
    label: "标题",
    key: "title",
    type: "input",
    placeholder: "请输入标题",
    required: true,
  },
  {
    label: "作者",
    key: "author",
    type: "input",
    placeholder: "请输入作者",
    required: true,
  },
  {
    label: "标签",
    key: "tab",
    type: "select",
    placeholder: "请输入标签",
    required: false,
    mode: "tags", // 是否多选
    selectOptions: [
      {
        label: "标签一",
        value: "标签一",
      },
      {
        label: "标签二",
        value: "标签二",
      },
      {
        label: "标签三",
        value: "标签三",
      },
    ],
  },
  {
    label: "类别",
    key: "category",
    type: "select",
    placeholder: "请选择类别",
    required: true,
    selectOptions: [
      {
        label: "类别一",
        value: "类别一",
      },
      {
        label: "类别二",
        value: "类别二",
      },
      {
        label: "类别三",
        value: "类别三",
      },
    ],
  },
  {
    label: "内容",
    key: "content",
    type: "textarea",
    placeholder: "请输入内容",
    required: true,
  },
];

import { searchAll, deleteServer } from "@/api/articleList";
import TableSearch from "@/components/TableSearch";
import CreateDataModel from "@/components/CreateDataModel";
import TableModel from "@/components/TableModel";
export default {
  components: { TableSearch, TableModel, CreateDataModel },
  data() {
    return {
      collapsed: false,
      // createVisible: false, // 创建弹窗显示控制
      // createConfirmLoading: false, // 创建弹窗loading控制
      createFromList, // 创建from表单内容绘制json
      searchColumns,
      data: [],
      columns,
      selectedRowKeys: [],
      selectedRowId: [],
      searchData: {
        type: "all",
        page: 1,
        size: 20,
      },
    };
  },
  methods: {
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      // setTimeout(() => {
      //   this.visible = false;
      //   this.confirmLoading = false;
      // }, 2000);
    },
    //
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    // 显示新增弹窗
    showModal() {
      this.createVisible = true;
    },
    // 删除单条数据
    deleteData(parames) {
      console.log("删除", parames);

      deleteServer(parames).then((res) => {
        if (res.status === 200) {
          this.$message.success("删除成功！");
          this.getTableList();
        }
      });
    },
    // 删除多条数据
    deleteDatas() {
      let parames = {
        _id: this.selectedRowId.join(),
      };
      // console.log('删除多条数据',parames)
      deleteServer(parames).then((res) => {
        if (res.status === 200) {
          this.$message.success("删除成功！");
          this.getTableList();
        }
      });
    },
    /**
     * 检索
     */
    handleSearch(e) {
      console.log("搜索", e);
      searchAll(e).then((res) => {
        console.log("请求接口all", res);
        if (res.status === 200) {
          this.data = res.data;
        }
      });
    },
    selectChange(selectedRowId) {
      this.selectedRowId = selectedRowId;
      console.log("selectedRowId", selectedRowId);
    },
    // onSelectChange(selectedRowKeys) {
    //   this.selectedRowKeys = selectedRowKeys;
    //   selectedRowKeys.forEach((element) => {
    //     this.selectedRowId.push(this.data[element]["_id"]);
    //   });
    //   console.log("element", this.selectedRowId);
    // },
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
<style lang="less">
.tab-extra-btn {
  li {
    list-style: none;
    display: inline-block;
    padding-right: 10px;
  }
}
</style>