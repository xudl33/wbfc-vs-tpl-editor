<script>
import Vue from 'vue';
export default {
    name: 'TemplateRender',
    props: {
        value: {
            type: Object,
            required: true,
            default () {
                // {
                //     name: '', // 具名插槽使用的名称
                //     component: null, // 组件 {template: ''} 模板字符串对应<template>节点
                //     params: null, // 组件的数据对象
                //     VNodes:[], // 组件的子节点
                // }
                return {};
            }
        },
    },
    render: function (h) {
        // 创建构造器
        let profile = Vue.extend(this.value.component || {});
        let params = Object.assign({}, this.value.params);
        // https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0
        return this.$createElement(profile, params || {}, this.$scopedSlots);
    },
};
</script>
