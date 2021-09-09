## 更新日志

### 0.1.9
- 修正使用elem传值插槽时无法获得作用域的问题；
- 修正动态渲染的插槽无法获取作用域内属性的问题；
- 增加获取组件内部插槽的refs的功能；

### 0.1.8
- 修正当type不写按照默认的input初始化组件时报错找不到$emit的bug；
### 0.1.7

*2021-09-03*

- 增加了group.elems节点无限嵌套的功能；
- 修正了由于elems节点无限嵌套带来的数据结构和解析的一系列问题；
- 修正toggleVisible缺少无限嵌套判断的bug；
- 增加toggleVisible事件的回调参数this；

### 0.1.6

*2021-08-26*

- 修正无法添加自定义组件的默认插槽(slot)的bug
- 优化了默认form_item种类的插槽的传值方式(由静态改为动态)
- 增加自定义组件的具名插槽数据解析的功能(可以使用elems.slot在插槽中可以使用vue模板和标签)
- 增加helps显示器为mavon-editor和div

### 0.1.5

*2021-08-25*

- 修正了某些非编辑器模式下无法正确回调toggleVisible的bug
- 修改toggleVisible的方式 原为this.$parent触发，现在是form-item-editor触发
- 合并`invisibleNoBind`和`invisibleNoBindHoleModel`选项为`invisibleNoBindType`

### 0.1.4

*2021-08-20*

- 自定义组件增加一个props = item，item为tplFormElems的一个正常节点或一个group节点的elems中的一个
- item增加autoBind、bindType、bindFunc、invisibleNoBind、invisibleNoBindHoleModel属性和功能
- 修复templete-editor.getItemVue函数无法获取到子组件的bug

### 0.1.3

*2021-08-17*

- 替换link-editor中的lodash模块；
### 0.1.2

*2021-08-06*

- 替换`import _ from 'lodash'`为对应模块import;删除无用的Vue导入；

### 0.1.1

*2021-08-02*

- list-sort-editor增加change事件触发；templete-binder增加数据项删除的功能；修复group.visible=false时，子元素依然显示的问题；
### 0.1.0

*2021-07-28*

- 修复多选按钮组只能实现一个的BUG；修复element-ui多选按钮组绑定值为空时会报错的bug；修复单选按钮和单选按钮组名称重复的警告；
### 0.0.9

*2021-07-09*

- 修正form-item-editor设置helps后帮助文件无法打开的问题；
### 0.0.8

*2021-06-22*

- 增加动态表单的tplFormElems[].formItemAttrs项，并自动绑定label和prop属性；

### 0.0.7

*2021-04-07*

- 增加动态表单的label插槽和tplFormElems[].helps项；

### 0.0.6

*2021-03-31*

- 修正多层级的bind无法正确绑定model值的问题；增加mavon-editor(未完成)；

### 0.0.5

*2020-01-07*

- 增加默认的编辑器全局组件
- Readme增加编辑器组件库的说明


### 0.0.4

*2020-01-03*

修正package.json index的配置位置

### 0.0.3

*2020-01-03*

#### Bug fixes
- templete-editor
  - 修正了Duplicate keys detected: 'tplForm_group_'.的警告

### 0.0.2

*2020-01-03*

修正package.json文件缺少index的配置

### 0.0.1

*2020-01-03*

初始化上传