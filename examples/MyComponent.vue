<template>
  <div>
    <div>InputTextVal:{{value.textVal}}</div>
    <div>InputTextVal:{{value.diyTest}}</div>
  </div>
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
