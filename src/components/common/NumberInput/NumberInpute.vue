<template>
  <a-input
    type="text"
    v-model:value="currentValue"
    :disabled="props.disabled"
    @input="changeFn"
    @blur="blur"
    @focus="focus"
    autofocus
    :class="{ 'eco-number-empty': emptyState }"
    class="eco-number-input"
    :bordered="!noBorder"
    :style="noBorder ? 'border: none; outline: none; box-shadow: none' : ''"
  />
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    decimal?: boolean; // 是否是小数
    max?: number; // 最大值
    min?: number; // 最小值
    maxLength?: number; // 最大的位数
    disabled?: boolean; // 禁用
    must?: boolean; // 必填
    type?: 'see' | 'editor'; //  查看或者编辑
    noBorder?: boolean; // 无边框模式
  }>(),
  {
    decimal: false,
    modelValue: '',
    must: false,
    type: 'editor',
    noBorder: false,
  },
);

const emptyState = ref(false); // 是否是警告状态
const currentValue: any = ref(''); // 当前值
const historyValue = ref(''); // 历史值值

const emits = defineEmits(['update:modelValue', 'focus', 'blur']);

const changeFn = (event: any) => {
  const negative = event.target.value[0] == '-';
  if (props.decimal) {
    currentValue.value = event.target.value.replace(/[^\d.]/gi, '');
    if (/\./.test(currentValue.value)) {
      // 存在小数点，判断小数点的个数
      const reg = /\./g;
      const arr = currentValue.value.match(reg);
      if (arr && arr.length > 1) {
        const arrList = currentValue.value.split('.');
        currentValue.value = Number(arrList[0]) + '.' + arrList[1].slice(0, 2);
      } else {
        /** 只有一个小数点, 或者没有小数点 */
        const arrList = currentValue.value.split('.');
        currentValue.value = Number(arrList[0]) + '.' + arrList[1].slice(0, 2);
        if (
          ((props.max || props.max === 0) && Number(currentValue.value) > props.max) ||
          ((props.min || props.min === 0) && Number(currentValue.value) < props.min) ||
          ((props.maxLength || props.maxLength === 0) && currentValue.value.split('.')[0].length > props.maxLength)
        ) {
          currentValue.value = historyValue.value;
        }
      }
    } else {
      /**限制， */
      if (
        ((props.max || props.max === 0) && Number(currentValue.value) > props.max) ||
        ((props.min || props.min === 0) && Number(currentValue.value) < props.min) ||
        ((props.maxLength || props.maxLength === 0) && currentValue.value.length > props.maxLength)
      ) {
        currentValue.value = historyValue.value;
      }
      if (currentValue.value || currentValue.value == '0') {
        currentValue.value = '' + Number(currentValue.value);
      }
    }
  } else {
    /** 整数 */
    currentValue.value = event.target.value.replace(/\D/gi, '');
    /**限制， */
    if (
      ((props.max || props.max === 0) && Number(currentValue.value) > props.max) ||
      ((props.min || props.min === 0) && Number(currentValue.value) < props.min) ||
      ((props.maxLength || props.maxLength === 0) && currentValue.value.length > props.maxLength)
    ) {
      currentValue.value = historyValue.value;
    }
    if (currentValue.value || currentValue.value == '0') {
      currentValue.value = Number(currentValue.value) + '';
    }
  }
  console.log('currentValue', currentValue.value);
  historyValue.value = currentValue.value;
  currentValue.value = (negative ? '-' : '') + currentValue.value;
  emits('update:modelValue', currentValue.value);
};
const getTwoNumberString = (data: any) => {
  const str = String(data) + '00';
  return str.slice(0, 2);
};

/** 根据值，设置小数的各式 */
const getDecimalNumber = (data: any) => {
  if (!data && data !== 0) {
    currentValue.value = data;
    return;
  }
  const str = String(data);
  if (props.decimal) {
    if (/\./.test(str)) {
      const arrList = str.split('.');
      currentValue.value = Number(arrList[0]) + '.' + getTwoNumberString(arrList[1]);
    } else {
      currentValue.value = str + '.00';
    }
  } else {
    currentValue.value = str;
  }
  emits('update:modelValue', currentValue.value);
};
const focus = (e: any) => {
  if (props.type == 'editor') {
    /** 获取焦点的时候，清空红色边框警告 */
    const className = e.target.className;
    if (className.includes('eco-number-empty')) {
      nextTick(() => {
        e.target.className = className.replace('eco-number-empty', '');
      });
    }
    emits('focus', e);
  } else {
    e.target.blur();
  }
};

const blur = (event: any) => {
  if (props.type == 'editor') {
    if (props.must) {
      emptyState.value = !currentValue.value && currentValue.value !== 0 ? true : false;
      nextTick(() => {
        const className = event.target.className;
        if (emptyState.value && !event.target.className.includes('eco-number-empty')) {
          event.target.className = className + ' eco-number-empty';
        }
      });
    }
    getDecimalNumber(currentValue.value);
    emits('blur', event);
  }
};

watch(
  () => props.modelValue,
  (value: string | number) => {
    if (value + '' !== currentValue.value) {
      getDecimalNumber(value);
      if (currentValue.value || currentValue.value === 0) {
        emptyState.value = false;
      }
    }
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  //
});
</script>
<style lang="less" scoped>
.eco-number-input {
  height: 100%;
  width: 100%;
  transition: all 0.3s;
}
.ant-input {
  background-color: #ffffff !important;
  box-shadow: none;
}
.ant-input[disabled] {
  background-color: #ffffff !important;
}
.eco-number-empty {
  border: 1px solid #f00 !important;
}
</style>
