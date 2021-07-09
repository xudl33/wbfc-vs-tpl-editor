<template>
  <div class="form-item" v-if="visable">
    <el-form-item v-if="value.name && itemType" v-bind="mergeFormItemAttrs">
      <template v-slot:label v-if="value.helps">
        <slot :name="'form_item_label_' + value.name" :data="value">
          <el-link icon="el-icon-question" :underline="false" title="点击查看说明" @click="drawerShow = true"></el-link> {{value.label}}
          <el-drawer :title="'帮助 - ' + value.label" :visible.sync="drawerShow" :append-to-body="true">
            <pre style="padding:20px;">{{value.helps}}</pre>
          </el-drawer>
        </slot>
      </template>
      <slot :name="'form_item_' + value.name" :data="value">
        <!-- 隐藏 -->
        <input type="hidden" v-model="binForm[value.name]" v-if="'hidden' === itemType" v-bind="value.attrs" v-on="value.events?value.events:null" />
        <!-- 单选按钮 -->
        <div v-else-if="'radio' === itemType">
          <div v-if="value.items && value.items.length > 0">
            <el-radio v-for="(item, index) in value.items" :key="value.name + index" v-model="binForm[value.name]" v-bind="item.attrs" v-on="value.events?value.events:null">{{item.text}}</el-radio>
          </div>
          <div v-else>
            <el-radio v-model="binForm[value.name]" v-bind="value.attrs" v-on="value.events?value.events:null">{{value.text}}</el-radio>
          </div>
        </div>
        <!-- 单选按钮组 -->
        <div v-else-if="'radio-group' === itemType">
          <el-radio-group v-model="binForm[value.name]">
            <div v-if="value.items && value.items.length > 0 && 'radio-button' === value.items[0].type">
              <el-radio-button v-for="(item, index) in value.items" :key="value.name + index" v-bind="item.attrs" v-on="item.events?item.events:null">{{item.text}}</el-radio-button>
            </div>
            <div v-else>
              <el-radio v-for="(item, index) in value.items" :key="value.name + index" v-bind="item.attrs" v-on="item.events?item.events:null">{{item.text}}</el-radio>
            </div>
          </el-radio-group>
        </div>
        <!-- 多选按钮 -->
        <div v-else-if="'checkbox' === itemType">
          <el-checkbox v-model="binForm[value.name]" v-bind="value.attrs" v-on="value.events?value.events:null">{{value.text}}</el-checkbox>
        </div>
        <!-- 多选按钮组 -->
        <div v-else-if="'checkbox-group' === itemType">
          <el-checkbox-group v-model="binForm[value.name]">
            <div v-if="value.items && value.items.length > 0 && 'checkbox-button' === value.items[0].type">
              <el-checkbox-button v-for="(item, index) in value.items" :key="value.name + index" v-bind="item.attrs" v-on="item.events?item.events:null">{{item.text}}</el-checkbox-button>
            </div>
            <div v-else>
              <el-checkbox v-for="(item, index) in value.items" :key="value.name + index" v-bind="item.attrs" v-on="item.events?item.events:null">{{item.text}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <!-- 下拉框 -->
        <div v-else-if="'select' === itemType">
          <el-select v-model="binForm[value.name]" v-bind="value.attrs" v-on="value.events?value.events:null">
            <el-option v-for="(item, index) in value.items" :key="value.name + index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <!-- 级联选择器 -->
        <div v-else-if="'cascader' === itemType">
          <el-cascader v-model="binForm[value.name]" v-bind="value.attrs" v-on="value.events?value.events:null"></el-cascader>
        </div>
        <!-- 输入框/文本框 -->
        <el-input v-else-if="'input' === itemType" v-model="binForm[value.name]" v-bind="value.attrs" v-on="value.events?value.events:null" ></el-input>
        <!-- 开关 -->
        <el-switch v-else-if="'switch' === itemType" v-model="binForm[value.name]" v-bind="value.attrs" v-on="value.events?value.events:null">
        </el-switch>
        <!-- 滑块 -->
        <el-slider v-else-if="'slider' === itemType" v-model="binForm[value.name]" v-on="value.events?value.events:null"></el-slider>
        <!-- 时间选择器有选项 -->
        <el-time-select v-else-if="'time-select' === itemType" v-model="binForm[value.name]" v-bind="value.attrs" v-on="value.events?value.events:null">
        </el-time-select>
        <!-- 时间选择器任意时间 -->
        <el-time-picker v-else-if="'time-picker' === itemType" v-model="binForm[value.name]" v-on="value.events?value.events:null" v-bind="value.attrs">
        </el-time-picker>
        <!-- 日期选择器 -->
        <el-date-picker v-else-if="'date-picker' === itemType" v-model="binForm[value.name]" v-on="value.events?value.events:null" v-bind="value.attrs" type="date">
        </el-date-picker>
        <!-- 日期时间选择器 -->
        <el-date-picker v-else-if="'date-time-picker' === itemType" v-model="binForm[value.name]" v-on="value.events?value.events:null" v-bind="value.attrs" type="datetime">
        </el-date-picker>
        <!-- 评分 -->
        <el-rate v-else-if="'rate' === itemType" v-bind="value.attrs" v-model="binForm[value.name]" v-on="value.events?value.events:null"></el-rate>
        <!-- 颜色选择器 -->
        <el-color-picker v-else-if="'color-picker' === itemType" v-bind="value.attrs" v-model="binForm[value.name]" v-on="value.events?value.events:null"></el-color-picker>
        <!-- 穿梭框 -->
        <el-transfer v-else-if="'transfer' === itemType" v-bind="value.attrs" v-model="binForm[value.name]" v-on="value.events?value.events:null"></el-transfer>
        <!-- 链接 -->
        <LinkEditor v-else-if="'link-editor' === itemType" v-bind="value.attrs" v-model="binForm[value.name]" v-on="value.events?value.events:null"></LinkEditor>
        <!-- 完全自定义组件 -->
        <!-- <div v-else-if="'custom' === itemType" :data="value"></div> -->
        <!-- 自定义组件 html原生的控件的绑定 都需要用props修饰器才能正常使用 可以参考 https://cn.vuejs.org/v2/api/#v-bind -->
        <!-- 自定义组件的v-model https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model -->
        <component v-else-if="'custom' !== itemType" v-bind:is="itemType" v-bind="value.attrs" v-model.props="binForm[value.name]" v-on="value.events?value.events:null"></component>
      </slot>
    </el-form-item>
    <el-form-item :label="value.label" v-else>
      <!-- 如果不设置类型，默认为input -->
      <slot :name="value.name" :data="value" v-if="value.name">
        <el-input v-model="binForm[value.name]" v-bind="value.attrs"></el-input>
      </slot>
    </el-form-item>
  </div>
</template>
<script type="text/javascript">
import Vue from 'vue';
import FormItemComponentsManager from './form-item-components-manager';
export default {
  name: 'FormItemEditor', // 表单编辑器
  mixins: [
    FormItemComponentsManager
  ],
  components: {
  },
  data(){
    return {
      drawerShow: false
    };
  },
  props: {
    binForm: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    value: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    visable: {
      type: Boolean,
      default () {
        return true;
      }
    }
  },
  computed: {
    itemType() {
      return this.value.type ? this.value.type.toLowerCase() : null;
    },
    mergeFormItemAttrs(){
      // 合并form表单props
      var props = {label: this.value.label, prop: this.value.name};
      _.merge(props, this.value.formItemAttrs);
      return props;
    }
  },
  methods: {

  },
  created() {
    //console.log('form item editor = %o' , this)
    //console.log('binForm = %o' , this.binForm)
    //console.log('value = %o' , this.value)
    //console.log('itemType = %o' , this.itemType)
    //    console.log('%s.visable = %o', this.value.name, this.visable)
    /*if(this.slots){
      this.$slots.push(this.slots);
    }*/
    //console.log("slots=%o", this.slots);
    //console.log("%s.$slots = %o", 'FormItemEditor', this.$slots);
  }
}

</script>
