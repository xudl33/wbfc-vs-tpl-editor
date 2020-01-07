# wbfc-vs-tpl-editor
`wbfc-vs-tpl-editor`是一个基于 [Element UI](https://github.com/ElemeFE/element) 制作的可视化模板编辑器框架。_**(如果你不喜欢EL，当然也可以全部自定义UI组件)**_ 它是由Wisea base framework cloud - visual templete editor的缩写而命名的。

> 它可以使用模板数据来自动生成并绑定el的表单。将数据模型驱动显示这种所见即得的功能更好的发挥。

想象一下，你可以提供一套制作好的模板给别人，他们不需要自己制作样式，制作配色，他们只要根据模板中的功能填写数据就可以得到想要的结果！这更接近真实的项目使用方案，毕竟全部动态的代码是很危险的，很容易造成XSS攻击。如果我们有现成的模板，只把数据做动态处理，就安全的多了。于是便有了本项目。

## 下载安装
```shell
npm install wbfc-vs-tpl-editor
```

``` javascript
import WbfcVsTplEditor from 'wbfc-vs-tpl-editor';
Vue.use(WbfcVsTplEditor);
```
## 使用流程

1. 制作你自己需要的vue组件
2. 为该组件制作一个对应的模板
3. 保存模板所需要的数据
4. 完成

以上流程可以查看 [Demo](https://github.com/xudl33/wbfc-vs-tpl-editor/examples) 或者 下载源码后 `npm run dev` 打开对应网页也可见到默认的demo页面

## 如何制作一个编辑器
在你的模板Vue文件中引入templete-binder和templete-editor(binder负责数据模型绑定，editor负责页面渲染), 模板Vue需要mixins(混入)binder。在页面中使用TempleteEditor， 绑定`v-model="tplModel" :tpl-form-elems="tplFormElems"`, 设置tplFormElems对应的表单元素数据，然后再将editor的插槽showComponent部分写入你的插件并绑定`v-model="componentModel"`即可。例：

MyComponent.vue
```vue
<template>
<div>InputTextVal:{{value.textVal}}</div>
</template>
<script type="text/javascript">
export default {
  name: 'MyComponent',
  props: {
    value: {
      type: Object,
      default () { return {}; }
    }
  }
}
</script>
```

MyEditor.vue
```vue
<template>
  <div>
    <TempleteEditor :tpl-form-elems="tplFormElems" v-model="tplModel" ref="tpl">
      <template v-slot:showComponent>
        <MyComponent v-model="componentModel"/>
      </template>
    </TempleteEditor>
  </div>
</template>
<script type="text/javascript">
import MyComponent from './MyComponent'
import TempleteBinder from 'wbfc-vs-tpl-editor/components/templete-binder'
import TempleteEditor from 'wbfc-vs-tpl-editor/components/templete-editor'

export default {
  name: 'MyEditor',
  mixins: [TempleteBinder],
  components: {
    TempleteEditor,
    MyComponent
  },
  data() {
    return {
      tplFormElems: [{
        type: 'input',
        name: 'textVal',
        label: 'TestTplInput',
      }]
    };
  }
}
</script>
```

## TempleteBinder
### Attributes
参数|说明|类型|必填|可选值|默认值
---|---|---|---|---|---
tplModel|模板数据模型|Object|true|-|{}
tplFormElems|模板元素列表|Array|false|-|[]
componentModel|组件数据模型|Object|true|-|{}

## TempleteEditor 
用于渲染模板页面

### Attributes
参数|说明|类型|必填|可选值|默认值
---|---|---|---|---|---
isEdit|是否为编辑模式。true=显示组件(slot：showComponent)和表单编辑器。false=仅显示组件模板(slot：showTemplete)|boolean|否|true/false|true
value|编辑器的值 可以直接设置，也可以使用v-model绑定|Object|是|-|{}
tplForm|编辑器的表单属性，具体参数说明请参考 [Element UI - 表单](https://element.eleme.cn/#/zh-CN/component/form)|Object|否|-|{labelWidth : '30%', bottomBtns:[]}
tplFormElems|编辑器的表单元素|Array|否|-|[]

### TplFormElems
参数|说明|类型|必填|可选值|默认值
---|---|---|---|---|---
group|分组 设置了group的会在编辑器侧显示分割线|TplFormElems-Group|否|-|-
elems|组元素(分组时有效,仅支持一层分组)|TplFormElems|否|-|-
type|元素类型 默认为输入框 custom为自定义元素，可以通过该元素的插槽 `v-slot:"form_item_" + name` 进行自定义替换 |String|否|input/hidden/radio/radio-group/checkbox/checkbox-group/select/cascader/switch/slider/time-select/time-picker/date-picker/date-time-picker/rate/color-picker/transfer/custom  父元素.type = radio-group / checkbox-group时，子元素.type = radio-button/checkbox-button 有效|input
name|元素名称 默认会按照name映射绑定组件模型 例:{name:'textVal'} 将会绑定 TempleteBinder.componentModel.textVal|String|是|-|-
bind|绑定名称 若带有'.'则会绝对匹配，不带'.'则会相对匹配 例:{name:'textVal', bind: 'act'} 将会绑定 TempleteBinder.componentModel.act.textVal  {name:'textVal', bind: 'act.text'} 将会绑定 TempleteBinder.componentModel.act.text|String|否|-|-
label|元素显示标签|String|否|-|-
visible|元素是否显示 String会按照表达式处理 可以指定为模型的其他属性 例: tplFormElems = [{type: 'switch', name:'textFlag', label:'开关', defVal: true}, {name:'textVal', label:'文字显示联动开关属性', visible: 'textFlag'}]|[String:expression]/boolean/function|否|-|true
defVal|元素默认值 如果模型(value)不指定默认值，也可以通过tplFormElems的这个属性设置|Object|否|-|-
attrs|元素属性 EL组件具体参数说明请参考 [Element UI](https://element.eleme.cn/#/zh-CN/component/installation)|Object|否|-|-
events|元素事件|Object|否|请参考HTML的基础事件和自定义事件|-
items|子元素列表  type=radio/radio-group/checkbox-group/select 时有效|TplFormElems|否|-|-
text| 子元素显示标签  type=radio/radio-group/checkbox/checkbox-group/ 时有效|String|否|-|-

### TplFormElems-Group
参数|说明|类型|必填|可选值|默认值
---|---|---|---|---|---
name|分组的标识|String|是|-|null
label|分组的文字显示，会在分割线正中间显示的提示文字|String|是|-|null

### TempleteEditor  - Slotes
插槽名|说明|参数
---|---|---
showTemplete|非编辑模式下显示的组件|-
showComponent|编辑模式下显示的组件|-
`'form_group_' + name`|分组模块的头分割线|data：tplFormElems[index]
`'form_group_' + name + '_bottom'`|分组模块的尾分割线 默认不显示|data：tplFormElems[index]
`'bottomBtns_' + index`|编辑器最底部按钮|data:bottomBtns
`'form_item_' + name`|元素组件|data:TplFormElems[index]

## 自定义组件
在一些更为复杂的页面中，可能el提供的这些UI组件无法满足你的需求，这样的情况可以使用自定义组件。自定义组件分为：全局组件、编辑器全局组件、局部组件和局部完全自定义组件。

### 全局组件
直接可以使用Vue原生的全局组件设置`Vue.component('component-a', { /* ... */ })` 详细文档请参考 [Vue 组件注册](https://cn.vuejs.org/v2/guide/components-registration.html)

### 编辑器全局组件
这种组件是在`TempleteEditor`标签**_包裹的范围内均可以使用_**的全局组件。你可以在加载`wbfc-vs-tpl-editor`前，用`use`函数注册这些组件。组件要包裹在`components`下 例： `{components: {你import的组件名}}`
```javascript
import WbfcVsTplEditor from 'wbfc-vs-tpl-editor';
import testComp from '../components/testComp';
Vue.use(WbfcVsTplEditor, {
  components: {
    testComp
  }
});

```

### 局部组件
通常的场景下，局部组件的使用场景最多。这种组件只在当前页面和当前页面的`TempleteEditor`包裹的`TplFormElems`元素下生效。你需要在自己的页面中使用import，然后再在覆盖`beforeCreate`函数中使用`Vue.$formItemComponentsManager.addComponent({组件名});`。
``` javascript
<template>
  <div>
    <TempleteEditor :tpl-form-elems="tplFormElems" v-model="tplModel" ref="tpl" :childComp="childComp">
      <template v-slot:showComponent>
        <MyComponent v-model="componentModel" />
      </template>
    </TempleteEditor>
  </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import MyComponent from './MyComponent'
import TempleteBinder from '../src/components/templete-binder'
import TempleteEditor from '../src/components/templete-editor'
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
  }
  ...
}
```

### 局部完全自定义组件
当`TplFormElems[index].type = 'custom'`时，编辑器表单的元素渲染会变成完全自定义的模式，在这样的模式下，必须使用对应的插槽`'form_item_' + name`才能正确的渲染出结果。_**这种组件通常会在只有一个功能使用到了，没有必要制作一个组件的情况下使用**__。
``` javascript
<template>
  <div>
    <TempleteEditor :tpl-form-elems="tplFormElems" v-model="tplModel" ref="tpl" :childComp="childComp">
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
<script type="text/javascript">
import Vue from 'vue'
import MyComponent from './MyComponent'
import TempleteBinder from '../src/components/templete-binder'
import TempleteEditor from '../src/components/templete-editor'

export default {
  name: 'MyEditor',
  mixins: [TempleteBinder],
  components: {
    TempleteEditor,
    MyComponent,
  },
  data() {
    return {
      tplFormElems: [{
        type: 'custom',
        name: 'bgColor',
        label: '局部',
        attrs:{
          text: '完全自定义组件'
        }
      }]
    };
  },
  ...
}

```

## 特有组件库
### link-editor 链接编辑器
它是一个弹出层式的表单交互式组件,必须在弹出的对话框点击确定按钮时手动处理`value`。当编辑器元素中包含有链接，可以直接使用链接编辑器组件。它必须要实现一个`submitDialog`函数，用来处理对话框关闭时的操作，一般这个函数可以做编辑器中组件的回显，如果需要默认值，只要实现events的`open`事件,调用`setValue`函数即可。
```javascript
export default {
  data() {
    return {
      tplFormElems: [{
        type: 'link-editor',
        name: 'linkVal',
        label: '链接',
        defVal: {href: 'https://github.com/xudl33/wbfc-vs-tpl-editor', label: '链接文字', target: '_blank'},
        attrs: {
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
  ...
}
```

#### Attributes
参数|说明|类型|必填|可选值|默认值
---|---|---|---|---|---
dialogProps|编辑对话框属性 具体参数请参考 [Element UI Dialog](https://element.eleme.cn/#/zh-CN/component/dialog)|Object|false|-|{width: '40%'}
editorView|编辑器链接属性 它会映射为编辑器的表单元素显示出来 具体参数请参考 [Element UI Link](https://element.eleme.cn/#/zh-CN/component/link)|Object|false|-|{type: 'primary', underline: false, href: '#'}
viewLabel|编辑器链接文字|String|false|-|'编辑'
dialogTitle|编辑对话框标题 (独立属性，即使设置了dialogProps.title也无效)|String|false|-|'-编辑链接-'
propMapping|编辑器表单映射 默认的表单属性为{label: '显示文字', href: '超链接', target: '跳转类型'} 如果你的模型并不是这种结构，可以设置该项进行映射转换|Object|false|-|{label: 'label',href: 'href',target: 'target'}
defVal|表单默认值 每次弹出对话框时的初始值，它只是一个Object，不会直接绑定到编辑器模型中，如果需要从编辑器模型中传递默认值，必须要实现open事件，再调用`setValue`函数手动赋值|Object|false|-|{}
formProps|编辑器表单属性 [Element UI - 表单](https://element.eleme.cn/#/zh-CN/component/form)|Object|false|-|{rules: {label: [{ required: true, message: '请输入显示文字', trigger: 'blur' }],href: [{ required: true, message: '请输入链接', trigger: 'blur' }],target: [{ required: true, message: '请选择跳转类型', trigger: 'blur' }]}}
submitDialog|对话框点击确定按钮的回调函数 必须通过改函数手动处理编辑器表单值的对应关系|Function|true|-|() => {}

#### Slotes
插槽名|说明|参数
---|---|---
view-label|显示文字|linkEditor:this
footer|底部按钮|linkEditor:this

#### propMapping 编辑器表单映射
```javascript
export default {
  data() {
    return {
      tplFormElems: [{
        type: 'link-editor',
        name: 'linkVal',
        label: '链接',
        defVal: {link: 'https://github.com/xudl33/wbfc-vs-tpl-editor', text: '链接文字', type: '_blank'},
        attrs: {
          propMapping: { // 不是默认结构的数据，需要对表单进行映射转换
             href: 'link',
             label: 'text',
             target: 'type'
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
  ...

```


### list-sort-editor 列表排序编辑器
它是一个可以直接对列表进行排序操作的编辑器。默认四个按钮，【向上移动】【向下移动】【移动到最前】【移动到最后】。它不是默认的编辑器全局组件，使用前需要`import`到你的vue中。
```vue
<template>
  <div>
          <el-table ref="multipleTable" :data="tplModel.categoryList" style="width:100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="text" label="分类名">
            </el-table-column>
            <el-table-column label="排序">
              <template slot-scope="scope">
                <ListSortEditor v-model="tplModel.categoryList" :index="scope.$index"/>
              </template>
            </el-table-column>
          </el-table>
  </div>
</template>
<script type="text/javascript">
import ListSortEditor from 'wbfc-vs-tpl-editor/components/list-sort-editor'
export default {
  components: {
    ListSortEditor,
  },
  data:{
    return {
    tplModel: {
        categoryList: [{
            text: '分类1',
            href: '/'
          },
          {
            text: '分类2',
            href: '/'
          },
          {
            text: '分类3',
            href: '/'
          },
          {
            text: '分类4',
            href: '/'
          },
          {
            text: '分类5',
            href: '/'
          }
        ]
    }
   };
  }
  ...
}
</script>
```
#### Attributes
参数|说明|类型|必填|可选值|默认值
---|---|---|---|---|---
value|需要排序的列表|Array|true|-|-
index|当前值索引|int|true|-|-
btns|排序按钮|Object|false|-|{up: {type: 'text',icon: 'el-icon-arrow-up',title: '向上移动',enabled: true},down: {type: 'text',title: '向下移动',icon: "el-icon-arrow-down",enabled: true},top: {type: 'text',title: '移动到最前',icon: "el-icon-top",enabled: true},bottom: {type: 'text',title: '移动到最后',icon: "el-icon-bottom",enabled: true}}
loop|是否循环排序 默认列表的第一个点击【向上移动】不会有效果，列表的最后一个点击【向下移动】也不会有效果。 如果开启该项，列表的第一个点击【向上移动】会变成最后一个，列表的最后一个点击【向下移动】会变成第一个|Boolean|false|true/false|false

#### btns
参数|说明|类型|必填|可选值|默认值
---|---|---|---|---|---
type|按钮类型 具体参数请参考 [Element UI Button](https://element.eleme.cn/#/zh-CN/component/button)|String|true|-|text
icon|按钮图标 具体参数请参考 [Element UI Icon](https://element.eleme.cn/#/zh-CN/component/icon)|String|true|-|-
title|按钮鼠标悬停提示|String|false|-|-
enabled|按钮是否可用 如果为false则该按钮不可见|Boolean|true|true/false|true

#### Slotes
插槽名|说明|参数
---|---|---
up|向上移动|index:index
down|向下移动|index:index
top|移动到最前|index:index
bottom|移动到最后|index:index


#### 不显示按钮
设置`btns`属性可以控制按钮是否可见。例： 不显示【移动到最前】【移动到最后】两个按钮。
```vue
<template>
  <div>
          <el-table ref="multipleTable" :data="tplModel.categoryList" style="width:100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="text" label="分类名">
            </el-table-column>
            <el-table-column label="排序">
              <template slot-scope="scope">
                <ListSortEditor v-model="tplModel.categoryList" :index="scope.$index" :btns="{top:{enabled:false}, bottom:{enabled:false}}"/>
              </template>
            </el-table-column>
          </el-table>
  </div>
</template>
<script type="text/javascript">
import ListSortEditor from 'wbfc-vs-tpl-editor/components/list-sort-editor'
export default {
  components: {
    ListSortEditor,
  }
  ...
}
</script>
```

#### 自定义按钮
在一些特殊场合下，默认的样式并不能满足需求，这时可以自定义操作按钮。例：自定义【向上移动】和【向下移动】同时不显示【移动到最前】【移动到最后】两个按钮。
```vue
<template>
  <div>
          <el-table ref="multipleTable" :data="tplModel.categoryList" style="width:100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="text" label="分类名">
            </el-table-column>
            <el-table-column label="排序">
              <template slot-scope="scope">
                <ListSortEditor v-model="tplModel.categoryList" :index="scope.$index" :btns="{top:{enabled:false}, bottom:{enabled:false}}">
                  <template v-slot:up="sc">
                      <div><span>UP</span></div>
          </template>
                  <template v-slot:down="sc">
                      <div><span>DOWN</span></div>
          </template>
                </ListSortEditor>
              </template>
            </el-table-column>
          </el-table>
  </div>
</template>
<script type="text/javascript">
import ListSortEditor from 'wbfc-vs-tpl-editor/components/list-sort-editor'
export default {
  components: {
    ListSortEditor,
  }
  ...
}
</script>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
