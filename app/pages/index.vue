<template>
    <div class="w-full mx-auto pt-8 px-12 flex align-top justify-between">
        <Filters v-model:filters="filters" />

        <div class="w-[calc(80%-16px)]">
            <div class="w-full flex align-center">
                <Search v-model="search"/>

                <BaseButton class="ml-2 rounded-full px-8"
                            :disabled="!isSearchable"
                            outlined
                            @click="searchArtists"
                >
                    Search
                </BaseButton>
            </div>

            <div>
                <p class="text-violet mt-2 ml-6"
                   v-if="!hasSearched"
                >
                    Select some filters or enter the name of artist to explore music
                </p>

                <p v-else-if="!foundArtists.length && !isLoading">
                    Nothing was found
                </p>

                <div class="flex w-full flex-wrap mt-4 gap-4">
                    <ArtistCard v-for="(artist, index) in foundArtists"
                                :key="artist.id"
                                :artist="artist"
                                :ref="index === foundArtists.length - 1 ? 'lastArtistRef' : undefined"
                    />
                </div>

                <p class="text-red-500 mt-2 ml-6"
                   v-if="error"
                >
                    {{ error }}
                </p>

                <img class="mx-auto mt-16 w-[100px]"
                     v-if="isLoading"
                     src="@/assets/images/loader.gif"
                     alt="Loading"
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSearch } from "@/composables/useSearch"

const { isSearchable, hasSearched, isLoading, error, search, filters, foundArtists, searchArtists, initSearch, lastArtistRef } = useSearch()

if (isSearchable.value) {
    await initSearch()
}
</script>