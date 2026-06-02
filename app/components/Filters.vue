<template>
    <div class="w-[20%]">
        <div class="mb-4">
            <p class="text-lg text-violet mb-2">
                Type of artist
            </p>

            <div class="flex flex-wrap pr-8 gap-x-3 gap-y-1">
                <BaseCheckboxGroup v-model="filters.types"
                                   :options="artistTypesNormalized"
                />
            </div>
        </div>

        <div class="mb-4">
            <p class="text-lg text-violet mb-2">
                Genre
            </p>
        </div>

        <div class="mb-4">
            <p class="text-lg text-violet mb-2">
                Country
            </p>

            <BaseSelect v-model="filters.countries"
                        :options="countriesNormalized"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Filters } from "@/types/filters"

import { ARTIST_TYPES } from "@/constants/artistTypes"

import { getData, type CountryType } from 'country-list'

const artistTypesNormalized = computed(() => {
    return ARTIST_TYPES.map((type) => ({
        label: type.title,
        value: type.value
    }))
})

const countriesNormalized = computed(() => {
    return getData().map((country: CountryType) => ({
        label: country.name,
        value: country.code
    }))
})

const filters = defineModel<Filters>('filters', { required: true })
</script>