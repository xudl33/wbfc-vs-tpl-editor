<template>
  <div class="tpl-editor">
    <TempleteEditor :is-edit="isEdit" :tpl-form-elems="tplFormElems" v-model="tplModel" ref="tpl" :tpl-form="tplForm">
      <template v-slot:showTemplete>
        <BaseTempleteDemo v-model="componentModel" />
        <div v-if="!isEdit" class="return-editor">
          <el-button @click="isEdit = true">返回编辑器</el-button>
        </div>
      </template>
      <template v-slot:showComponent>
        <BaseTempleteDemo v-model="componentModel"/>
      </template>
    </TempleteEditor>
  </div>
</template>
<style type="text/css" scoped>
.return-editor {
  text-align: right;
}

.tpl-editor>>>.templete-editor {
  --viwer-width: 50%;
}

</style>
<script type="text/javascript">
import Vue from 'vue'
import TempleteBinder from '../components/templete-binder'
import TempleteEditor from '../components/templete-editor'
import BaseTempleteDemo from './base-templete-demo'
export default {
  name: 'TempleteEditorDemo', // 商品展示列表(分类横版) 链接跳转  模板
  mixins: [TempleteBinder],
  components: {
    TempleteEditor,
    BaseTempleteDemo
  },
  data() {
    return {
      isEdit: true,
      componentModelStr: '',
      tplForm: {
        // 可以在tplForm中写rules总体校验，也可以在tplFormElems[].formItemAttrs中单独写校验
        // rules: {
        //   textVal:[{
        //     "required": true,
        //     "message": "请输入分组表单文本",
        //     "trigger": "blur"
        //   }]
        // },
        bottomBtns: [{
          type: 'primary',
          label: '打印模板数据到控制台',
          events: {
            click: (e) => {
              var tplData = Object.assign({}, this.componentModel);
              var str = JSON.stringify(tplData, null, 2);
              console.log(str);
              this.$alert('数据已打印到控制台，请查看');
            }
          }
        }, {
          type: '',
          label: '预览',
          events: {
            click: (e) => this.preView()
          }
        }]
      },
      tplModel: {
        /*textVal: null, // 默认值可以直接设在model中 ，也可以在tplFormElems中写defVal
        hiddenVal: 'hiddenVal',
        radioVal: '0',
        radioGroupVal: '0',
        checkboxVal: '1',
        checkboxGroupVal: ['1'],
        selectVal: '0',
        cascaderVal: ['0', '0-1'],
        textAreaVal: '这里是文本域',
        switchVal: true,
        sliderVal: 30,
        timeSelectVal: null,
        timePickerVal: null,
        datePickerVal: null,
        dataTimePickerVal: null,
        rateVal: 5,
        colorPickerVal: '#66b1ff',
        transferVal: ['0', '1']*/
      },
      tplFormElems: [{
        group: {
          name: 'hasGroup',
          label: '带有分组的表单'
        },
        elems: [{
          type: 'input',
          name: 'textVal',
          label: '分组表单文本',
          formItemAttrs:{
            rules: [{
                "required": true,
                "message": "请输入分组表单文本",
                "trigger": "blur"
              }],
              inlineMessage: true
          },  
          attrs: {
            placeholder: '请输入'
          }
        }]
      }, {
        type: 'hidden',
        name: 'hiddenVal',
        label: '右边是隐藏域',
        defVal: 'hiddenVal'
      }, {
        type: 'radio',
        name: 'radioVal',
        label: '单选按钮',
        defVal: '0',
        items: [{
          attrs: { label: '0' },
          text: '单选1'
        }, {
          attrs: { label: '1' },
          text: '单选2'
        }]
      }, {
        type: 'radio-group',
        name: 'radioGroupVal',
        label: '单选按钮组',
        defVal: '0',
        items: [{
          attrs: { label: '0' },
          text: '单选组1'
        }, {
          attrs: { label: '1' },
          text: '单选组2'
        }]
      }, {
        type: 'radio-group',
        name: 'radioGroupVal',
        label: '单选按钮组方形',
        items: [{
          type: 'radio-button', // 只要组内第一个是button样式 ，所有的都是
          attrs: { label: '0' },
          text: '单选组1'
        }, {
          type: 'radio-button',
          attrs: { label: '1' },
          text: '单选组2'
        }]
      }, {
        type: 'checkbox',
        name: 'checkboxVal',
        label: '多选按钮',
        attrs: { trueLabel: '1', falseLabel: '0' },
        text: '多选',
        defVal: '1',
      }, {
        type: 'checkbox-group',
        name: 'checkboxGroupVal',
        label: '多选按钮组',
        defVal: ['1'], // 必须是数组
        items: [{
          attrs: { label: '0' },
          text: '多选组0'
        }, {
          attrs: { label: '1' },
          text: '多选组1'
        }, {
          attrs: { label: '2' },
          text: '多选组2'
        }]
      }, {
        type: 'checkbox-group',
        name: 'checkboxGroupVal',
        label: '多选按钮组方形',
        items: [{
          type: 'checkbox-button', // 只要组内第一个是button样式 ，所有的都是
          attrs: { label: '0' },
          text: '多选组0'
        }, {
          attrs: { label: '1' },
          text: '多选组1'
        }, {
          attrs: { label: '2' },
          text: '多选组2'
        }]
      }, {
        type: 'select',
        name: 'selectVal',
        label: '下拉框',
        defVal: '0',
        attrs: {
          placeholder: '请选择'
        },
        items: [{
          value: '0',
          label: '选项0'
        }, {
          value: '1',
          label: '选项1'
        }, {
          value: '2',
          label: '选项2'
        }]
      }, {
        type: 'cascader',
        name: 'cascaderVal',
        label: '级联选择器',
        defVal: ['0', '0-1'],
        attrs: {
          options: [{
            value: '0',
            label: '0',
            children: [{
              value: '0-1',
              label: '0-1'
            }, {
              value: '0-2',
              label: '0-2'
            }, {
              value: '0-3',
              label: '0-3'
            }]
          }, {
            value: '1',
            label: '1',
            children: [{
              value: '1-1',
              label: '1-1'
            }, {
              value: '1-2',
              label: '1-2'
            }, {
              value: '1-3',
              label: '1-3'
            }]
          }]
        }
      }, {
        type: 'input',
        name: 'textAreaVal',
        label: '文本域',
        defVal: '这里是文本域',
        attrs: {
          type: 'textarea',
          rows: "3"
        }
      }, {
        type: 'switch',
        name: 'switchVal',
        label: '开关',
        defVal: true,
      }, {
        type: 'slider',
        name: 'sliderVal',
        label: '滑块',
        defVal: 30,
      }, {
        type: 'time-select',
        name: 'timeSelectVal',
        label: '时间选择器选项',
        attrs: {
          placeholder: '请选择',
        }
      }, {
        type: 'time-picker',
        name: 'timePickerVal',
        label: '时间选择器任意',
        attrs: {
          placeholder: '请选择',
          valueFormat: 'HH:mm:ss'
        }
      }, {
        type: 'date-picker',
        name: 'datePickerVal',
        label: '日期选择器任意',
        attrs: {
          placeholder: '请选择',
          valueFormat: 'yyyy/MM/dd'
        }
      }, {
        type: 'date-time-picker',
        name: 'dataTimePickerVal',
        label: '日期时间选择器任意',
        attrs: {
          placeholder: '请选择',
          valueFormat: 'yyyy/MM/dd HH:mm:ss'
        }
      }, {
        type: 'rate',
        name: 'rateVal',
        label: '评分',
        defVal: 5,
      }, {
        type: 'color-picker',
        name: 'colorPickerVal',
        label: '颜色选择器',
        defVal: '#66b1ff',
      }, {
        type: 'transfer',                            
        name: 'transferVal',
        label: '穿梭框',
        defVal: ['0', '1'],
        attrs: {
          data: [{ key: '0', label: '选项0' },
            { key: '1', label: '选项1' },
            { key: '2', label: '选项2' }
          ]
        }
      }, {
        type: 'Link-editor',
        name: 'linkVal',
        label: '链接',
        defVal: {link: '1111', text: '123212', type: '_blank'},
        attrs: {
          propMapping: { // 不是默认结构的数据，需要对表单进行映射转换
             href: 'link',
             label: 'text',
             target: 'type'
          },
          submitDialog: (val) => {
            // 回显
            this.$set(this.tplModel, 'linkVal', val);
          }
        },
        events:{
          open: (e, linkEditor) => {
            // 默认赋值
            linkEditor.setValue(this.tplModel.linkVal);
          }
        }
      }]
    };
  },
  computed: {

  },
  methods: {
    toggleDataFlag(val, type) {
      //console.log("type = %o, val = %o", type, val);
    },
    preView() {
      this.isEdit = false;
    }
  },
  created() {
    //console.log(this.componentModel);
  }
}

</script>
