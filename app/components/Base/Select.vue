<template>
    <Multiselect :classes="{
                     container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer rounded text-base leading-snug outline-none ' +
                     'bg-transparent border border-solid border-grey text-white',
                     tag: 'text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap min-w-0 rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1 ' +
                     'bg-violet',
                     optionPointed: 'bg-soft-purple text-black',
                     tagsSearchWrapper: 'relative mx-1 mb-1 h-full w-full pt-2 pb-2',
                     tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full ' +
                     'bg-transparent',
                     dropdown: 'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border -mt-px overflow-y-scroll z-50 flex flex-col rounded-b ' +
                     'border border-solid border-grey bg-transparent',
                     dropdownHidden: 'hidden',
                 }"
                 :modelValue="modelValue"
                 :options="options"
                 :mode="mode"
                 :searchable="searchable"
                 :attrs="{ placeholder: 'Search...' }"
                 valueProp="value"
                 label="label"
                 @change="changeValue"
    />
</template>

<script setup lang="ts">
import { type Option } from "@/types/options"

import Multiselect from '@vueform/multiselect'

const {
    modelValue,
    options,
    mode = 'tags',
    searchable = true
} = defineProps<{
    modelValue: string | string[],
    options: Option[],
    mode?: 'single' | 'multiple' | 'tags',
    searchable?: boolean,
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string[]],
}>()

function changeValue(value: string | string[]) {
    const normalized = Array.isArray(value) ? value : [value]

    emit('update:modelValue', normalized)
}
</script>

<style src="../../../node_modules/@vueform/multiselect/themes/default.css"></style>