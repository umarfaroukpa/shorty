import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitestConfig from './vitest.config';

export default defineConfig({
    plugins: [react()],
    ...vitestConfig,
});
