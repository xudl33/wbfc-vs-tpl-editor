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
                // 修正带有层级的属性无法正确被设置到componentModel的问题
                _.assign(newVal, this.componentModel);
                _.set(newVal,attr,val);
                Vue.set(this, 'componentModel', newVal);
            } else {
                // 绑定属性
                Vue.set(this.componentModel, attr, val);
            }
        },
        addTplFormElems(item, model) {
            if (item) {
                // 添加到表单项数组中
                this.tplFormElems.push(item);
                // 添加监控 如果有模型也要添加模型
                this.addWatch(item, model);
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
        addOneElemWatch(elem, munalModelVal){
          let modelName = elem.name;
          let watchAttr = 'tplModel.' + modelName;
          // name属性不能为空
          if (!watchAttr) {
              return false;
          }
          let btr = this.getBindAttrName(elem);
          // 模型层如果有值就不用设置了
          let modelVal = _.get(this.tplModel, modelName);
          if (!modelVal) {
              let defVal = elem.defVal;
              // 如果有默认值的话 就直接绑定到模型上
              if (defVal) {
                  Vue.set(this.tplModel, modelName, defVal);
              } else if (munalModelVal) {
                  // 如果模型和默认值都没有的情况下，如果手动设置了model也设置到模型中
                  Vue.set(this.tplModel, modelName, munalModelVal);
              }
          }
          let tf = (newVal, oldVal) => {
                  this.bindAttr(btr, newVal, oldVal);
              };
          // 添加watch
          this.$watch(watchAttr, tf, {
              deep: true,
              immediate: true
          });
        },
        addWatch(elem, munalModelVal) {
            if (!elem) {
                return false;
            }
            // 带有group的需要循环
            if (elem.group) {
                for (var j in elem.elems) {
                    let res = this.addOneElemWatch(elem.elems[j], munalModelVal);
                    if(res === false){
                      continue;
                    }
                }
            } else {
                 this.addOneElemWatch(elem, munalModelVal);
            }
        },
        initWatch() {
            for (var i in this.tplFormElems) {
                var elem = this.tplFormElems[i];
                let res = this.addWatch(elem);
                if (false === res) {
                    continue;
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
