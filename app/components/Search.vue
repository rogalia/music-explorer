<template>
    <div class="w-full flex align-center">
        <div class="w-full rounded-full bg-purple py-4 px-6 relative">
            <input class="w-full outline-none bg-purple"
                   placeholder="Type the name of artist"
                   :value="modelValue"
                   @input="emit('update:modelValue', $event.target.value)"

            />
        </div>

        <BaseButton class="ml-2 rounded-full px-8"
                    outlined
                    @click="emit('searchClick')"
        >
            Search
        </BaseButton>
    </div>
</template>

<script setup lang="ts">
const { modelValue } = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string],
    searchClick: []
}>()
</script>