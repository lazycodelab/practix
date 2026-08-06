import source from '../curriculum.md?raw'

// Turns the human-editable curriculum.md into the shape the UI renders.
//
// Deliberately hand-rolled: the dialect is five line types, so a markdown
// library would be more dependency than parser. Everything is forgiving —
// unknown lines are skipped rather than throwing, because the person editing
// curriculum.md is an artist, not a compiler.

const RE = {
	title: /^#\s+(.+)$/,
	subtitle: /^>\s+(.+)$/,
	heading2: /^##\s+(.+)$/,
	heading3: /^###\s+(.+)$/,
	bullet: /^[-*]\s+(.+)$/,
	link: /^\[([^\]]+)\]\(([^)]+)\)$/,
	phaseBullet: /^(.+?)\s*`(#[0-9a-fA-F]{3,8})`$/,
	phaseTag: /\{\s*phase\s*:\s*(\d+)\s*\}/,
	// "Week 3 · Title" / "Week 3 — Title" / "Week 3 - Title" → "Title".
	// Week numbers come from document order, so a stale one here is harmless.
	weekPrefix: /^week\s+\d+\s*[·—–:-]\s*/i,
}

const FALLBACK_PHASE = { label: 'Unphased', color: '#8b8b9e' }

function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 60)
}

// Strips HTML comments so the format documentation inside curriculum.md
// never reaches the parser.
function stripComments(text) {
	return text.replace(/<!--[\s\S]*?-->/g, '')
}

export function parseCurriculum(markdown) {
	const lines = stripComments(markdown).split('\n')

	let title = 'Untitled Run'
	let subtitle = ''
	const phases = []
	const weeks = []

	// Which "## " section we are inside: 'phases' | 'week' | null
	let section = null
	let week = null
	let task = null

	for (const raw of lines) {
		const line = raw.trim()
		if (!line) continue

		const h2 = line.match(RE.heading2)
		if (h2) {
			const label = h2[1].trim()

			if (/^phases$/i.test(label)) {
				section = 'phases'
				week = null
				task = null
				continue
			}

			// Any other "## " is a week.
			const phaseMatch = label.match(RE.phaseTag)
			const cleanTitle = label
				.replace(RE.phaseTag, '')
				.trim()
				.replace(RE.weekPrefix, '')

			week = {
				id: slugify(cleanTitle) || `week-${weeks.length + 1}`,
				number: weeks.length + 1,
				title: cleanTitle,
				phase: phaseMatch ? Number(phaseMatch[1]) : 1,
				tasks: [],
			}
			weeks.push(week)
			section = 'week'
			task = null
			continue
		}

		const h3 = line.match(RE.heading3)
		if (h3 && week) {
			const label = h3[1].trim()
			task = {
				id: `${week.id}::${slugify(label) || week.tasks.length}`,
				label,
				resources: [],
			}
			week.tasks.push(task)
			continue
		}

		const h1 = line.match(RE.title)
		if (h1 && !title.startsWith('#')) {
			// Only the first "# " counts as the document title.
			if (weeks.length === 0 && section === null) title = h1[1].trim()
			continue
		}

		const quote = line.match(RE.subtitle)
		if (quote && section === null) {
			subtitle = quote[1].trim()
			continue
		}

		const bullet = line.match(RE.bullet)
		if (!bullet) continue
		const content = bullet[1].trim()

		if (section === 'phases') {
			const phase = content.match(RE.phaseBullet)
			if (phase) {
				phases.push({ label: phase[1].replace(/\*\*/g, '').trim(), color: phase[2] })
			} else {
				phases.push({ label: content.replace(/\*\*/g, '').trim(), color: FALLBACK_PHASE.color })
			}
			continue
		}

		if (task) {
			const link = content.match(RE.link)
			if (link) task.resources.push({ title: link[1].trim(), url: link[2].trim() })
		}
	}

	return { title, subtitle, phases, weeks }
}

export function phaseFor(curriculum, week) {
	return curriculum.phases[week.phase - 1] ?? FALLBACK_PHASE
}

export function totalTaskCount(curriculum) {
	return curriculum.weeks.reduce((sum, w) => sum + w.tasks.length, 0)
}

const curriculum = parseCurriculum(source)

export default curriculum
