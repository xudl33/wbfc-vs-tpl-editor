<template>
  <div>
    <MyEditor/>
    <a href="/loc">11</a>
  </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import MyEditor from './MyEditor'
export default {
  name: 'init',
  components:{
    MyEditor
  },
  /*components: {
    test2
  },*/
  data() {
    return { };
  },
  created() {
    /*this.addComponent(test2);
    */
    //console.log(this.components);
  }
}

</script>
