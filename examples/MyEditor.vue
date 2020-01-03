<template>
  <div>
    <TempleteEditor :tpl-form-elems="tplFormElems" v-model="tplModel" ref="tpl">
      <template v-slot:showComponent>
        <MyComponent v-model="componentModel" />
      </template>
      <template v-slot:form_item_bgColor="sc">
        <div class="color-schemes-line">
          <div class="color-schemes-line-text">
            <span>{{sc.data.attrs.text}}</span>
          </div>
          <el-color-picker v-model="tplModel.bgColor"></el-color-picker>
        </div>
      </template>
    </TempleteEditor>
  </div>
</template>
<style type="text/css">

</style>
<script type="text/javascript">
import Vue from 'vue'
import MyComponent from './MyComponent'
import TempleteBinder from '../components/templete-binder'
import TempleteEditor from '../components/templete-editor'
import test2 from './test2'

export default {
  name: 'MyEditor',
  mixins: [TempleteBinder],
  components: {
    TempleteEditor,
    MyComponent,
  },
  beforeCreate(){
    Vue.$formItemComponentsManager.addComponent({test2});
  },
  data() {
    return {
      tplFormElems: [{
        type: 'input',
        name: 'textVal',
        label: 'TestTplInput',
      }, {
        type: 'test',
        name: 'diyTest',
        label: 'diyTest',
        defVal: 'xsxsxs',
        attrs:{
          ttext: '全局组件测试覆盖'
        },
        events:{
          change: (e) => console.log('change = %o', this.tplModel.diyTest),
          focus:(e) => console.log('focus = %o', this.tplModel.diyTest)
        }
      },{
        type: 'test2',
        name: 'letTest',
        label: 'letTestLabel',
      },{
        type: 'custom',
        name: 'bgColor',
        label: '局部',
        attrs:{
          text: '完全自定义组件'
        }
      }]
    };
  },
  created() {
    //console.log("test2 = %o" , test2);
  }
}

</script>
