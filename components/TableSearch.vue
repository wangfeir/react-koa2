<!--
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-24 17:54:47
-->
<template>
  <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
    <a-row :gutter="24">
      <a-col v-for="(item,i) in columns" :key="i" :span="8" :style="{ display: i < count ? 'block' : 'none' }">
        <a-form-item :label="item.label">
          <a-input 
            v-if="item.type==='input'"
            v-decorator="[
                `${item.key}`,
              ]"
            :placeholder="item.placeholder"
          />
        </a-form-item>
      </a-col>
      <a-col :span="expand?24:8" :style="{ textAlign: 'right' }">
        <a-button type="primary" html-type="submit">Search</a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">Clear</a-button>
        <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
          Collapse
          <a-icon :type="expand ? 'up' : 'down'" />
        </a>
      </a-col>
    </a-row>
  </a-form>
</template>
<script>
export default {
  props:['columns','search'],
  data() {
    return {
      form: this.$form.createForm(this, { name: "advanced_search" }),
      expand: false,
      
    };
  },
  computed: {
    count() {
      return this.expand ? 11 : 3;
    },
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        this.$emit('search',values)

        console.log("error", error);
        console.log("Received values of form: ", values);
      });
    },

    handleReset() {
      this.form.resetFields();
    },

    toggle() {
      this.expand = !this.expand;
    },
  },
};
</script>
<style>
.ant-advanced-search-form {
  padding:0 24px 20px 24px;
  /* background: #fbfbfb; */
  /* border: 1px solid #d9d9d9; */
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}</style>;
