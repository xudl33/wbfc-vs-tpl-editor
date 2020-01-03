<template>
  <div>
    <div class="list-sort-item" @click="sortList(-1)" v-if="mergeBtns.up.enabled" :title="mergeBtns.up.title">
      <slot name="up" :index='index'>
        <el-button v-bind="mergeBtns.up">
          {{mergeBtns.up.label}}
        </el-button>
      </slot>
    </div>
    <div class="list-sort-item" @click="sortList(1)" v-if="mergeBtns.down.enabled" :title="mergeBtns.down.title">
      <slot name="down" :index='index'>
        <el-button v-bind="mergeBtns.down">
          {{mergeBtns.down.label}}
        </el-button>
      </slot>
    </div>
    <div class="list-sort-item" @click="toTop" v-if="mergeBtns.top.enabled" :title="mergeBtns.top.title">
      <slot name="top" :index='index'>
        <el-button v-bind="mergeBtns.top">
          {{mergeBtns.top.label}}
        </el-button>
      </slot>
    </div>
    <div class="list-sort-item" @click="toBottom" v-if="mergeBtns.bottom.enabled" :title="mergeBtns.bottom.title">
      <slot name="bottom" :index='index'>
        <el-button v-bind="mergeBtns.bottom">
          {{mergeBtns.bottom.label}}
        </el-button>
      </slot>
    </div>
  </div>
</template>
<style type="text/css" scoped="">
.list-sort-item {
  display: inline-block;
}

</style>
<script type="text/javascript">
export default {
  name: 'ListSortEditor',
  data() {
    return {
      defBtns: {
        up: {
          type: 'text',
          icon: 'el-icon-arrow-up',
          title: '向上移动',
          enabled: true
        },
        down: {
          type: 'text',
          title: '向下移动',
          icon: "el-icon-arrow-down",
          enabled: true
        },
        top: {
          type: 'text',
          title: '移动到最前',
          icon: "el-icon-top",
          enabled: true
        },
        bottom: {
          type: 'text',
          title: '移动到最后',
          icon: "el-icon-bottom",
          enabled: true
        }
      }
    };
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    btns: {
      type: Object,
      default () {
        return {};
      }
    },
    loop: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mergeBtns() {
      // 合并form表单props
      var props = {};
      _.merge(props, this.defBtns, this.btns);
      return props;
    }
  },
  methods: {
    sortList(val) {
      if (!this.value || this.value.length == 0) {
        return;
      }
      var doVal = this.index + val;

      // 第一个和最后一个不需要移动
      if (doVal < 0 || doVal >= this.value.length) {
        // 如果配置了循环属性的话 需要特殊处理
        if (this.loop) {
          // 第一个向上移动变成最后一个
          if (doVal < 0) {
            // shift把数组的第一个元素从其中删除，并返回第一个元素的值
            this.value.push(this.value.shift());
          }
          // 最后一个向下移动变成第一个
          if (doVal >= this.value.length) {
            // unshift 向数组的开头添加一个或更多元素，并返回新的长度。
            this.value.unshift(this.value.splice(this.index, 1)[0]);
          }
          return;
        }
        return;
      }
      // 互换位置 [1, 2, 3] -> [1, 1, 3] -> [2, 1, 3]
      this.value[this.index] = this.value.splice(this.index + val, 1, this.value[this.index])[0];
    },
    toTop() {
      // 已经是第一个不用动
      if (this.index <= 0) {
        return;
      }
      // unshift 向数组的开头添加一个或更多元素，并返回新的长度。
      this.value.unshift(this.value.splice(this.index, 1)[0]);
    },
    toBottom() {
      // 已经是最后一个不用动
      if (this.index === this.value.length - 1) {
        return;
      }
      // 移动到最后
      this.value.push(this.value.splice(this.index, 1)[0]);
    }
  },
  created() {

  }
}

</script>
<style type="text/css" scoped>
</style>
