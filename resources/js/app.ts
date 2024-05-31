import './bootstrap';

import './../sass/app.scss';

import { createApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/src/js';
import { i18nVue } from 'laravel-vue-i18n';

import vuetify from './vuetify';

type PageModule = { default: DefineComponent } | DefineComponent;

const appName = import.meta.env.VITE_APP_NAME || 'Thiio CRUD FAAGM';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        // Use import.meta.glob to load modules dynamically
        const pages = import.meta.glob('./Pages/**/*.vue') as Record<string, () => Promise<PageModule>>;

        const importPage = pages[`./Pages/${name}.vue`];

        if (!importPage) {
            throw new Error(`Page ${name} not found`);
        }

        const module = await importPage();

        if ('default' in module) {
            return module.default;
        }
        return module;
    },
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(i18nVue, {
                resolve: async (lang: any) => {
                    const langs = import.meta.glob('../../lang/*.json');
                    return await langs[`../../lang/${lang}.json`]();
                },
            })
            .use(vuetify);

        app.mount(el);

        return app; // Ensure to return the app instance here
    },
    progress: {
        color: '#4B5563',
    },
});
