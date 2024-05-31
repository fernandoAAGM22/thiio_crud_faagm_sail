import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import i18n from 'laravel-vue-i18n/vite';;

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.ts'
            ],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        vuetify({
            styles: {
              configFile: 'src/styles/settings.scss',
            },
        }),
        i18n(),
    ],
    server: {
        hmr: {
            host: 'localhost',
        },
    },
    build: {
        target: 'esnext', // Set the target to 'esnext' to support both ESM and CommonJS
    },
});
