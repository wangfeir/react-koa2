<!--
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-26 13:17:31
-->
<template>

  <div>
  <!-- <a-button  type="primary" @click="showModal">新增</a-button> -->
    <a-modal
    title="编辑数据"
    :visible="visible"
    width="900px"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item v-for="(item,index) in fromlist" :key="index" :label="item.label" v-show="item.hide!==true">
        <a-input
          v-if="item.type==='input'"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          v-decorator="[`${item.key}`,{
            rules:[{
              required:item.required,
              message:item.placeholder
            }],
            initialValue:!item.notDefaultValue?editData[item.key]:null
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
            }],
            initialValue:setInitialValue(item)

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
            }],
            initialValue:editData[item.key]

          }]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
  </div>
  
</template>
<script>
import { updateData } from "@/api/global";

export default {
  props: ["fromlist","refreshTable",'visible','hide','editData','submit'],
  data() {
    return {
      confirmLoading:false,
      parentSubmit:false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "editDataForm" }),
    };
  },
   watch:{
            submit:{  
                                handler() {
                                  this.parentSubmit = true
                                },
                immediate:true,//关键
                deep:true
            },
        },
  methods: {
    // 处理多选框的默认数据格式
    setInitialValue(row){
      if(row.mode){
        return this.editData[row.key]?.split(',')
      }
      return this.editData[row.key]
    },
    handleOk(e) {
      
      this.ModalText = "The modal will be closed after two seconds";
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true;
          values.tab = values.tab?.join(',')
          console.log("Received values of form: ", this.props);
          if(this.parentSubmit){
            this.$emit('submit',values)
            this.form.resetFields();
            this.$emit('hide')
          }else{
            updateData(values).then(res=>{
            if(res.status === 200){
              console.log('保存成功',res)
              this.confirmLoading = false;
              this.form.resetFields();
              this.$emit('hide')
              this.$emit('refreshTable')
            }
          })
          }
          
          
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
      this.$emit('hide')
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
