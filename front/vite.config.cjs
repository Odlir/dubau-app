import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export const aliases = {
    "@": path.resolve(__dirname, "./src"),
};
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: aliases,
    },
    extensions: ['.js', '.jsx'],
    base: './dubau-app/',
});
