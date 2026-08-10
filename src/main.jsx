import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts are bundled, not pulled from a CDN. This app makes no external
// requests by design, and a Google Fonts <link> would quietly break that.
import '@fontsource/press-start-2p/400.css'
import '@fontsource/silkscreen/400.css'
import '@fontsource/silkscreen/700.css'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
