<template>
  <div>
    <mavon-editor v-model="value" />
  </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor);

export default {
  name: 'mavon-editor',
  data() {
    return {
      value: ''
    };
  },
  components:{
    mavonEditor
  },
  /*beforeCreate(){
    Vue.use(mavonEditor);
  }*/
}

</script>
