<template>
    <div v-if="pending">
        loading
    </div>
    <div v-else-if="error">
        {{ error?.message }}
    </div>
    <div v-else>
        {{ artist }}
    </div>
</template>

<script setup lang="ts">
import {getArtistInfo} from '@/services/artist'

const route = useRoute()

const { data: artist, pending, error } = await useAsyncData(
    `artist-${route.params.name}`,
    () => getArtistInfo(route.params.name)
)
</script>