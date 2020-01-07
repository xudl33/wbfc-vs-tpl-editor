<script type="text/javascript">
import initEditors from './init-editors'
var diyComponents = {};
var addComponent = function(com){
  for(var i in com){
   diyComponents[i] = com[i];
  }
};
// 表单项组件管理器
export default {
  name: 'FormItemComponentsManager',
  components: diyComponents,
  data(){
    return {
    };
  },
  methods:{
    addComponent: addComponent
  },
  install(Vue, options){
    //console.log(options);
    //console.log(diyComponents);
    this.options = Object.assign({}, options);
    Vue.$formItemComponentsManager = this;
    Vue.$formItemComponentsManager.addComponent = addComponent;
    // initEditors添加到编辑器全局组件
    addComponent(initEditors);
    // 添加自定义组件到编辑器
    addComponent(this.options.components);
  }
}
</script>