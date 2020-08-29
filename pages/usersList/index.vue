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

    <TableModel
      :columns="columns"
      :data="tableData['all'].data"
      :pageData="tableData['all']"
      @selectChange="selectChange"
      @deleteData="deleteData"
      @pageChange="pageChange"
      @editModelShow="editShow"
      :loading="tableLoading"
    />
    <!-- 编辑数据弹窗 -->
    <EditDataModel
      :fromlist="editFromList"
      :visible="editVisible"
      :editData="editData"
      @hide="editHide"
      @refreshTable="getTableList"
    />
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
    title: "帐号",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  { title: "手机号码", dataIndex: "phone", key: "phone" },
  { title: "权限", dataIndex: "power", key: "power" },
  { title: "邮箱", dataIndex: "email", key: "email" },
  {
    title: "最近登陆时间",
    dataIndex: "logingTime",
    key: "logingTime",
    scopedSlots: { customRender: "date" },
  },
  {
    title: "Action",
    key: "operation",
    // fixed: "right",
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
const editFromList = [
  {
    label: "id",
    key: "_id",
    type: "input",
    placeholder: "请输入标题",
    required: true,
    hide: true,
  },
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
import EditDataModel from "@/components/EditDataModel";
import TableModel from "@/components/TableModel";
export default {
  components: { TableSearch, TableModel, CreateDataModel, EditDataModel },
  data() {
    return {
      collapsed: false,
      editVisible: false, // 编辑弹窗显示控制
      editData: {}, // 编辑弹窗的默认数据
      // createConfirmLoading: false, // 创建弹窗loading控制
      createFromList, // 创建from表单内容绘制json
      editFromList,
      tableLoading: false,
      searchColumns,
      data: [],
      tableData: {
        create: { current: 1, pageSize: 20 },
        examineOne: { current: 1, pageSize: 20 },
        examineTwo: { current: 1, pageSize: 20 },
        examineFinal: { current: 1, pageSize: 20 },
        publish: { current: 1, pageSize: 20 },
        all: { current: 1, pageSize: 20 },
      },
      columns,
      selectedRowKeys: [],
      selectedRowId: {
        create: [],
        examineOne: [],
        examineTwo: [],
        examineFinal: [],
        publish: [],
        all: [],
      },
      searchData: {
        status: "",
        data: {},
        current: 1,
        pageSize: 20,
        total: 0,
      },
    };
  },
  methods: {
    editShow(row) {
      this.editVisible = true;
      this.editData = row;
    },
    editHide() {
      this.editVisible = false;
    },
    // 分页切换
    pageChange(current, pageSize) {
      console.log("分页变化", current, pageSize);
      let status = this.searchData.status ? this.searchData.status : "all";

      this.tableData[status].current = current;
      this.tableData[status].pageSize = pageSize;
      this.getTableList();
    },
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
      let status = this.searchData.status ? this.searchData.status : "all";
      let parames = {
        _id: this.selectedRowId[status].join(),
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
      this.searchData.data = e;
      this.searchData.page = 1;
      this.getTableList();
      // searchAll(e).then((res) => {
      //   console.log("请求接口all", res);
      //   if (res.status === 200) {
      //     this.data = res.data;
      //   }
      // });
    },
    selectChange(selectedRowId) {
      // this.selectedRowId = selectedRowId;
      let status = this.searchData.status ? this.searchData.status : "all";
      this.selectedRowId[status] = selectedRowId;
      console.log("selectedRowId", selectedRowId);
    },
    getTableList() {
      this.tableLoading = true;
      let status = this.searchData.status ? this.searchData.status : "all";

      if (this.tableData[status].current) {
        this.searchData.current = this.tableData[status].current;
        this.searchData.pageSize = this.tableData[status].pageSize;
      } else {
        this.searchData.current = 1;
        this.searchData.pageSize = 20;
      }
      searchAll(this.searchData)
        .then((res) => {
          console.log("请求接口all", res);
          if (res.status === 200) {
            let status = this.searchData.status
              ? this.searchData.status
              : "all";
            this.tableData[status] = res;
            this.data = res.data;
            this.searchData.total = res.total;
          } else {
            this.$message.warning("获取列表错误！");
          }
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
          this.$message.error("获取列表错误！");
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