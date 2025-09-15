import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";


// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(),svgr()],
    resolve: {
        alias: {
            assets: '/src/assets',
            navigation: '/src/navigation',
            screens: '/src/screens',
            shared: '/src/shared',
            styles: '/src/styles',
            stores: '/src/stores',
            utils: '/src/utils',
            types: '/src/types',
        },
    },
})
