import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	// Relative base so the build works both locally and under a GitHub Pages
	// subpath (username.github.io/practix) without any extra configuration.
	base: './',
	plugins: [react(), tailwindcss()],
	// localStorage is keyed by origin, port included, so a drifting dev port
	// reads an empty bucket and looks like lost progress. Fail loudly on a
	// busy port instead of silently moving to 5174.
	server: { port: 5174, strictPort: true },
})
