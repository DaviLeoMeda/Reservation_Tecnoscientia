import './bootstrap';
import '../css/app.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";


import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { HashRouter as Router } from 'react-router-dom';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Router>
                <App {...props} />
            </Router>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

