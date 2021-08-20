<script>
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _findIndex from 'lodash/findIndex';
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
    watch: {

    },
    methods: {
        deepDelete(needDel, attr) {
            // 删除一个属性
            needDel = _omit(needDel, attr);
            // 如果上一层属性没有任何属性值 就连父属性一起删除
            if (attr.indexOf('.') > 0) {
                let tempAttr = attr.substring(0, attr.lastIndexOf("."));
                if (_isEmpty(_get(needDel, tempAttr))) {
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
                _assign(newVal, this.componentModel);
                _set(newVal, attr, val);
                this.$set(this, 'componentModel', newVal);
            } else {
                // 绑定属性
                this.$set(this.componentModel, attr, val);
            }
        },
        addTplFormElems(item, model) {
            if (item) {
                // 是否为自动bind
                this.munalBindItem(item);
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
            // 如果开启了手动绑定 就需要使用addToItem事件来进行绑定回调
            if (elem.autoBind === false) {
                // 手动绑定事件是否添加(如果是初始化或者非addTplElems函数调用)
                this.munalBindItem(elem);
            }

            let btr = this.getBindAttrName(elem);
            // 如果绑定属性名确定就执行绑定
            if (btr) {
                // 模型层如果有值就不用设置了
                let modelVal = _get(this.tplModel, modelName);
                if (!modelVal) {
                    let defVal = elem.defVal;
                    // 如果有默认值的话 就直接绑定到模型上
                    if (defVal) {
                        this.$set(this.tplModel, modelName, defVal);
                    } else if (munalModelVal) {
                        // 如果模型和默认值都没有的情况下，如果手动设置了model也设置到模型中
                        this.$set(this.tplModel, modelName, munalModelVal);
                    }
                }
                // 如果不进行映射的话 直接返回
                if (true === elem.notMapping) {
                    return;
                }

                // 设置绑定监听回调函数
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
        toggleVisible(elemName, vis, invisibleNoBindHoleModel) {
            if (elemName) {
                let elem = null;
                for (var i in this.tplFormElems) {
                    let o = this.tplFormElems[i];
                    if (o.group) {
                        if (o.group.name === elemName) {
                            elem = o;
                            break;
                        }
                        for (var j in o.elems) {
                            let k = o.elems[j];
                            if (k.name === elemName) {
                                elem = k;
                                break;
                            }
                        }
                    }
                }

                if (!elem) {
                    return;
                }
                // 不可见时移除
                if (vis === false) {
                    if (typeof elem === "object") {
                        // 带有group的需要循环
                        if (elem.group) {
                            for (var j in elem.elems) {
                                let res = this.removeWatch(elem.elems[j], invisibleNoBindHoleModel);
                                if (res === false) {
                                    continue;
                                }
                            }
                        } else {
                            this.removeWatch(elem, invisibleNoBindHoleModel);
                        }
                    }
                }
                if (vis === true) {
                    if (typeof elem === "object") {
                        // 如果设置了保留值 removeWatch就不会删除 添加监控前会从model中重新获取
                        this.addWatch(elem);
                    }
                }
            }
        },
        deleteElem(elem, groupElem) {
            // 如果是某个节点内数据删除
            if (groupElem) {
                if (!typeof elem === "object" || !typeof groupElem === "object") {
                    return;
                }
                let groupIndex = _findIndex(this.tplFormElems, {
                    'group': {
                        'name': groupElem.group.name
                    }
                });
                let elemIndex = _findIndex(this.tplFormElems[groupIndex].elems, {
                    'name': elem.name
                });
                if (elemIndex != null && elemIndex > -1) {
                    let res = this.removeWatch(this.tplFormElems[groupIndex].elems[elemIndex]);
                    this.tplFormElems[groupIndex].elems.splice(elemIndex, 1);
                }
            } else {
                // 如果是整个节点删除
                let elemIndex = null;
                // 如果是下标 就直接使用
                if (typeof elem === 'number') {
                    elemIndex = elem;
                } else if (typeof elem === "object") {
                    // 如果是元素 就需要查询下标
                    let findPre = null;
                    if (elem.group) {
                        findPre = {
                            'group': {
                                'name': elem.group.name
                            }
                        };
                    } else {
                        findPre = {
                            'name': elem.name
                        };
                    }
                    elemIndex = _findIndex(this.tplFormElems, findPre);
                }

                if (elemIndex && elemIndex > -1) {
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
                    this.tplFormElems.splice(elemIndex, 1);
                }
            }
        },
        removeWatch(elem, holeModelVal) {
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
                // 如果配置了需要保留模型值
                if (holeModelVal !== true) {
                    // 删除编辑器表单的数据模型
                    this.$delete(this.tplModel, modelName);
                }
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
        },
        staticItem(item, val) { // 静态item绑定 val = 子组件的value值 addToElems事件触发
            // console.log('staticitem this = %o val = %o', item, val);
            let btr = this.getBindAttrName(item);
            // 如果绑定属性名确定就执行绑定
            if (btr) {
                // 如果不进行映射的话 直接返回
                if (true === item.notMapping) {
                    return;
                }
                //let oldVal = this.tplModel[item.name];
                // 设置到编辑器表单值 tplModel
                this.$set(this.tplModel, item.name, val);
                // 绑定到显示组件模型 componentModel
                this.bindAttr(btr, val);
            }

        },
        dynamicItem(item, val) { // 动态item绑定 val = 子组件的value值 addToElems事件触发
            // 动态key 因为不知道具体的绑定键 所以必须要实现一个deletItemFunc 如果需要删除该项，就需要返回item的列表
            let delElem = [];
            let delFunc = item.deletItemFunc;
            let funcType = typeof delFunc;
            if (item && funcType && funcType === 'function') {
                delElem = item.deletItemFunc.call(this, this.tplFormElems);
            }
            // 如果有需要删除的item 就删除
            if (delElem && delElem.length > 0) {
                delElem.forEach(e => {
                    this.deleteElem(e);
                });
                delElem = [];
            }
            let valType = typeof val;
            // 如果是数组
            if (Array.isArray(val)) {
                // 循环添加到表单元素列表中
                val.forEach(e => this.addTplFormElems(e));
            } else {
                // 直接添加到列表
                this.addTplFormElems(val);
            }

        },
        munalBindItem(elem) {
            let that = this;
            // 如果设置了自动绑定 就使用默认的绑定函数
            if (elem.autoBind === false) {
                // 如果自定义事件不包括addToElems就主动添加一个
                if (!elem.events || (elem.events && !elem.events.addToElems)) {
                    if (elem.events === null || elem.events === undefined) {
                        elem.events = {};
                    }
                    let bindFunc = null;
                    if (elem.bindType && elem.bindType === 'dynamic') {
                        bindFunc = this.dynamicItem;

                    } else if (elem.bindType && elem.bindType === 'static') {
                        bindFunc = this.staticItem;
                    } else {
                        // 如果没有设置类型 就需要填写bindFunc
                        if(typeof elem.bindFunc === 'function'){
                            bindFunc = elem.bindFunc;
                        } else {
                            console.error('Elem = %o has no bindFunc', elem);
                            return false;
                        }
                    }
                    if(bindFunc){
                        elem.events.addToElems = bindFunc;
                        return true;
                    }
                }
            }
            return false;
        }
    },
    created() {
        // 动态添加watch节点
        this.initWatch();
    }
}
</script>
