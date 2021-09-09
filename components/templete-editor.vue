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
                        <templete-form-items :item="item" v-model="value" :key="'tplForm_items_' + index" :ref="'tplForm_items_' + index">
                            <template v-for="s in scopedSlotsList" :slot="s.name">
                                <slot :name="s.name"></slot>
                            </template>
                        </templete-form-items>
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
import TempleteBase from './templete-base';
import TempleteFormItems from './templete-form-items.vue';
export default {
    name: 'TempleteEditor', // 模板编辑器
    extends: TempleteBase,
    components: {
        TempleteFormItems
    },
    data() {
        return {
            defTplForm: {
                labelWidth: "30%", // 默认表单文字列宽
                bottomBtns: []
            },
            scopedSlotsList: [], // 插槽列表
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
        getItemVue(name, refName) {
            if (!name) {
                return;
            }
            let path = this.getNodePathByName(this.tplFormElems, name);
            if (_isEmpty(path)) {
                return;
            }
            let tempPath = path;
            if (tempPath.indexOf('.') > -1) {
                tempPath = path.substring(0, path.indexOf('.'));
            }
            let index = parseInt(tempPath.replace('[', '').replace(']', ''));
            let itemEditor = this.$refs['tplForm_items_' + index];
            if (itemEditor && itemEditor[0]) {
                return itemEditor[0].getVue(name, refName);
            }
            return;
        }
    },
    created() {

        //console.log("%s.$scopedSlots = %o", 'TempleteEditor', this.$scopedSlots);
        //console.log("%s.$slots = %o", 'TempleteEditor', this.$slots);
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
