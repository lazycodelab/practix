import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, Trash2, Plus, Download, Upload } from 'lucide-react'
import curriculum, { phaseFor, totalTaskCount } from './curriculum.js'
import { loadState, saveState, exportState, importState, emptyState } from './storage.js'

const BAR_SEGMENTS = 24

// Tips are written as plain markdown prose, so they carry `code`, **bold** and
// *italics*. Rendering those three by hand keeps the tracker readable without
// pulling in a markdown renderer to display what are, at most, two lines of
// text. Bold is matched before italics so `**x**` never parses as `*` + `x*`.
const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g

function renderInline(text) {
	return text.split(INLINE).map((chunk, i) => {
		if (chunk.length > 1 && chunk.startsWith('`') && chunk.endsWith('`')) {
			return (
				<kbd key={i} className="px-1 py-px text-[11px]" style={{ background: '#242438', border: '1px solid #3a3a52' }}>
					{chunk.slice(1, -1)}
				</kbd>
			)
		}
		if (chunk.length > 4 && chunk.startsWith('**') && chunk.endsWith('**')) {
			return (
				<strong key={i} className="font-bold">
					{chunk.slice(2, -2)}
				</strong>
			)
		}
		if (chunk.length > 2 && chunk.startsWith('*') && chunk.endsWith('*')) {
			return (
				<em key={i} className="italic opacity-100">
					{chunk.slice(1, -1)}
				</em>
			)
		}
		return chunk
	})
}

function PixelPanel({ children, className = '' }) {
	return <div className={`pixel-panel relative ${className}`}>{children}</div>
}

// The product name, not the curriculum's. Deliberately hardcoded: curriculum.md
// owns the content's title, this owns the app's identity, and merging the two
// would mean a fork could not rename itself without editing its syllabus.
//
// The P and the X sit in filled tiles so the eye picks out P···X — px, the unit
// the whole thing is about. aria-label keeps it one word for screen readers.
function Wordmark({ accent }) {
	const tile = {
		background: accent,
		color: 'var(--color-void)',
		padding: '0.18em 0.22em',
		boxShadow: '2px 2px 0 0 #0a0a12',
	}
	return (
		<h1 className="font-display text-base sm:text-xl leading-none flex items-center" aria-label="Practix">
			<span style={tile}>P</span>
			<span className="px-[0.18em] opacity-90" style={{ letterSpacing: '0.04em' }}>
				racti
			</span>
			<span style={tile}>X</span>
		</h1>
	)
}

