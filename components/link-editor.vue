<template>
  <div class="link-editor" :id="'link-editor' + _uid">
    <div @click="dialogFlag = true">
      <slot name="view-label" :linkEditor="this">
        <el-link v-bind="editorView">{{ viewLabel }}</el-link>
      </slot>
    </div>
    <el-dialog v-bind="dialogProps" :title="dialogTitle" :visible.sync="dialogFlag" @open="handleOpen" :before-close="handleClose" :append-to-body="true">
      <div>
        <el-form :model="value" v-bind="mergeFormProps" ref="bindForm" label-width="100px" class="link-editor-form">
          <el-form-item label="显示文字" :prop="mergePropMapping.label">
            <el-input v-model="value[mergePropMapping.label]"></el-input>
          </el-form-item>
          <el-form-item label="链接" :prop="mergePropMapping.href">
            <el-input v-model="value[mergePropMapping.href]"></el-input>
          </el-form-item>
          <el-form-item label="跳转类型" :prop="mergePropMapping.target">
            <el-select v-model="value[mergePropMapping.target]" placeholder="请选择">
              <el-option key="_blank" label="在新窗口中打开链接" value="_blank">
              </el-option>
              <el-option key="_self" label="在当前页面中打开链接" value="_self">
              </el-option>
              <el-option key="_parent" label="在父页面中打开链接" value="_parent">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <slot name="footer" :linkEditor="this">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </slot>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import 'element-ui/lib/theme-chalk/index.css'
import _ from 'lodash'
export default {
  name: 'LinkEditor',
  data() {
    return {
      dialogFlag: false,
      value: {},
      defFormProps:{
        rules: {
          label: [{ required: true, message: '请输入显示文字', trigger: 'blur' }],
          href: [{ required: true, message: '请输入链接', trigger: 'blur' }],
          target: [{ required: true, message: '请选择跳转类型', trigger: 'blur' }],
        }
      },
      defPropMapping:{
        label: 'label', // 显示文字
        href: 'href', // 链接
        target: 'target' // 目标类型
      }
    };
  },
  props: {
    dialogProps: {
      type: Object,
      default () {
        return {
          width: "40%"
        };
      }
    },
    editorView: {
      type: Object,
      default () {
        return {
          type: "primary",
          underline: false,
          href: '#'
        };
      }
    },
    viewLabel: {
      type: String,
      default: '编辑'
    },
    dialogTitle: {
      type: String,
      default: '-编辑链接-'
    },
    propMapping: {
      type: Object,
      default () {
        return {
        };
      }
    },
    defVal: {
      type: Object,
      default: null
    },
    formProps: {
      type: Object,
      default () {
        return {
        };
      }
    },
    submitDialog: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  computed:{
    mergeFormProps() {
      // 合并form表单props
      var props = {};
      _.merge(props, this.defFormProps, this.formProps);
      return props;
    },
    mergePropMapping(){
      // 合并form表单props
      var props = {};
      _.merge(props, this.defPropMapping, this.propMapping);
      return props;
    }
  },
  methods: {
    initDef() {
      if (this.defVal) {
        var def = {};
        def[this.mergePropMapping.href] = '#';
        def[this.mergePropMapping.target] = '_self';
        this.value = Object.assign(def, this.defVal);
      }
    },
    handleOpen() {
      this.initDef();
    },
    handleClose() {
      this.dialogFlag = false;
      this.$refs.bindForm.clearValidate();
      this.$refs.bindForm.resetFields();
    },
    submit() {
      var result = null;
      if (this.mergeFormProps) {
        this.$refs.bindForm.validate((valid) => {
          if (valid) {
            if (this.submitDialog) {
              var val = Object.assign({}, this.value);
              result = this.submitDialog.call(this, Object.assign({}, val));
            }
            if (false === result) {
              return;
            }
            this.handleClose();
          } else {
            return false;
          }
        });
      }
    }
  },
  created() {

  }
}

</script>
<style type="text/css" scoped>
.link-editor .el-form-item {
  margin-bottom: 22px;
}

</style>
