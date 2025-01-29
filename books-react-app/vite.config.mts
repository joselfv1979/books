import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {

    const env = loadEnv(mode, './env', '');

    return {
        plugins: [react()],
        server: {
            host: true,
            port: 3000,
            open: true,
            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler'
                }
            }
        },
        build: {
            outDir: 'build',
            sourcemap: true,
        },
        envDir: './env/',
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./src/tests/setupTests.ts'],
        },
        preview: {
            port: 3000,
        },
    }
});