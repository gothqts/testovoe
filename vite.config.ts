import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            assets: '/src/assets',
            navigation: '/src/navigation',
            screens: '/src/screens',
            services: '/src/services',
            shared: '/src/shared',
            styles: '/src/styles',
            types: '/src/types',
            utils: '/src/utils',
        },
    },
})
