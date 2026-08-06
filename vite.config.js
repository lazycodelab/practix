import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	// Relative base so the build works both locally and under a GitHub Pages
	// subpath (username.github.io/12px) without any extra configuration.
	base: './',
	plugins: [react(), tailwindcss()],
})
