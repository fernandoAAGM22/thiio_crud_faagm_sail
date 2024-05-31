<template>
    <div
        class="tw-min-h-screen tw-flex tw-flex-col sm:tw-justify-center tw-items-center tw-pt-6 sm:tw-pt-0 tw-bg-gray-900">
        <div class="tw-relative tw-z-10">
            <slot name="logo" />
        </div>

        <div
            class="tw-w-full sm:tw-max-w-md tw-mt-6 tw-px-6 tw-py-4 tw-bg-white dark:tw-bg-gray-800 tw-shadow-md tw-overflow-hidden sm:tw-rounded-lg">
            <slot />
        </div>

        <div class="tw-absolute tw-top-0 tw-right-0">
            <div :class="[$style.circles]">
                <div :class="[$style.circle, $style.circle_1]"></div>
                <div :class="[$style.circle, $style.circle_2]"></div>
                <div :class="[$style.circle, $style.circle_3]"></div>
            </div>
        </div>
    </div>
</template>

<style module>
.circles {
    position: relative;
    /* width: 200px;
    height: 200px; */
    transform: translate(50%, -50%);
}

.circle {
    position: absolute;
    border-radius: 50%;
}

.circle_1 {
    width: 25vw;
    height: 25vw;
    background-color: #052746;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    z-index: -1000;
}

.circle_2 {
    width: 35vw;
    height: 35vw;
    background-color: #061836;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    z-index: -1001;
}

.circle_3 {
    width: 45vw;
    height: 45vw;
    background-color: #070e2a;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    z-index: -1002;
}
</style>
