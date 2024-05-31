/// <reference types="vite/client" />

declare module 'laravel-vite-plugin/inertia-helpers' {
    import { DefineComponent } from 'vue';

    type PageModule = { default: DefineComponent } | DefineComponent;

    export function resolvePageComponent(
        name: string,
        pages: Record<string, () => Promise<PageModule>>
    ): Promise<DefineComponent>;
}
