<template>
    <NuxtLink class="block w-[calc(25%-12px)]"
              :to="`/artist/${artist.name}`"
    >
        <div class="w-full border border-solid border-grey aspect-square flex items-center justify-center text-violet text-3xl">
            {{ shortName }}
        </div>
<!--        <img class="w-full"-->
<!--             :src="imageUrl"-->
<!--             :alt="`${artist.name} photo`"-->
<!--        >-->
        <p class="my-2 text-xl text-violet">
            {{ artist.name }}
        </p>
    </NuxtLink>
</template>

<script setup lang="ts">

import {type ArtistPreview} from "@/types/artist"

const { artist } = defineProps<{
    artist: ArtistPreview,
}>()

const shortName = computed(() => {
    return artist.name
        .split(' ')
        .filter(word => word.length > 0)
        .reduce((acc, word) => {
        return acc += word[0]?.toUpperCase()
    }, '')
})
</script>

<style>
</style>