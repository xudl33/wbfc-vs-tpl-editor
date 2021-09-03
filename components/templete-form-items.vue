<template>
<div>

    <!-- 包含group就说明是分组类型 -->
    <template v-if="item.group">
        <slot :name="'form_group_' + item.group.name" :data='item' v-if="isVisible(item.group.visible)">
            <el-divider>{{item.group.label}}</el-divider>
        </slot>
        <div v-for="(gm, i) in item.elems" :key="'tplForm_group_' + _uid + '_' + i">
            <template v-if="gm.group">
                <templete-form-items :item="gm || []" v-model="value"></templete-form-items>
            </template>
            <template v-else>
                <FormItemEditor :binForm="value" :value="gm" :visable="isVisible(item.group.visible) && isVisible(gm.visible)" :key="'form_item_editor_group_' + _uid + '_' + gm.name" :ref="'itemEditor_' + gm.name">
                    <template v-for="s in scopedSlotsList" :slot="s.name">
                        <slot :name="s.name" :data="gm" :group="item"></slot>
                    </template>
                </FormItemEditor>
            </template>
        </div>
        <slot :name="'form_group_' + item.group.name + '_bottom'" :data='item' v-if="isVisible(item.group.bottom?item.group.bottom.visible:false)">
            <el-divider></el-divider>
        </slot>
    </template>
    <template v-else>
        <FormItemEditor :binForm="value" :value="item" :visable="isVisible(item.visible)" :key="'form_item_editor' + item.name" :ref="'itemEditor_' + item.name">
            <template v-for="s in scopedSlotsList" :slot="s.name">
                <slot :name="s.name" :data="item"></slot>
            </template>
        </FormItemEditor>
    </template>
</div>
</template>

<script>
import _isEmpty from 'lodash/isEmpty';
import FormItemEditor from './form-item-editor';
export default {
    name: 'templete-form-items',
    components: {
        FormItemEditor
    },
    data() {
        return {
            scopedSlotsList: [], // 插槽列表
        };
    },
    props: {
        value: {
            type: Object,
            required: true,
            default () {
                return {}
            }
        },
        item: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    methods: {
        isVisible(vis) {
            let typ = typeof vis;
            // 如果是布尔值
            if ('boolean' === typ) {
                return vis;
            }

            // 如果是表达式
            if (typeof vis === 'function') {
                let express = vis.call(this);
                return this.isVisible(express);
            }

            let isEmpty = _isEmpty(vis);
            if (isEmpty) {
                return true;
            }

            // 如果是字符串
            if (typeof vis === 'string') {
                // 如果是字符串函数
                if (/function[\s]*\(/.test(vis) || /\)[\s]*=>[\s]*\{/.test(vis)) {
                    return this.isVisible(new Function(`return ${vis}`).call(this));
                }
                let express = this.value[vis];
                return this.isVisible(express);
            }

            return true;
        },
        getVue(name) {
            if (!name) {
                return;
            }
            let itemEditor = this.$refs['itemEditor_' + name];
            if (itemEditor) {
                if (Array.isArray(itemEditor)) {
                    return itemEditor[0].getVue();
                }
                return itemEditor.getVue();
            }
            return;
        }
    },
    mounted() {
        // 初始化结束后将插槽列表向子组件传递
        Object.keys(this.$scopedSlots).forEach(s => {
            this.scopedSlotsList.push({
                'name': s
            });
        });
    }
}
</script>
