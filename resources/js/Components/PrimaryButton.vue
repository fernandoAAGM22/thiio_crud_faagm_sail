<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button :type="type"
        class="tw-bg-[#007aff] tw-rounded-none tw-rounded-tl-md tw-rounded-br-md tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-bg-gray-800 dark:tw-bg-gray-200 tw-border tw-border-transparent tw-rounded-md tw-font-semibold tw-text-xs tw-text-white dark:tw-text-gray-800 tw-uppercase tw-tracking-widest hover:tw-bg-gray-700 dark:hover:tw-bg-white tw-focus:bg-gray-700 dark:tw-focus:bg-white tw-active:bg-gray-900 dark:tw-active:bg-gray-300 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-indigo-500 tw-focus:ring-offset-2 dark:tw-focus:ring-offset-gray-800 tw-disabled:opacity-50 tw-transition tw-ease-in-out tw-duration-150">
        <slot />
    </button>
</template>
