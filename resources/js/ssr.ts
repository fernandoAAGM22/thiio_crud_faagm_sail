import { createSSRApp, h, DefineComponent } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { ZiggyVue } from '../../vendor/tightenco/ziggy/src/js';

interface ZiggyProps {
    url: string;
    port?: number | null;
    defaults: Record<string, any>;
    routes: Record<string, any>;
    location: string;
}

type PageModule = { default: DefineComponent } | DefineComponent;

const appName = import.meta.env.VITE_APP_NAME || 'Thiio CRUD FAAGM';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: async (name) => {
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
        setup({ App, props, plugin }) {
            const ziggyProps: ZiggyProps = page.props.ziggy as ZiggyProps;

            return createSSRApp({ render: () => h(App, props) })
                .use(plugin, { url: ziggyProps.url }) // Pass url to ZiggyVue options
        },
    })
);
