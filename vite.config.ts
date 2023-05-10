import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
    plugins: [react(), svgr()],
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: '[name]_[local]___[hash:base64:5]'
        }
    }
})