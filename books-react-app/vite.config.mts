import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {

    return {
        plugins: [react()],
        server: {
            host: true,
            port: 3000,
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