<template>
  <div>{{ttext}}:<input type="text" v-bind="$attrs" @input="handleInput" @change="handleChange" ref="input" @focus="handleFocus"></div>
</template>
<script type="text/javascript">
export default {
  name: 'test',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    ttext: {
      type: String,
      default: 'attr测试'
    }
  },
  data() {
    return { radio: 3 };
  },
  computed: {
    nativeInputValue: function() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    }
  },
  watch: {
    value(val) {
        //this.dispatch('ElFormItem', 'el.form.change', [val]);
    },
    nativeInputValue() {
      this.setNativeInputValue();
    }
  },
  methods: {
    setNativeInputValue() {
      const input = this.$refs.input;
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
     handleFocus(event) {
      this.$emit('focus', event);
    },
    handleInput(event) {
      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return;
      this.$emit('input', event.target.value);
      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      //this.$nextTick(this.setNativeInputValue);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
  },
  created() {
    console.log('test value = %o', this.value);
  },
  mounted() {
    this.setNativeInputValue();
    /*const input = this.$refs.input;
    input.value = this.value;*/
  }
}

</script>
