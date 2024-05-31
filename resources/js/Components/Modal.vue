<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['close']);
const dialog = ref();
const showSlot = ref(props.show);

watch(() => props.show, () => {
    if (props.show) {
        document.body.style.overflow = 'hidden';
        showSlot.value = true;
        dialog.value?.showModal();
    } else {
        document.body.style.overflow = null;
        setTimeout(() => {
            dialog.value?.close();
            showSlot.value = false;
        }, 200);
    }
});

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        'sm': 'sm:tw-max-w-sm',
        'md': 'sm:tw-max-w-md',
        'lg': 'sm:tw-max-w-lg',
        'xl': 'sm:tw-max-w-xl',
        '2xl': 'sm:tw-max-w-2xl',
    }[props.maxWidth];
});
</script>

<template>
    <dialog class="tw-z-50 tw-m-0 tw-min-h-full tw-min-w-full tw-overflow-y-auto tw-bg-transparent backdrop:tw-bg-transparent" ref="dialog">
        <div class="tw-fixed tw-inset-0 tw-overflow-y-auto tw-px-4 tw-py-6 sm:tw-px-0 z-50" scroll-region>
            <transition
                enter-active-class="tw-ease-out tw-duration-300"
                enter-from-class="tw-opacity-0"
                enter-to-class="tw-opacity-100"
                leave-active-class="tw-ease-in tw-duration-200"
                leave-from-class="tw-opacity-100"
                leave-to-class="tw-opacity-0"
            >
                <div v-show="show" class="tw-fixed tw-inset-0 tw-transform tw-transition-all" @click="close">
                    <div class="tw-absolute tw-inset-0 tw-bg-gray-500 dark:tw-bg-gray-900 tw-opacity-75" />
                </div>
            </transition>

            <transition
                enter-active-class="tw-ease-out tw-duration-300"
                enter-from-class="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
                enter-to-class="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
                leave-active-class="tw-ease-in tw-duration-200"
                leave-from-class="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
                leave-to-class="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
            >
                <div v-show="show" class="tw-mb-6 tw-bg-white dark:tw-bg-gray-800 tw-rounded-lg tw-overflow-hidden tw-shadow-xl tw-transform tw-transition-all sm:tw-w-full sm:tw-mx-auto" :class="maxWidthClass">
                    <slot v-if="showSlot"/>
                </div>
            </transition>
        </div>
    </dialog>
</template>
