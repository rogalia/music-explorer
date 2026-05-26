<template>
    <div class="w-full mx-auto pt-8 px-12 flex align-top justify-between">
        <div class="w-[20%] border border-solid border-grey rounded-sm">
            Filters
            <br>
            <br>
            1
            <br>
            <br>
            1
            <br>
            <br>
            2
            <br>
            <br>
            3
            <br>
            <br>
        </div>


        <div class="w-[calc(80%-16px)]">
            <div class="w-full flex align-center">
                <div class="w-full rounded-full bg-purple py-4 px-6 relative">
                    <input class="w-full outline-none bg-purple"
                           placeholder="Type the name of artist"
                           v-model="userQuery"
                    />
                </div>

                <Button class="ml-2 rounded-full px-8"
                        outlined
                        @click="searchArtists"
                >
                    Search
                </Button>
            </div>

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

const { userSearched, loading, error, userQuery, foundArtists, searchArtists } = useSearch()



</script>