<template>
    <button class="block px-2 py-1 bg-purple rounded-[4px] cursor-pointer"
            :class="{
                'px-5 py-3 rounded-[8px] text-l': big,
                'bg-transparent border border-solid border-grey': outlined
            }"
            @click.prevent="handleClick()"
    >
        <slot>
            {{ label }}
        </slot>
    </button>
</template>

<script setup lang="ts">
const { label, big, outlined } = defineProps<{
    label?: string,
    big?: boolean,
    outlined?: boolean,
}>()

const emit = defineEmits(['click'])

function handleClick() {
    emit('click')
}
</script>
