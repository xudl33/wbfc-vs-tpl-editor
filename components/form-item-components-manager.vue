<script type="text/javascript">
/*import test from '../../examples/test'*/
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
  /*beforeCreate(){
    diyComponents = 
    diyComponents = this.diy;
  },*/
  install(Vue, options){
    //console.log(options);
    //console.log(diyComponents);
    this.options = Object.assign({}, options);
    Vue.$formItemComponentsManager = this;
    Vue.$formItemComponentsManager.addComponent = addComponent;
    /*this.diyComponents = this.options.components;*/
    addComponent(this.options.components);
/*    for(var i in this.options.components){
       diyComponents[i] = this.options.components[i];
    }*/
    //console.log(diyComponents);
  }
}
</script>