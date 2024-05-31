<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { loadLanguageAsync, getActiveLanguage } from 'laravel-vue-i18n';
import axios from 'axios';

const isLanguageDropdownOpen = ref(false);
const selectedLanguage = ref(localStorage.getItem('selectedLanguage') || getActiveLanguage());
const languages = ['en', 'es']; // Add more languages as needed

const languageIcon = computed(() => {
    switch (selectedLanguage.value) {
        case 'en':
            return '/img/icons/flags/gb.png';
        case 'es':
            return '/img/icons/flags/es.png';
        default:
            return '/img/icons/flags/default.png';
    }
});

const setLanguage = (lang: string) => {
    axios.post('/api/set-locale', { locale: lang })
        .then(response => {
            if (response.data.success) {
                loadLanguageAsync(lang);
                selectedLanguage.value = lang;
                localStorage.setItem('selectedLanguage', lang);
                isLanguageDropdownOpen.value = false;
            } else {
                console.error('Failed to update backend locale');
            }
        })
        .catch(error => {
            console.error('Error updating backend locale:', error);
        });
};

const getFlagIcon = (lang: string) => {
    switch (lang) {
        case 'en':
            return '/img/icons/flags/gb.png';
        case 'es':
            return '/img/icons/flags/es.png';
        default:
            return '/img/icons/flags/default.png';
    }
};

onMounted(() => {
    loadLanguageAsync(selectedLanguage.value);
});

</script>

<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn
                class="!tw-bg-[#007aff] !tw-rounded-none !tw-rounded-tl-md !tw-rounded-br-md tw-flex tw-justify-center tw-items-center tw-group sm:tw-mx-1"
                v-bind="props">
                <template #prepend>
                    <img class="tw-w-8 tw-object-contain" :src="languageIcon" alt="Language" />
                </template>
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="(lang, index) in languages" :key="index" :value="lang">
                <v-list-item-title>
                    <img :src="getFlagIcon(lang)" :alt="lang" class="tw-h-8 tw-w-12" @click="setLanguage(lang)" />
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>


