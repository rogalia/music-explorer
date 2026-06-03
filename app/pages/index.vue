<template>
    <div class="w-full mx-auto pt-8 px-12 flex align-top justify-between">
        <Filters v-model:filters="filters" />

        <div class="w-[calc(80%-16px)]">
            <Search v-model="search"
                    @searchClick="searchArtists"
            />

            <div>
                <p class="text-violet mt-2 ml-6"
                   v-if="!userSearched"
                >
                    Select some filters or enter the name of artist to explore music
                </p>

                <img class="mx-auto mt-16 w-[100px]"
                     v-else-if="loading"
                     src="@/assets/images/loader.gif"
                     alt="Loading"
                >

                <p class="text-red-500 mt-2 ml-6"
                   v-else-if="error"
                >
                    {{ error }}
                </p>

                <p v-else-if="!foundArtists.length">
                    Nothing was found
                </p>

                <div class="flex w-full flex-wrap mt-4 gap-4"
                     v-else
                >
                    <ArtistCard v-for="artist in foundArtists"
                                :key="artist.id"
                                :artist="artist"

                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSearch } from "@/composables/useSearch"

const { userSearched, loading, error, search, foundArtists, searchArtists, filters } = useSearch()


// import {mbFetch} from "~/api/mbFetch";
// import {mbEndpoints} from "~/api/mbEndpoints";

// onMounted(async () => {
//     const genres = ref<any>([])

    // for(let i = 1; i <= 22; i++) {
    //     const gotGenres = await mbFetch<any>(mbEndpoints.getGenres, {limit: '100', offset: `${i * 100}`})
    //
    //     genres.value.push(gotGenres.genres)
    // }
// })
</script>