// Craft technique that belongs to no single week — the tool shortcuts you want
// *before* the drill that needs them. It gets its own view rather than a block
// above the drills, because anything long enough to be worth reading is long
// enough to push the drills off screen, and the drills are the point.
//
// Card accents cycle the phase palette, so the colours still come from
// curriculum.md rather than from anything decided here.
function Toolbox({ toolbox, palette }) {
	return (
		<PixelPanel className="p-5 mb-6">
			<h2 className="font-pixel text-xl uppercase" style={{ color: palette[0], letterSpacing: '0.05em' }}>
				{toolbox.title}
			</h2>
			{toolbox.intro && <p className="text-xs opacity-60 mt-1 mb-4">{renderInline(toolbox.intro)}</p>}

			<div className="grid sm:grid-cols-2 gap-3">
				{toolbox.groups.map((group, i) => {
					const color = palette[i % palette.length]
					return (
						<section
							key={group.id}
							className="p-3"
							style={{ background: '#181826', border: '1px solid #26263a', borderTop: `3px solid ${color}` }}
						>
							<h3 className="font-pixel text-sm uppercase mb-2" style={{ color, letterSpacing: '0.04em' }}>
								{group.title}
							</h3>
							{group.brief && <p className="text-xs opacity-60 mb-2">{renderInline(group.brief)}</p>}

							<ul className="flex flex-col gap-1.5 pl-3" style={{ borderLeft: `2px solid ${color}44` }}>
								{group.tips.map((tip, j) => (
									<li key={j} className="text-xs leading-relaxed opacity-85">
										{renderInline(tip)}
									</li>
								))}
							</ul>

							{group.resources.length > 0 && (
								<div className="mt-2 flex flex-col gap-1">
									{group.resources.map((r) => (
										<a
											key={r.url + r.title}
											href={r.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-xs opacity-70 hover:opacity-100 hover:underline"
											style={{ color }}
										>
											→ {r.title}
										</a>
									))}
								</div>
							)}
						</section>
					)
				})}
			</div>
		</PixelPanel>
	)
}

export default function App() {
	const [state, setState] = useState(loadState)
	const [selected, setSelected] = useState(0)
	const [view, setView] = useState('run')
	const [journalDraft, setJournalDraft] = useState('')
	const [status, setStatus] = useState('')
	const fileInput = useRef(null)

	// One write per change. localStorage is synchronous and this payload is a
	// few KB, so there is nothing to debounce.
	useEffect(() => {
		const ok = saveState(state)
		setStatus(ok ? 'saved' : 'save failed — storage blocked')
		if (!ok) return
		const timer = setTimeout(() => setStatus(''), 900)
		return () => clearTimeout(timer)
	}, [state])

	const totalTasks = useMemo(() => totalTaskCount(curriculum), [])
	const doneTasks = useMemo(
		() => curriculum.weeks.reduce((sum, w) => sum + w.tasks.filter((t) => state.done[t.id]).length, 0),
		[state.done],
	)

	const pct = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100)
	const filledSegments = Math.round((pct / 100) * BAR_SEGMENTS)

	const week = curriculum.weeks[selected]
	const phase = week ? phaseFor(curriculum, week) : null
	// The app's own accent tracks the first phase, so a fork's palette still
	// comes from its curriculum rather than from anything hardcoded here.
	const accent = curriculum.phases[0]?.color ?? '#e8b04b'

	const toggleTask = (taskId) => {
		setState((prev) => {
			const done = { ...prev.done }
			if (done[taskId]) delete done[taskId]
			else done[taskId] = true
			return { ...prev, done }
		})
	}

	const updateNotes = (weekId, text) => {
		setState((prev) => ({ ...prev, notes: { ...prev.notes, [weekId]: text } }))
	}

	const addJournalEntry = () => {
		const text = journalDraft.trim()
		if (!text) return
		setState((prev) => ({
			...prev,
			journal: [{ id: Date.now(), text, date: new Date().toISOString() }, ...prev.journal],
		}))
		setJournalDraft('')
	}

	const deleteJournalEntry = (id) => {
		setState((prev) => ({ ...prev, journal: prev.journal.filter((e) => e.id !== id) }))
	}

	const handleImport = async (event) => {
		const file = event.target.files?.[0]
		event.target.value = ''
		if (!file) return
		try {
			setState(await importState(file))
			setStatus('imported')
		} catch (error) {
			setStatus(error.message)
		}
	}

	// A curriculum.md with no weeks would otherwise render a blank page.
	if (!week) {
		return (
			<div className="pixel-grid min-h-screen flex items-center justify-center p-8">
				<PixelPanel className="p-6 max-w-md text-sm">
					<p className="font-pixel mb-2 text-lg uppercase">No weeks found</p>
					<p className="opacity-70">
						<code>curriculum.md</code> parsed without any weeks in it. Each week is a{' '}
						<code>## Heading</code>, and each drill under it is a <code>### Heading</code>.
					</p>
				</PixelPanel>
			</div>
		)
	}

	return (
		<div className="pixel-grid min-h-screen p-4 sm:p-8">
			<div className="max-w-5xl mx-auto">
				<header className="mb-6">
					<div className="flex items-center justify-between flex-wrap gap-3">
						<Wordmark accent={accent} />
						<div className="flex items-center gap-3">
							<span className="font-pixel text-xs uppercase tracking-wider opacity-60 h-4" role="status">
								{status}
							</span>
							<button
								onClick={() => exportState(state)}
								title="Download your progress as JSON"
								className="font-pixel flex items-center gap-1 text-xs uppercase tracking-wider opacity-60 hover:opacity-100"
							>
								<Download size={13} /> Export
							</button>
							<button
								onClick={() => fileInput.current?.click()}
								title="Restore progress from a JSON file"
								className="font-pixel flex items-center gap-1 text-xs uppercase tracking-wider opacity-60 hover:opacity-100"
							>
								<Upload size={13} /> Import
							</button>
							<input
								ref={fileInput}
								type="file"
								accept="application/json,.json"
								onChange={handleImport}
								className="hidden"
							/>
						</div>
					</div>

					<p
						className="font-pixel text-lg sm:text-xl mt-4 uppercase"
						style={{ color: accent, letterSpacing: '0.08em' }}
					>
						{curriculum.title}
					</p>
					{curriculum.subtitle && <p className="font-pixel text-sm opacity-60 mt-0.5">{curriculum.subtitle}</p>}

					<div className="mt-4 flex items-center gap-3">
						<div
							className="flex gap-[2px]"
							role="progressbar"
							aria-valuenow={pct}
							aria-valuemin={0}
							aria-valuemax={100}
							aria-label="Overall progress"
						>
							{Array.from({ length: BAR_SEGMENTS }).map((_, i) => (
								<div
									key={i}
									style={{
										width: 12,
										height: 16,
										background: i < filledSegments ? accent : '#242438',
										border: '1px solid #14141f',
									}}
								/>
							))}
						</div>
						<span className="font-pixel text-sm font-bold" style={{ color: accent }}>
							{pct}%
						</span>
						<span className="font-pixel text-xs opacity-50">
							{doneTasks}/{totalTasks} drills
						</span>
					</div>
				</header>

				{/* Only appears when curriculum.md defines a {toolbox} section. */}
				{curriculum.toolbox && (
					<div className="flex gap-2 mb-4" role="tablist" aria-label="Views">
						{[
							['run', 'Drills'],
							['toolbox', curriculum.toolbox.title],
						].map(([id, label]) => (
							<button
								key={id}
								role="tab"
								aria-selected={view === id}
								onClick={() => setView(id)}
								className="font-pixel text-xs uppercase tracking-wider px-3 py-2"
								style={{
									background: view === id ? '#242438' : 'transparent',
									border: `2px solid ${view === id ? accent : '#2a2a3d'}`,
									color: view === id ? accent : '#e8e3d3',
									opacity: view === id ? 1 : 0.65,
								}}
							>
								{label}
							</button>
						))}
					</div>
				)}

				{view === 'toolbox' && curriculum.toolbox ? (
					<Toolbox toolbox={curriculum.toolbox} palette={curriculum.phases.map((p) => p.color)} />
				) : (
					<>
					<nav className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6" aria-label="Weeks">
						{curriculum.weeks.map((w, i) => {
							const meta = phaseFor(curriculum, w)
							const done = w.tasks.filter((t) => state.done[t.id]).length
							const isSelected = i === selected
							return (
								<button
									key={w.id}
									onClick={() => setSelected(i)}
									aria-current={isSelected ? 'true' : undefined}
									className="text-left p-2 transition-transform hover:-translate-y-0.5"
									style={{
										background: isSelected ? '#242438' : '#1a1a28',
										border: `2px solid ${isSelected ? meta.color : '#2a2a3d'}`,
									}}
								>
									<div className="flex items-center justify-between">
										<span className="font-pixel text-xs font-bold" style={{ color: meta.color }}>
											W{w.number}
										</span>
										<span className="font-pixel text-xs opacity-50">
											{done}/{w.tasks.length}
										</span>
									</div>
									<div className="flex gap-[2px] mt-1 flex-wrap">
										{w.tasks.map((t) => (
											<div
												key={t.id}
												style={{
													width: 6,
													height: 6,
													background: state.done[t.id] ? meta.color : '#2a2a3d',
												}}
											/>
										))}
									</div>
								</button>
							)
						})}
					</nav>

					<PixelPanel className="p-5 mb-6">
						<div className="flex items-center gap-2 mb-1 flex-wrap">
							<span
								className="font-pixel text-xs font-bold uppercase px-2 py-0.5"
								style={{ background: phase.color, color: '#14141f' }}
							>
								Phase {week.phase} · {phase.label}
							</span>
							<span className="font-pixel text-xs opacity-50">
								Week {week.number} of {curriculum.weeks.length}
							</span>
						</div>
						<h2 className="font-pixel text-xl mb-3 uppercase" style={{ color: phase.color, letterSpacing: '0.05em' }}>
							{week.title}
						</h2>

						<div className="space-y-3 mb-4">
							{week.tasks.map((task) => {
								const isDone = Boolean(state.done[task.id])
								return (
									<div key={task.id} className="p-3" style={{ background: '#181826', border: '1px solid #26263a' }}>
										<button
											onClick={() => toggleTask(task.id)}
											aria-pressed={isDone}
											className="w-full flex items-start gap-3 text-left hover:bg-white/5 transition-colors p-1 -m-1"
										>
											<div
												className="flex-shrink-0 flex items-center justify-center mt-0.5"
												style={{
													width: 18,
													height: 18,
													border: `2px solid ${isDone ? phase.color : '#3a3a52'}`,
													background: isDone ? phase.color : 'transparent',
												}}
											>
												{isDone && <Check size={12} color="#14141f" strokeWidth={4} />}
											</div>
											<span
												className="font-pixel text-base flex-1"
												style={{
													textDecoration: isDone ? 'line-through' : 'none',
													opacity: isDone ? 0.5 : 1,
												}}
											>
												{task.label}
											</span>
											{task.size && (
												<span
													className="font-pixel flex-shrink-0 text-xs font-bold px-1.5 py-0.5 mt-px"
													style={{ background: '#242438', color: phase.color, border: '1px solid #2f2f45' }}
												>
													{task.size}
												</span>
											)}
										</button>

										{task.brief && <p className="mt-2 ml-[30px] text-xs opacity-70">{renderInline(task.brief)}</p>}

										{task.tips.length > 0 && (
											<ul
												className="mt-2 ml-[30px] flex flex-col gap-1.5 pl-3"
												style={{ borderLeft: `2px solid ${phase.color}44` }}
											>
												{task.tips.map((tip, i) => (
													<li key={i} className="text-xs leading-relaxed opacity-85">
														{renderInline(tip)}
													</li>
												))}
											</ul>
										)}

										{task.resources.length > 0 && (
											<div className="mt-2 ml-[30px] flex flex-col gap-1">
												{task.resources.map((r) => (
													<a
														key={r.url + r.title}
														href={r.url}
														target="_blank"
														rel="noopener noreferrer"
														className="text-xs opacity-70 hover:opacity-100 hover:underline"
														style={{ color: phase.color }}
													>
														→ {r.title}
													</a>
												))}
											</div>
										)}
									</div>
								)
							})}
						</div>

						<label htmlFor="week-notes" className="font-pixel text-xs uppercase tracking-wider opacity-50 block mb-1">
							Your findings for this week
						</label>
						<textarea
							id="week-notes"
							value={state.notes[week.id] ?? ''}
							onChange={(e) => updateNotes(week.id, e.target.value)}
							placeholder="What worked, what didn't, anything you'd tell your future self before next week…"
							className="w-full text-sm p-3 outline-none resize-none"
							style={{
								background: '#14141f',
								border: '2px solid #2a2a3d',
								color: '#e8e3d3',
								minHeight: 90,
							}}
						/>
					</PixelPanel>

					<PixelPanel className="p-5">
						<h3
							className="font-pixel text-base uppercase tracking-wider mb-3"
							style={{ color: curriculum.phases.at(-1)?.color ?? '#6fcf7a' }}
						>
							General journal
						</h3>
						<div className="flex gap-2 mb-4">
							<input
								value={journalDraft}
								onChange={(e) => setJournalDraft(e.target.value)}
								onKeyDown={(e) => e.key === 'Enter' && addJournalEntry()}
								placeholder="Log a finding, a link, a random note…"
								aria-label="New journal entry"
								className="flex-1 text-sm px-3 py-2 outline-none"
								style={{ background: '#14141f', border: '2px solid #2a2a3d', color: '#e8e3d3' }}
							/>
							<button
								onClick={addJournalEntry}
								aria-label="Add journal entry"
								className="px-3 flex items-center justify-center"
								style={{
									background: curriculum.phases.at(-1)?.color ?? '#6fcf7a',
									border: `2px solid ${curriculum.phases.at(-1)?.color ?? '#6fcf7a'}`,
								}}
							>
								<Plus size={16} color="#14141f" strokeWidth={3} />
							</button>
						</div>

						{state.journal.length === 0 ? (
							<p className="text-sm opacity-40">No entries yet — log anything worth remembering.</p>
						) : (
							<div className="space-y-2">
								{state.journal.map((entry) => (
									<div
										key={entry.id}
										className="flex items-start justify-between gap-3 p-2"
										style={{ background: '#14141f', border: '1px solid #2a2a3d' }}
									>
										<div>
											<div className="font-pixel text-xs opacity-40 mb-0.5">
												{new Date(entry.date).toLocaleDateString(undefined, {
													month: 'short',
													day: 'numeric',
													year: 'numeric',
												})}
											</div>
											<div className="text-sm">{entry.text}</div>
										</div>
										<button
											onClick={() => deleteJournalEntry(entry.id)}
											aria-label="Delete entry"
											className="opacity-40 hover:opacity-100 flex-shrink-0"
										>
											<Trash2 size={14} />
										</button>
									</div>
								))}
							</div>
						)}
					</PixelPanel>
					</>
				)}

				<footer className="font-pixel mt-6 text-xs opacity-40 flex items-center justify-between flex-wrap gap-2">
					<span>Progress is stored in this browser only. Export before clearing site data.</span>
					<button
						onClick={() => {
							if (window.confirm('Reset all progress, notes and journal entries? This cannot be undone.')) {
								setState(emptyState())
							}
						}}
						className="underline hover:opacity-100"
					>
						Reset everything
					</button>
				</footer>
			</div>
		</div>
	)
}
