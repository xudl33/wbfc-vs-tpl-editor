<script>
import Vue from 'vue';
import _merge from 'lodash/merge';
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
        let component = Object.assign({}, this.value.component);
        let comData = {};
        if (component.data && typeof component.data === 'function') {
            comData = component.data();
        }
        _merge(component, {
            data: () => {
                return Object.assign(comData, this.$attrs);
            }
        });

        let profile = Vue.extend(component || {});
        let params = Object.assign({}, this.value.params);

        // https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0
        return this.$createElement(profile, params || {}, this.$scopedSlots);
    },
};
</script>
