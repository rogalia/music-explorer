<template>
    <BaseCheckbox v-for="option in options"
                  :key="option.value"
                  :label="option.label"
                  :modelValue="model.includes(option.value)"
                  @update:modelValue="selectOption(option.value)"
    />
</template>

<script setup lang="ts">
import { type Option } from "@/types/options"

const { options } = defineProps<{
    options: Option[]
}>()

const model = defineModel<string[]>({
    required: true,
})

function selectOption(value: string) {
    model.value = model.value.includes(value)
        ? model.value.filter(item => item !== value)
        : [...model.value, value]
}
</script>