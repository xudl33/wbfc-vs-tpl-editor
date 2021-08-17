## 更新日志
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