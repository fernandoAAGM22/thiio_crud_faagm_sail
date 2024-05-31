<script setup lang="ts">
const props = defineProps(['styletheme']);
const emit = defineEmits(['toggleTheme']);

const toggleTheme = (isDark: any) => {
    emit('toggleTheme', isDark);
};
</script>

<template>
    <div class="max-sm:tw-w-fit max-sm:tw-h-fit">
        <v-btn v-if="styletheme == 'dark'" @click="toggleTheme(false)" class="!tw-bg-[#007aff] !tw-rounded-none !tw-rounded-tl-md !tw-rounded-br-md">
            <v-icon size="medium" class="tw-text-white tw-transition tw-duration-75 hover:tw-text-gray-900">
                mdi-weather-sunny
            </v-icon>
        </v-btn>
        <v-btn v-else @click="toggleTheme(true)" class="!tw-bg-[#007aff] !tw-rounded-none !tw-rounded-tl-md !tw-rounded-br-md">
            <v-icon size="medium" class="tw-text-white tw-transition tw-duration-75 hover:tw-text-gray-900">
                mdi-weather-night
            </v-icon>
        </v-btn>
    </div>
</template>
