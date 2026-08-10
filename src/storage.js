// Progress lives entirely in the browser. No account, no server, no telemetry.
//
// State is keyed by the stable ids the parser derives from curriculum.md
// titles, so editing the curriculum — adding a week, reordering, fixing a
// dead link — leaves existing checkmarks attached to the right drill.

const STORAGE_KEY = 'pixelart-tracker-v2'
const SCHEMA_VERSION = 2

export function emptyState() {
	return { version: SCHEMA_VERSION, done: {}, notes: {}, journal: [] }
}

// Tolerates anything: absent key, corrupt JSON, a disabled localStorage
// (Safari private browsing throws on access), or a half-shaped object.
export function loadState() {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY)
		if (!raw) return emptyState()
		return normalize(JSON.parse(raw))
	} catch {
		return emptyState()
	}
}

export function saveState(state) {
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
		return true
	} catch {
		// Quota exceeded or storage blocked — the session keeps working in
		// memory, the caller surfaces that saving failed.
		return false
	}
}

function normalize(value) {
	const base = emptyState()
	if (!value || typeof value !== 'object') return base
	return {
		version: SCHEMA_VERSION,
		done: value.done && typeof value.done === 'object' ? value.done : base.done,
		notes: value.notes && typeof value.notes === 'object' ? value.notes : base.notes,
		journal: Array.isArray(value.journal) ? value.journal : base.journal,
	}
}

export function exportState(state) {
	const stamp = new Date().toISOString().slice(0, 10)
	const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = `practix-progress-${stamp}.json`
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}

export function importState(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => {
			try {
				resolve(normalize(JSON.parse(String(reader.result))))
			} catch {
				reject(new Error('That file is not valid Practix progress JSON.'))
			}
		}
		reader.onerror = () => reject(new Error('Could not read that file.'))
		reader.readAsText(file)
	})
}
