<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Users from '@/Components/Users.vue';
</script>

<template>
    <AppLayout title="User Management">
        <template #header>
            <h2 class="tw-font-semibold tw-text-xl tw-text-gray-200 tw-leading-tight">
                {{ $t('users_title') }}
            </h2>
        </template>

        <div class="tw-py-12">
            <div class="tw-max-w-7xl tw-mx-auto sm:tw-px-6 lg:tw-px-8">
                <div class="tw-bg-white dark:tw-bg-gray-800 tw-overflow-hidden tw-shadow-xl sm:tw-rounded-lg">
                    <Users />
                </div>
            </div>
        </div>
    </AppLayout>
</template>
