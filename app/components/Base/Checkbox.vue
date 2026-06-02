<template>
    <label class="
               text-lg text-white-secondary cursor-pointer pl-7 relative rounded-[4px]
               before:absolute before:w-5 before:h-5 before:border before:border-solid
               before:border-grey before:left-0 before:top-[4px] before:rounded-[4px]
           "
           :class="{
               [`before:border-violet before:bg-violet before:text-white before:content-['✔']
                before:text-base before:pl-[2px] before:leading-[20px]`]: modelValue
           }"
    >
        <input type="checkbox"
               hidden
               :value="modelValue"
               @input="emit('update:modelValue', $event.target.value)"
        >
        <slot>
            {{ label }}
        </slot>
    </label>
</template>

<script setup lang="ts">
const { modelValue, label } = defineProps<{
    modelValue: boolean,
    label?: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: boolean],
}>()
</script>