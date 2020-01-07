<template>
  <div class="base-tpl-demo">
    <div>表单数据:</div>
    <div class="base-tpl-view">
      <div>分组表单文本: {{value.textVal}}</div>
      <div>隐藏域值: {{value.hiddenVal}}</div>
      <div>单选按钮值: {{value.radioVal}}</div>
      <div>单选按钮组值: {{value.radioGroupVal}}</div>
      <div>多选按钮值: {{value.checkboxVal}}</div>
      <div>多选按钮组值: {{value.checkboxGroupVal}}</div>
      <div>下拉框值: {{value.selectVal}}</div>
      <div>级联选择器值: {{value.cascaderVal}}</div>
      <div>文本域值: {{value.textAreaVal}}</div>
      <div>开关值: {{value.switchVal}}</div>
      <div>滑块值: {{value.sliderVal}}</div>
      <div>时间选择器(选项)值: {{value.timeSelectVal}}</div>
      <div>时间选择器(任意)值: {{value.timePickerVal}}</div>
      <div>日期选择器(任意)值: {{value.datePickerVal}}</div>
      <div>日期时间选择器(任意)值: {{value.dataTimePickerVal}}</div>
      <div>评分值: {{value.rateVal}}</div>
      <div>颜色选择器值: {{value.colorPickerVal}}</div>
      <div>穿梭框值: {{value.transferVal}}</div>
      <div>链接href值: {{value.linkVal}}</div>
    </div>
    <div>
      <div>模板数据:</div>
      <pre class="base-tpl-val">{{valueStr}}</pre>
    </div>
  </div>
</template>
<script>
  export default {
  name: 'BaseTempleteDemo',
  components: {

  },
  data() {
    return {
    }
  },
  props: {
    value: {
      type: Object,
      default () { return {}; }
    }
  },
  computed: {
    valueStr() {
      var str = JSON.stringify(this.value, null, 2);
      return str;
    }
  },
}

</script>
<style type="text/css" scoped="">
.base-tpl-demo {

}
  
.base-tpl-view {
  margin: 10px;
  padding: 10px;
  background-color: #ecebeb;
  word-break: break-word;
}

.base-tpl-val {
  margin: 10px;
  padding: 10px;
  background-color: #000000;
  color: #fdfdfd;
  white-space: pre-wrap;
  word-wrap: break-word;
}

</style>
