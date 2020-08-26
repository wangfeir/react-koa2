<!--
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-26 13:17:31
-->
<template>

  <div>
  <a-button  type="primary" @click="showModal">新增</a-button>

    <a-modal
    title="新增数据"
    :visible="visible"
    width="900px"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item v-for="(item,index) in fromlist" :key="index" :label="item.label">
        <a-input
          v-if="item.type==='input'"
          :placeholder="item.placeholder"
          v-decorator="[`${item.key}`,{
            rules:[{
              required:item.required,
              message:item.placeholder
            }]
          }]"
        />
        <!-- 选择框 -->
        <a-select
          v-if="item.type==='select'"
          :mode="item.mode"
          show-search
          :placeholder="item.placeholder"
          v-decorator="[`${item.key}`,{
            rules:[{
              required:item.required,
              message:item.placeholder
            }]
          }]"
        >
          <a-select-option
            v-for="(option,index) in item.selectOptions"
            :key="index"
            :value="option.value"
          >{{option.label}}</a-select-option>
        </a-select>

        <a-textarea
          v-if="item.type==='textarea'"

          :placeholder="item.placeholder"
          :rows="4"
          v-decorator="[`${item.key}`,{
            rules:[{
              required:item.required,
              message:item.placeholder
            }]
          }]"
        />
      </a-form-item>
      <!-- <a-form-item label="Note" >
        <a-input
          v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item label="Gender">
        <a-select
          v-decorator="[
          'gender',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]"
          placeholder="Select a option and change input text above"
          @change="handleSelectChange"
        >
          <a-select-option value="male">male</a-select-option>
          <a-select-option value="female">female</a-select-option>
        </a-select>
      </a-form-item>-->
      <!-- <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
      </a-form-item>-->
    </a-form>
  </a-modal>
  </div>
  
</template>
<script>
import { createData } from "@/api/global";

export default {
  props: ["fromlist","refreshTable"],
  data() {
    return {
      visible:false,
      confirmLoading:false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "createDataForm" }),
    };
  },
  methods: {
    // 显示新增弹窗
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true;
          values.tab = values.tab?.join(',')
          console.log("Received values of form: ", values);
          createData(values).then(res=>{
            if(res.status === 200){
              console.log('保存成功',res)
              this.confirmLoading = false;
              this.visible = false;
              this.$emit('refreshTable')
            }
          })
          
        }
      });
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
    // handleSubmit(e) {
    //   e.preventDefault();
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log('Received values of form: ', values);
    //     }
    //   });
    // },
    handleSelectChange(value) {
      console.log(value);

      // this.form.setFieldsValue({
      //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      // });
    },
  },
};
</script>
