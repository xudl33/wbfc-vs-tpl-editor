<script type="text/javascript">
import Vue from 'vue'
import _ from 'lodash'

export default {
  name: 'TempleteBinder', // 模板和模型绑定组件
  data() {
    return {
      tplModel: {},
      tplFormElems: [],
      componentModel: {}
    };
  },
  watch: {},
  methods: {
    bindAttr(attr, val) {
      // 绑定属性
      // 如果是带有层级的属性 需要merge
      if (attr.indexOf('.') > 0) {
        let newVal = {};
        _.set(newVal, attr, val);
        for (var i in newVal) {
          let megVal = {};
          _.assign(megVal, this.componentModel[i], newVal[i]);
          Vue.set(this.componentModel, i, megVal);
        }
      } else {
        // 绑定属性
        Vue.set(this.componentModel, attr, val);
      }
    },
    getBindAttrName(el) {
      // 获取绑定的属性名
      var bindAttr = el.bind;
      if (!bindAttr) {
        bindAttr = el.name;
      } else {
        // 如果bind中带有. 说明是绝对属性名 不用拼接name
        if (bindAttr.indexOf('.') < 0) {
          bindAttr += ('.' + el.name);
        }
      }
      return bindAttr;
    },
    initWatch() {
      var _this = this;
      for (var i in this.tplFormElems) {
        var elem = this.tplFormElems[i];
        if (!elem) {
          continue;
        }
        // 带有group的需要循环
        if (elem.group) {
          for (var j in elem.elems) {
            let watchAttr = 'tplModel.' + elem.elems[j].name;
            // name属性不能为空
            if (!watchAttr) {
              continue;
            }
            let btr = this.getBindAttrName(elem.elems[j]);
            let defVal = elem.elems[j].defVal;
            // 如果有默认值的话 就直接绑定到模型上
            if (defVal) {
              Vue.set(this.tplModel, elem.elems[j].name, defVal);
            }
            let tf = (newVal, oldVal) => {
              this.bindAttr(btr, newVal, oldVal);
            };
            // 添加watch
            _this.$watch(watchAttr, tf, {
              deep: true,
              immediate: true
            });
          }
        } else {
          let watchAttr = elem.name;
          // name属性不能为空
          if (!watchAttr) {
            continue;
          }
          let btr = this.getBindAttrName(elem);
          let defVal = elem.defVal;
          // 如果有默认值的话 就直接绑定到模型上
          if (defVal) {
            Vue.set(this.tplModel, elem.name, defVal);
          }
          let tf = (newVal, oldVal) => {
            this.bindAttr(btr, newVal, oldVal);
          };
          // 添加watch
          _this.$watch('tplModel.' + watchAttr, tf, {
            deep: true,
            immediate: true
          });
        }
      }
    }
  },
  created() {
    // 动态添加watch节点
    this.initWatch();
  }
}

</script>
