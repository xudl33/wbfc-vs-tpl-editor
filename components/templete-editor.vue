<template>
<div class="templete-editor">
    <!-- 非编辑模式 -->
    <el-row v-if="!isEdit">
        <slot name="showTemplete"></slot>
    </el-row>
    <!-- 编辑器模式 -->
    <el-row v-if="isEdit">
        <!-- 编辑器可见区域 -->
        <el-col class="tpl-viewer-container">
            <slot name="showComponent"></slot>
        </el-col>
        <!-- 编辑器表单区域 -->
        <el-col class="tpl-editor-container">
            <div>
                <el-form ref="tplForm" :model="value" v-bind="mergeTplForm" class="tpl-editor-form">
                    <template v-for="(item, index) in tplFormElems">
                        <!-- 包含group就说明是分组类型 -->
                        <template v-if="item.group">
                            <slot :name="'form_group_' + item.group.name" :data='item' v-if="isVisible(item.group.visible)">
                                <el-divider>{{item.group.label}}</el-divider>
                            </slot>
                            <div v-for="(gm, i) in item.elems" :key="'tplForm_group_' + index + '_' + i">
                                <FormItemEditor :binForm="value" :value="gm" :visable="isVisible(item.group.visible) && isVisible(gm.visible)" :key="'form_item_editor_group_' + index + '_' + gm.name" :ref="'itemEditor_' + gm.name">
                                    <template :slot="'form_item_label_' + item.name">
                                        <slot :name="'form_item_label_' + item.name" :data="item"></slot>
                                    </template>
                                    <template :slot="'form_item_' + gm.name">
                                        <slot :name="'form_item_' + gm.name" :data="gm"></slot>
                                    </template>
                                </FormItemEditor>
                            </div>
                            <slot :name="'form_group_' + item.group.name + '_bottom'" :data='item' v-if="isVisible(item.group.bottom?item.group.bottom.visible:false)">
                                <el-divider></el-divider>
                            </slot>
                        </template>
                        <template v-else>
                            <FormItemEditor :binForm="value" :value="item" :visable="isVisible(item.visible)" :key="'form_item_editor' + item.name" :ref="'itemEditor_' + item.name">
                                <template :slot="'form_item_label_' + item.name">
                                    <slot :name="'form_item_label_' + item.name" :data="item"></slot>
                                </template>
                                <template :slot="'form_item_' + item.name">
                                    <slot :name="'form_item_' + item.name" :data="item"></slot>
                                </template>
                            </FormItemEditor>
                        </template>
                    </template>
                    <!-- 按钮组 -->
                    <el-form-item v-if="mergeTplForm.bottomBtns && mergeTplForm.bottomBtns.length > 0">
                        <slot v-for="(item, index) in mergeTplForm.bottomBtns" :name="'bottomBtns_' + index" :data="mergeTplForm.bottomBtns">
                            <el-button v-bind="item" v-on="item.events?item.events:null">{{item.label}}</el-button>
                        </slot>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import _isEmpty from 'lodash/isEmpty';
import _merge from 'lodash/merge';
import FormItemEditor from './form-item-editor';
export default {
    name: 'TempleteEditor', // 模板编辑器
    components: {
        FormItemEditor
    },
    data() {
        return {
            defTplForm: {
                labelWidth: "30%", // 默认表单文字列宽
                bottomBtns: []
            },
            itemsVisible: {}, // 组件可见性
        };
    },
    props: {
        isEdit: {
            type: Boolean,
            default () {
                return true;
            }
        },
        value: {
            type: Object,
            required: true,
            default () {
                return {}
            }
        },
        tplForm: {
            type: Object,
            default () {
                return {};
            }
        },
        tplFormElems: {
            type: Array,
            default () {
                return;
            }
        }
    },
    computed: {
        mergeTplForm() {
            // 合并form表单props
            var props = {};
            _merge(props, this.defTplForm, this.tplForm);
            return props;
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

            // 如果是表达式
            if (typeof vis === 'string') {
                let express = this.value[vis];
                return this.isVisible(express);
            }

            return true;
        },
        getEditorForm() {
            return this.$refs.tplForm;
        },
        validate() {
            let res = false;
            this.$refs.tplForm.validate((valid) => {
                res = valid;
            });
            return res;
        },
        resetFields() {
            this.$refs.tplForm.resetFields();
        },
        clearValidate() {
            this.$refs.tplForm.clearValidate();
        },
        getItemVue(name) {
            if (!name) {
                return;
            }
            let itemEditor = this.$refs['itemEditor_' + name];
            if (itemEditor && itemEditor[0]) {
                return itemEditor[0].getVue();
            }
            return;
        }
    },
    created() {
        //console.log("%s.$scopedSlots = %o", 'TempleteEditor', this.$scopedSlots);
        //console.log("%s.$slots = %o", 'TempleteEditor', this.$slots);
    }
}
</script>

<style scoped>
.templete-editor {
    --pageViewHeight: 55rem;
    height: var(--pageViewHeight);
    --viwer-width: 65%;
}

.tpl-viewer-container {
    max-height: var(--pageViewHeight);
    overflow-y: auto;
    width: var(--viwer-width);
}

.tpl-editor-container {
    max-height: var(--pageViewHeight);
    overflow-y: auto;
    width: calc(100% - var(--viwer-width));
}
</style>
