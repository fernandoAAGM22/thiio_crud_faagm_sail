<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { useTheme } from "vuetify";
import ApplicationMark from '@/Components/ApplicationMark.vue';
import Banner from '@/Components/Banner.vue';
import ThemeSwitcher from '@/Components/ThemeSwitcher.vue';
import LanguageSelector from '@/Components/LanguageSelector.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';

defineProps({
    title: String,
});

const showingNavigationDropdown = ref(false);

const switchToTeam = (team) => {
    router.put(route('current-team.update'), {
        team_id: team.id,
    }, {
        preserveState: false,
    });
};

const logout = () => {
    router.post(route('logout'));
};

const vuetify = useTheme();

const theme = ref(localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

// Check and apply the user's stored preference or the system preference on page load
if (theme.value === 'dark') {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// Function to toggle theme
function toggleTheme(isDark) {
    theme.value = isDark ? 'dark' : 'light'; // Save preference
    localStorage.theme = theme.value; // Save preference
    vuetify.global.name.value = theme.value
    vuetify.global.current.value.dark = theme.value;
    document.documentElement.classList.toggle('dark', isDark);
}

onMounted(() => {
    vuetify.global.name.value = theme.value
    vuetify.global.current.value.dark = theme.value;
});

</script>

<template>
    <div>

        <Head :title="title" />

        <Banner />

        <div class="tw-min-h-screen tw-bg-gray-100 dark:tw-bg-gray-900">
            <nav class="tw-bg-gray-800 tw-border-b tw-border-gray-100 dark:tw-border-gray-700">
                <!-- Primary Navigation Menu -->
                <div class="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                    <div class="tw-flex tw-justify-between tw-h-16">
                        <div class="tw-flex">
                            <!-- Logo -->
                            <div class="tw-shrink-0 tw-flex tw-items-center">
                                <Link :href="route('dashboard')">
                                <ApplicationMark class="tw-block tw-h-9 tw-w-auto" />
                                </Link>
                            </div>

                            <!-- Navigation Links -->
                            <div class="tw-hidden tw-space-x-8 sm:-tw-my-px sm:tw-ms-10 sm:tw-flex">
                                <NavLink :href="route('dashboard')" :active="route().current('dashboard')">
                                    {{ $t('users') }}
                                </NavLink>
                            </div>
                        </div>

                        <div class="tw-hidden sm:tw-flex sm:tw-items-center sm:tw-ms-6">
                            <div class="tw-ms-3 tw-flex tw-flex-row tw-relative">
                                <!-- Theme Switcher -->
                                <ThemeSwitcher @toggleTheme="toggleTheme" :styletheme="theme" />
                                <!-- Theme Switcher -->
                                <LanguageSelector />
                                <!-- Teams Dropdown -->
                                <Dropdown v-if="$page.props.jetstream.hasTeamFeatures" align="right" width="60">
                                    <template #trigger>
                                        <span class="tw-inline-flex tw-rounded-md">
                                            <button type="button"
                                                class="tw-bg-[#007aff] tw-inline-flex tw-items-center tw-px-3 tw-py-2 tw-border tw-border-transparent tw-text-sm tw-leading-4 tw-font-medium tw-rounded-md tw-text-gray-500 dark:tw-text-gray-400 tw-bg-white dark:tw-bg-gray-800 hover:tw-text-gray-700 dark:hover:tw-text-gray-300 tw-focus:outline-none tw-focus:bg-gray-50 dark:tw-focus:bg-gray-700 tw-active:bg-gray-50 dark:tw-active:bg-gray-700 tw-transition tw-ease-in-out tw-duration-150">
                                                {{ $page.props.auth.user.current_team.name }}

                                                <svg class="tw-ms-2 -tw-me-0.5 tw-h-4 tw-w-4"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <div class="tw-w-60">
                                            <!-- Team Management -->
                                            <div class="tw-block tw-px-4 tw-py-2 tw-text-xs tw-text-gray-400">
                                                Manage Team
                                            </div>

                                            <!-- Team Settings -->
                                            <DropdownLink
                                                :href="route('teams.show', $page.props.auth.user.current_team)">
                                                Team Settings
                                            </DropdownLink>

                                            <DropdownLink v-if="$page.props.jetstream.canCreateTeams"
                                                :href="route('teams.create')">
                                                Create New Team
                                            </DropdownLink>

                                            <!-- Team Switcher -->
                                            <template v-if="$page.props.auth.user.all_teams.length > 1">
                                                <div class="tw-border-t tw-border-gray-200 dark:tw-border-gray-600" />

                                                <div class="tw-block tw-px-4 tw-py-2 tw-text-xs tw-text-gray-400">
                                                    Switch Teams
                                                </div>

                                                <template v-for="team in $page.props.auth.user.all_teams"
                                                    :key="team.id">
                                                    <form @submit.prevent="switchToTeam(team)">
                                                        <DropdownLink as="button">
                                                            <div class="tw-flex tw-items-center">
                                                                <svg v-if="team.id == $page.props.auth.user.current_team_id"
                                                                    class="tw-me-2 tw-h-5 tw-w-5 tw-text-green-400"
                                                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 24 24" stroke-width="1.5"
                                                                    stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>

                                                                <div>{{ team.name }}</div>
                                                            </div>
                                                        </DropdownLink>
                                                    </form>
                                                </template>
                                            </template>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>

                            <!-- Settings Dropdown -->
                            <div class="tw-ms-3 tw-relative">
                                <Dropdown align="right" width="48">
                                    <template #trigger>
                                        <button v-if="$page.props.jetstream.managesProfilePhotos"
                                            class="tw-flex tw-text-sm tw-border-2 tw-border-transparent tw-rounded-full tw-focus:outline-none tw-focus:border-gray-300 tw-transition">
                                            <img class="tw-h-8 tw-w-8 tw-rounded-full tw-object-cover"
                                                :src="$page.props.auth.user.profile_photo_url"
                                                :alt="$page.props.auth.user.name">
                                        </button>

                                        <span v-else class="tw-inline-flex tw-rounded-md">
                                            <button type="button"
                                                class="tw-bg-[#007aff] tw-inline-flex tw-items-center tw-px-3 tw-py-2 tw-border tw-border-transparent tw-text-sm tw-leading-4 tw-font-medium tw-rounded-tl-md tw-rounded-br-md !tw-text-white hover:!tw-text-gray-700 dark:hover:tw-text-gray-300 tw-focus:outline-none tw-focus:bg-gray-50 dark:tw-focus:bg-gray-700 tw-active:bg-gray-50 dark:tw-active:bg-gray-700 tw-transition tw-ease-in-out tw-duration-150">
                                                {{ $page.props.auth.user.name }}

                                                <svg class="tw-ms-2 -tw-me-0.5 tw-h-4 tw-w-4"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <!-- Account Management -->
                                        <div class="tw-block tw-px-4 tw-py-2 tw-text-xs tw-text-gray-400">
                                            {{ $t('manage_account') }}
                                        </div>

                                        <DropdownLink :href="route('profile.show')">
                                            {{ $t('profile') }}
                                        </DropdownLink>

                                        <DropdownLink v-if="$page.props.jetstream.hasApiFeatures"
                                            :href="route('api-tokens.index')">
                                            {{ $t('api_tokens') }}
                                        </DropdownLink>

                                        <div class="tw-border-t tw-border-gray-200 dark:tw-border-gray-600" />

                                        <!-- Authentication -->
                                        <form @submit.prevent="logout">
                                            <DropdownLink as="button">
                                                {{ $t('logout') }}
                                            </DropdownLink>
                                        </form>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <!-- Hamburger -->
                        <div class="-tw-me-2 tw-flex tw-items-center sm:tw-hidden">
                            <button
                                class="tw-inline-flex tw-items-center tw-justify-center tw-p-2 tw-rounded-md tw-text-gray-400 dark:tw-text-gray-500 hover:tw-text-gray-500 dark:hover:tw-text-gray-400 hover:tw-bg-gray-100 dark:hover:tw-bg-gray-900 tw-focus:outline-none tw-focus:bg-gray-100 dark:tw-focus:bg-gray-900 tw-focus:text-gray-500 dark:tw-focus:text-gray-400 tw-transition tw-duration-150 tw-ease-in-out"
                                @click="showingNavigationDropdown = !showingNavigationDropdown">
                                <svg class="tw-h-6 tw-w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        :class="{ 'tw-hidden': showingNavigationDropdown, 'tw-inline-flex': !showingNavigationDropdown }"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                    <path
                                        :class="{ 'tw-hidden': !showingNavigationDropdown, 'tw-inline-flex': showingNavigationDropdown }"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div :class="{ 'tw-block': showingNavigationDropdown, 'tw-hidden': !showingNavigationDropdown }"
                    class="sm:tw-hidden">
                    <div class="tw-pt-2 tw-pb-3 tw-space-y-1">
                        <ResponsiveNavLink :href="route('dashboard')" :active="route().current('dashboard')">
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="tw-pt-4 tw-pb-1 tw-border-t tw-border-gray-200 dark:tw-border-gray-600">
                        <div class="tw-flex tw-items-center tw-px-4">
                            <div v-if="$page.props.jetstream.managesProfilePhotos" class="tw-shrink-0 tw-me-3">
                                <img class="tw-h-10 tw-w-10 tw-rounded-full tw-object-cover"
                                    :src="$page.props.auth.user.profile_photo_url" :alt="$page.props.auth.user.name">
                            </div>

                            <div>
                                <div class="tw-font-medium tw-text-base tw-text-gray-800 dark:tw-text-gray-200">
                                    {{ $page.props.auth.user.name }}
                                </div>
                                <div class="tw-font-medium tw-text-sm tw-text-gray-500">
                                    {{ $page.props.auth.user.email }}
                                </div>
                            </div>
                        </div>

                        <div class="tw-mt-3 tw-space-y-1">
                            <ResponsiveNavLink :href="route('profile.show')" :active="route().current('profile.show')">
                                {{ $t('profile') }}
                            </ResponsiveNavLink>

                            <ResponsiveNavLink v-if="$page.props.jetstream.hasApiFeatures"
                                :href="route('api-tokens.index')" :active="route().current('api-tokens.index')">
                                {{ $t('api_tokens') }}
                            </ResponsiveNavLink>

                            <!-- Authentication -->
                            <form method="POST" @submit.prevent="logout">
                                <ResponsiveNavLink as="button">
                                    {{ $t('logout') }}
                                </ResponsiveNavLink>
                            </form>

                            <!-- Team Management -->
                            <template v-if="$page.props.jetstream.hasTeamFeatures">
                                <div class="tw-border-t tw-border-gray-200 dark:tw-border-gray-600" />

                                <div class="tw-block tw-px-4 tw-py-2 tw-text-xs tw-text-gray-400">
                                    Manage Team
                                </div>

                                <!-- Team Settings -->
                                <ResponsiveNavLink :href="route('teams.show', $page.props.auth.user.current_team)"
                                    :active="route().current('teams.show')">
                                    Team Settings
                                </ResponsiveNavLink>

                                <ResponsiveNavLink v-if="$page.props.jetstream.canCreateTeams"
                                    :href="route('teams.create')" :active="route().current('teams.create')">
                                    Create New Team
                                </ResponsiveNavLink>

                                <!-- Team Switcher -->
                                <template v-if="$page.props.auth.user.all_teams.length > 1">
                                    <div class="tw-border-t tw-border-gray-200 dark:tw-border-gray-600" />

                                    <div class="tw-block tw-px-4 tw-py-2 tw-text-xs tw-text-gray-400">
                                        Switch Teams
                                    </div>

                                    <template v-for="team in $page.props.auth.user.all_teams" :key="team.id">
                                        <form @submit.prevent="switchToTeam(team)">
                                            <ResponsiveNavLink as="button">
                                                <div class="tw-flex tw-items-center">
                                                    <svg v-if="team.id == $page.props.auth.user.current_team_id"
                                                        class="tw-me-2 tw-h-5 tw-w-5 tw-text-green-400"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div>{{ team.name }}</div>
                                                </div>
                                            </ResponsiveNavLink>
                                        </form>
                                    </template>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Heading -->
            <header v-if="$slots.header" class="tw-bg-white dark:tw-bg-gray-800 tw-shadow tw-bg-gradient-to-r tw-from-blue-900 tw-via-gray-800 tw-to-blue-800 ">
                <div class="tw-max-w-7xl tw-mx-auto tw-py-6 tw-px-4 sm:tw-px-6 lg:tw-px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
