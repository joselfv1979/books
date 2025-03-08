import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {

    const env = loadEnv(mode, path.resolve(__dirname, 'env'), '');

    return {
        plugins: [react()],
        preview: {
            port: Number(env.VITE_PORT),
            strictPort: true,
        },
        define: {
            'VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
        },
        server: {
            port: Number(env.VITE_PORT),
            strictPort: true,
            host: '0.0.0.0',
            open: true,
            proxy: {
                "^/api": {
                    target: env.VITE_API_URL,
                    changeOrigin: true, // Ensure the request appears to come from the frontend server
                    secure: false,
                },
            },
        },
        host: true,
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
    }
});