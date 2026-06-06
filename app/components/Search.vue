<template>
    <div class="w-full rounded-full bg-purple py-4 px-6 relative">
        <input class="w-full outline-none bg-purple"
               placeholder="Type the name of artist"
               v-model="model"
        />
    </div>
</template>

<script setup lang="ts">
const model = defineModel('modelValue', { required: true })
</script>