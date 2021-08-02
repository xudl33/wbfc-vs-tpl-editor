<script>
import Vue from 'vue'
import _ from 'lodash'

export default {
    name: 'TempleteBinder', // 模板和模型绑定组件
    data() {
        return {
            tplModel: {}, // 编辑器数据模型
            tplFormElems: [], // 编辑器表单元素
            componentModel: {}, // 显示组件数据模型
            watchers: {}, // 编辑器监听器组
        };
    },
    watch: {},
    methods: {
        deepDelete(needDel, attr) {
            // 删除一个属性
            needDel = _.omit(needDel, attr);
            // 如果上一层属性没有任何属性值 就连父属性一起删除
            if (attr.indexOf('.') > 0) {
                let tempAttr = attr.substring(0, attr.lastIndexOf("."));
                if (_.isEmpty(_.get(needDel, tempAttr))) {
                    needDel = this.deepDelete(needDel, tempAttr);
                }
            }
            return needDel;
        },
        bindAttr(attr, val) {
            // 绑定属性
            // 如果是带有层级的属性 需要merge
            if (attr.indexOf('.') > 0) {
                let newVal = {};
                // 修正带有层级的属性无法正确被设置到componentModel的问题
                _.assign(newVal, this.componentModel);
                _.set(newVal, attr, val);
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
        addOneElemWatch(elem, munalModelVal) {
            let modelName = elem.name;
            let watchAttr = 'tplModel.' + modelName;
            // name属性不能为空
            if (!watchAttr) {
                return false;
            }

            let btr = this.getBindAttrName(elem);
            // 如果绑定属性名确定就执行绑定
            if (btr) {
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
                // 如果不进行映射的话 直接返回
                if (true === elem.notMapping) {
                    return;
                }
                let tf = (newVal, oldVal) => {
                    this.bindAttr(btr, newVal, oldVal);
                };

                if (!this.watchers[modelName]) {
                    // 添加watch
                    let watcher = this.$watch(watchAttr, tf, {
                        deep: true,
                        immediate: true
                    });
                    this.watchers[modelName] = watcher;
                }
            }

        },
        addWatch(elem, munalModelVal) {
            if (!elem) {
                return false;
            }
            // 带有group的需要循环
            if (elem.group) {
                for (var j in elem.elems) {
                    let res = this.addOneElemWatch(elem.elems[j], munalModelVal);
                    if (res === false) {
                        continue;
                    }
                }
            } else {
                this.addOneElemWatch(elem, munalModelVal);
            }
        },
        deleteElem(elem, repElem) {
            let elemIndex = null;
            // 如果是下标 就直接使用
            if (typeof elem === 'number') {
                elemIndex = elem;
            } else if (typeof elem === "object") {
                // 如果是元素 就需要查询下标
                elemIndex = _.indexOf(this.tplFormElems, elem);
            }

            if (elemIndex != null && elemIndex > -1) {
                let delElem = this.tplFormElems[elemIndex];
                // 带有group的需要循环
                if (delElem.group) {
                    for (var j in delElem.elems) {
                        let res = this.removeWatch(delElem.elems[j]);
                        if (res === false) {
                            continue;
                        }
                    }
                } else {
                    this.removeWatch(delElem);
                }

                if (repElem && typeof repElem === "object") {
                    this.tplFormElems.splice(elemIndex, 1, repElem);
                } else {
                    this.tplFormElems.splice(elemIndex, 1);
                }
            }
        },
        removeWatch(elem) {
            let modelName = elem.name;
            let watchAttr = 'tplModel.' + modelName;
            // name属性不能为空
            if (!watchAttr) {
                return false;
            }

            let btr = this.getBindAttrName(elem);
            // 如果绑定属性名确定就解除绑定
            if (btr) {
                this.componentModel = this.deepDelete(this.componentModel, btr);
                // Vue.set(this, 'componentModel', this.componentModel);
                // console.log('removeWatch modelName = %s,bindName = %s componentModel = %o', modelName, btr, this.componentModel);
                // 删除编辑器表单的数据模型
                this.$delete(this.tplModel, modelName);
                // 如果有监听器要一起删除
                if (this.watchers[modelName]) {
                    this.watchers[modelName]();
                    // 删除缓存的监听器
                    this.$delete(this.watchers, modelName);
                }
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
