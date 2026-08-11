# Pixel Art // Aseprite Run

> Eleven weeks · draw first, read later

<!--
	THIS FILE IS THE APP. Edit it and the tracker changes — no code required.

	FORMAT
	  # Title                    → shown in the header
	  > Subtitle                 → shown under the header
	  ## Phases                  → the phase list; order defines phase numbers 1..N
	    - Name `#hex`            → one phase per bullet, with its accent colour
	  ## Week title {phase: N}   → a week, belonging to phase N
	  ### Drill label `32×32` {form, shading}
	                             → a drill. The backtick part is an optional
	                               canvas-size badge; it is display-only. The
	                               {braced} part is the concepts it teaches.
	    > Brief                  → one or two sentences: what to draw
	    - Plain text             → a tip, shown inline in the tracker
	    - [Link text](url)       → a resource link
	  ## Any title {toolbox}     → the toolbox tab: tool technique that belongs
	                               to no single week. Its heading text is the tab
	                               label, so name it whatever suits your craft.
	    ### Group title          → one card in the toolbox grid
	      > Brief / - tip / - [link](url), exactly as in a drill

	Drop the {toolbox} section and the tab disappears — nothing else changes.

	The rule that keeps this useful: a drill names its subject. "Draw a beach
	ball" beats "draw a sphere" beats "practice shading", because the person
	reading it should never have to decide what to draw before they can start.

	The tags are the other half of that. Naming the subject tells you what to
	draw but hides what you are practising — "beach ball" does not say "this is
	a shading exercise". The tags say it out loud, and they are how you notice
	that a concept is over- or under-taught across the run. Reuse a tag that is
	already in the file rather than coining a synonym; two spellings of one
	concept is a typo, not two concepts. If a drill deliberately excludes a
	concept, say so in the brief — week 1's icons say "no shading" outright.

	Tips are one or two lines. If a tip needs a paragraph, it wants to be a
	link instead. Most drills need no link at all; two is the ceiling.

	Weeks are numbered automatically by their order here, so you can insert or
	delete weeks freely. Progress is keyed to week + drill *titles*, not
	position, so reordering weeks keeps your checkmarks attached. Renaming a
	drill does reset that one checkbox — that is the tradeoff. The size badge
	is not part of the key, so you can retune canvas sizes freely.
-->

## Phases

- Foundation `#e8b04b`
- Form and Light `#4bc9c9`
- Materials `#9b7fd4`
- Characters `#e8664b`
- Animation `#e85d9b`
- Environments `#6fcf7a`

## Aseprite and Reading at 16px {phase: 1}

### Set up Aseprite and learn five shortcuts {tools, workflow}

> Make a 16×16 canvas and build the muscle memory now, before you need it mid-drawing.

- `B` pencil, `E` eraser, `I` eyedropper, `G` fill. Holding `Alt` eyedrops without switching tools — that's the one you'll use hundreds of times a session.
- Turn on **Pixel Perfect** on the pencil. It removes the L-shaped double pixels that make freehand lines look chewed.
- `Shift`-click with the pencil draws a straight line from your last pixel.
- Work zoomed in, but open a second window on the same sprite from the `View` menu and leave it at 100%. You judge the piece there, not at 800%.
- [Aseprite docs — Tutorial](https://www.aseprite.org/docs/tutorial/)
- [MortMort — Aseprite Guide for Beginners](https://www.youtube.com/watch?v=Md6W79jtLJM)

### Key, coin, heart `16×16` {silhouette, readability}

> Three classic game icons. No shading — silhouette and one flat colour each.

- At 16×16 there is no room for detail, so the *shape* does all the work. If it can't be read in solid black, colour won't rescue it.
- Give each icon one unmistakable read: the key's teeth, the heart's notch, the coin's ellipse.
- Fill the canvas. A 10px icon floating in a 16px box throws away a third of your pixels.
- [Cyangmou — Readability & Pixel Art Style](https://lospec.com/pixel-art-tutorials/readability-pixel-art-style-possibilities-by-cyangmou)

### The same three icons, three values each `16×16` {value, shading, hue shifting}

> Base colour, one shadow, one highlight. Light from the top-left. Same light on all three.

- Shadow is not the base colour with the brightness pulled down. Shift the hue toward blue as you darken and toward yellow as you lighten. This single habit fixes "muddy" more than anything else you'll learn.
- Keep shadow shapes chunky. Scattered single dark pixels read as noise, not as shadow.
- Don't build a palette. Pick a good one someone already balanced and spend the time drawing instead.
- [Lospec — Palette List](https://lospec.com/palette-list)

## Spheres: Form and Light {phase: 2}

### Beach ball `32×32` {form, shading, reference}

> Six panels, alternating colour, shaded as one sphere. Use a photo — do not invent it.

- The boundary between light and shadow curves *around* the form. Draw it straight and you get a flat disc.
- Panels curve with the sphere and get narrower toward the edges.
- The darkest band is not at the outer edge. Leave a rim of bounced light there or the ball looks like a hole.

### Baseball `32×32` {form, value}

> One base colour, two curved seams. Everything you get here comes from value alone.

- Two shades plus the base is enough. Reaching for a fourth is usually panic, not need.
- Stitches are dashes, not a line. Leave gaps or it reads as a seam.
- The seam curves are the only thing telling anyone this is a sphere and not a white circle. Get them right before you shade.

### Green apple `48×48` {shading, highlights, hue shifting}

> A bigger canvas owes more: stem divot, waxy highlight, contact shadow.

- The specular highlight sits where the light actually hits, not parked at the top by default.
- A contact shadow underneath is what makes an object *sit* on a surface instead of float above it.
- An apple is not one green. Push yellow into the lit side and red-purple into the shadow.
- [Slynyrd — Pixelblog 6: Light and Shadow](https://www.slynyrd.com/blog/2018/6/15/pixelblog-6-light-and-shadow)

## Boxes and Cylinders {phase: 2}

### Wooden crate `32×32` {form, planes, value}

> Three-quarter view. Three visible faces, three distinct values.

- Flat planes take flat values. The whole top face is one value, the whole front another — no gradients on a flat surface.
- Pick which face points at the light and commit. Light top, mid front, dark side is the safe default.
- Grain lines follow the plane they sit on and stay low contrast — barely darker than the base.

### Tin can `32×32` {form, perspective, shading}

> A cylinder with a label wrapped around it.

- Cylinder shading runs in vertical bands, and the bands are uneven: narrow near the light edge, wide through the middle.
- The top ellipse sets the eye level. Wider ellipse means you're looking down more.
- Text and stripes on the label must curve with the surface. Straight text flattens the cylinder instantly.

### Ceramic mug `48×48` {form, material, highlights}

> Cylinder, plus a handle, plus an opening. Your first object with a hole in it.

- The inside is in shadow but catches bounce light on its far wall. It is not just dark.
- The handle casts a shadow on the body, and that shadow is what proves the handle sticks out.
- Ceramic takes a tight, bright specular highlight. Matte things don't — this is most of the difference between the two.

## Metal and Stone {phase: 3}

### Iron sword blade `16×48` {material, contrast, hue shifting}

> Tall canvas. Blade, guard, grip — but the blade is the exercise.

- Metal is defined by *contrast*, not by being grey. Jump from near-black to near-white with few steps between.
- Run a bright band down the blade edge with a dark band beside it. That hard jump is what reads as polished steel.
- Steel leans blue. Bronze is warm and much lower contrast. Same shape, different metal, purely from hue.

### Gold coin `24×24` {material, form, hue shifting}

> Face-on, with a stamped relief on the surface.

- Raised relief means light on the top edge of the shape and shadow on the bottom edge. Reverse it and it reads as stamped *into* the coin.
- Gold wants a warm mid, a near-white highlight, and a shadow that goes orange-brown rather than grey.

### Cut ruby `32×32` {material, value, highlights}

> A faceted gem. Everything from the last two weeks inverts here.

- Gems light backwards: the side facing *away* from the light is often brightest, because light travels through them.
- Each facet is one flat value. No blending inside a facet — the hard edges between them are the entire effect.
- One tiny cluster of pure white sells the sparkle. One. Not five.

## Glass, Leather and Cloth {phase: 3}

### Glass potion bottle `32×48` {material, transparency, highlights}

> Transparent, so you have to draw the background through it.

- Transparency is drawn, not faded. Show what's behind the bottle, shifted and tinted — don't just lower the opacity.
- Glass takes a hard vertical highlight streak and a bright rim where the wall is thickest.
- The liquid sits at a flat line with an ellipse on top, and darkens where the glass is deepest.

### Leather pouch `32×32` {material, texture, contrast}

> Soft, closed, drawstring pulled tight at the top.

- Soft materials get soft transitions: more mid-values, no hard specular.
- Folds are alternating bands of light and shadow, and they all point back to wherever the drawstring pulls.
- Leather is mid-contrast. If it's reading like metal, cut your value range in half.

### Cloth banner `48×48` {material, texture, dithering}

> Hanging cloth, two folds, torn bottom edge.

- Where cloth turns toward you it catches light; where it turns away it darkens. The pattern is a wave, not random noise.
- A printed pattern has to bend along the folds, or the cloth reads as flat paper.
- Dither the transition between two values here. Cloth is one of the few places dithering genuinely earns its keep.
- [Pixel Parmesan — Dithering for Pixel Artists](https://pixelparmesan.com/blog/dithering-for-pixel-artists)

## Character: Front View {phase: 4}

### Silhouette pass `32×48` {silhouette, readability, proportion}

> Pure black. Five different body shapes. Pick the strongest one.

- If two of your five are hard to tell apart, they're the same character. Push the proportions harder.
- The read comes from the outline breaking the rectangle: a hat, a cape, a weapon, a hunch.
- Do not draw a face yet. Faces hide bad silhouettes.

### Flat colours `32×48` {palette, value, proportion}

> Take the winning silhouette to flat colour. Four to six colours, no shading.

- At this size the head runs around a third of the height for a stylised read. Realistic proportions vanish at 48px.
- Eyes are one or two pixels. A nose is usually zero pixels. Suggest, don't render.
- Neighbouring shapes need to differ in *value*, not only hue. Squint at it — everything should still separate.

### Full render `32×48` {shading, outlining}

> Shade it, outline it, finish it. Light from the top-left, same as week 2.

- Selective outline: darken the outline where it sits in shadow, and drop it entirely where light hits, so the edge glows.
- A pure black outline makes everything look like a sticker. Use a dark version of whatever colour it borders.
- [Slynyrd — Pixelblog 17: Human Anatomy](https://www.slynyrd.com/blog/2019/5/21/pixelblog-17-human-anatomy)

## Character: Turning {phase: 4}

### Back view `32×48` {consistency, silhouette}

> The same character from behind. The easiest of the turns — do it first to lock the palette.

- Copy the front view into a new frame and edit it. Never redraw from scratch; the proportions will drift.
- With no face, the silhouette and colour blocking carry the whole design. If the back view is boring, the design is thin.

### Side view `32×48` {consistency, proportion}

> Profile. The hardest of the three.

- Head, shoulder, waist and foot must land on the exact same pixel rows as the front view. Onion skin on, and check.
- This is the one view where the face silhouette matters — the nose and chin line have to read.

### Three-quarter view `32×48` {perspective, consistency, proportion}

> The angle games actually use most.

- Don't rotate the front view to get here. Redraw it, using the front view as an onion-skinned guide underneath.
- Shift the features toward the direction faced and let the far shoulder narrow. The far eye sits closer to the edge of the head.
- [Slynyrd — Pixelblog 22: Top Down Character Sprites](https://www.slynyrd.com/blog/2019/10/21/pixelblog-22-top-down-character-sprites)

## Animation: Weight {phase: 5}

### Bouncing ball `32×32 · 8 frames` {animation, squash and stretch, timing}

> The exercise every animator starts on, and it isn't optional. A ball drops, hits, bounces.

- Squash on impact, stretch through fast motion, and keep the volume constant — a squashed ball gets wider as it gets shorter.
- Spacing is timing. Frames bunched together read slow, spread apart read fast. Bunch them at the top of the arc.
- The ball is only perfectly round at the peak. Everywhere else it's deforming.

### Idle bob `32×48 · 4 frames` {animation, looping, timing}

> Your character, breathing. Two pixels of movement in total.

- Lift the chest and head by one pixel, then two, then back down. That's the entire animation.
- Don't move everything at once. Feet stay planted; hair or a cape lags one frame behind the body.
- Loop it with `Enter` while you work. Mistakes show up in motion and are invisible in a still frame.

### Coin flip `24×24 · 6 frames` {animation, form, timing}

> The gold coin from week 4, spinning on its vertical axis.

- A rotating disc is just the ellipse narrowing to a 1px line, then widening again on the reverse face.
- Two frames at the thin point is plenty — it's moving fastest there.
- Hold the wide frames longer. Aseprite sets frame duration individually in the timeline.

## Animation: Walk Cycle {phase: 5}

### Four key poses `32×48 · 4 frames` {animation, anatomy, timing}

> Contact, down, pass, up. Blocked out only, no in-betweens yet.

- Contact: legs furthest apart, both feet touching. Down: body at its lowest as the weight lands. Pass: legs together, body rising. Up: body at its highest, pushing off.
- The head travels on a smooth arc through all four. If that arc is flat, the walk reads as skating.
- Onion skin on. The head must not change size between frames — that is the single most common wobble.

### Mirror out to eight `32×48 · 8 frames` {animation, workflow, consistency}

> The second half of the cycle is the first half with the legs swapped.

- Copy frames 1–4, swap which leg leads, paste. Then fix the arms.
- Arms swing opposite the leg on the same side. Get that backwards and the walk looks drunk.
- [Aseprite docs — Animation](https://www.aseprite.org/docs/animation/)

### Loop test and kill the wobble `32×48 · 8 frames` {animation, looping, consistency}

> Play it at 10–12 fps and watch it for a full minute.

- Wobble is usually one pixel of vertical drift in the torso. Find the frame that breaks the arc.
- Watch the planted foot: it must travel backward at a constant rate, or the character moonwalks.
- Export a GIF and watch it at 100%. Bugs hide at 800% zoom.

## Tiles and Patterns {phase: 6}

### Seamless grass tile `32×32` {tiling, texture, contrast}

> One tile that repeats without showing a grid.

- Turn on Tiled Mode from the `View` menu and draw with the repeat live in front of you. Drawing a tile without it is guesswork.
- Keep contrast low. High-contrast detail is exactly what makes a repeat obvious.
- Avoid one memorable feature — a bright flower, a big rock. Your eye will lock onto it and see the grid.
- [Aseprite docs — Tiled Mode](https://www.aseprite.org/docs/tiled-mode/)

### Stone wall tile `32×32` {tiling, texture, shading}

> Harder, because stones have hard edges and hard edges expose seams.

- Run stones *across* the tile boundary so no stone is cut exactly at the edge.
- Vary the stone sizes. A regular grid of equal stones reads as wallpaper.
- Light every stone from the same direction or the wall dissolves into noise.

### Three variants and a scatter `32×32 × 3` {tiling, workflow, consistency}

> The same grass tile, three versions, so a field doesn't visibly repeat.

- Variants differ only in small details. The base value and the edges must match exactly or seams appear between them.
- A scatter tile — one pebble, one tuft, dropped occasionally — breaks up a field better than three full variants do.

## Scene with Depth {phase: 6}

### Thumbnail in three values `96×64` {composition, value, depth}

> The whole scene in three greys: foreground, midground, background. Ten minutes, maximum.

- If the composition doesn't read in three values, no amount of colour will fix it later.
- Put your highest contrast at the focal point and let everything else step back.

### Full scene from reference `96×64` {composition, depth, reference}

> Work from a photo. Build the thumbnail out into colour.

- Atmospheric perspective: distant things get lighter, cooler and lower in contrast. That is what makes depth.
- Reuse the tiles and props you've already made. A scene is assembled, not drawn from nothing.
- [Derek Yu — Pixel Art Tutorial](https://www.derekyu.com/makegames/pixelart.html)

### Place your character and finish `96×64` {composition, contrast, depth}

> Drop the week 6 character into the scene and make them belong there.

- They need a contact shadow, for the same reason the apple did in week 2.
- If the character disappears into the background, that's a value problem. Darken behind them or lighten them.
- Check at 100%. If the focal point isn't obvious within two seconds, fix the contrast — not the detail.

## Aseprite Toolbox {toolbox}

> Things worth knowing before the drill where you need them. Skim once, then come back.

### Selecting and duplicating

> The single biggest time sink for beginners is redrawing something they already drew.

- `M` is the rectangular marquee, `Q` the lasso, `W` the magic wand. `Ctrl+D` *deselects* — in Aseprite it is not duplicate.
- Hold `Ctrl` (`Cmd` on macOS) and drag a selection to drop a copy of it. The original stays put and no new layer appears.
- Stamping the same cluster over and over? Select it, press `Ctrl+B`, and it becomes a custom brush — then `Shift`-click to lay a whole line of them.
- To select art sitting on transparency, magic-wand the empty space and press `Ctrl+Shift+I` to invert. A rectangle drags along pixels you didn't want.
- Selections only see the active layer. If what you pasted came out incomplete, you wanted `Ctrl+Shift+C` — copy merged.
- Arrow keys nudge a floating selection one pixel at a time. `Esc` drops it into the layer.

### Drawing accurately

- Turn on **Pixel Perfect** in the pencil's context bar. It removes the L-shaped double pixels that make freehand lines look chewed.
- `Shift`-click draws a straight line from your last pixel — the fastest way to keep long edges clean.
- Hold `Alt` to eyedrop without leaving the pencil. You will use this hundreds of times a session.
- Right-click paints with the background colour, so you can draw and erase without swapping tools.
- Symmetry lives in the tool context bar, not in the menus. Switch it on for faces, wheels, and anything mirrored.

### Colour without pain

- Set the ink mode to **Shading** and pick a ramp in the palette — the pencil then walks colours along that ramp instead of dropping one flat colour.
- Work in **Indexed** mode (`Sprite → Color Mode`) and editing one palette entry recolours every pixel using it. You can repalette a finished sprite in seconds.
- In **RGB** mode the palette is only a swatch rack — editing a swatch changes nothing you already drew. To swap a colour there you need one of the next three.
- Fastest swap: click the old colour in the palette, right-click the new one, then `Shift+R` (**Replace Color**) and confirm. The dialog opens pre-filled from foreground and background.
- Keep Replace Color's tolerance at **0**. Anything higher swallows the neighbouring shades of your ramp, and it is sticky between uses.
- No-dialog version: bucket (`G`) with **Contiguous** switched off and tolerance 0 — click any pixel and every pixel of that colour in the cel repaints.
- All of these work on the current layer and frame, and obey an active selection. Marquee the area first if that colour also appears somewhere you want kept.
- To shift a whole ramp at once rather than one colour, select it and use `Edit → Adjustments → Hue/Saturation`. Warming or cooling every shade together keeps the ramp coherent.
- Paste a reference photo onto its own layer, drop the layer opacity, and draw over it. Delete the layer before you export.

### Seeing what you actually drew

- Keep a second window open at 100% (`View → New Window`) and judge the piece there. Never at 800%.
- Flip the canvas horizontally (`Edit → Flip`) every so often. Errors your eye has stopped noticing jump straight out.
- Squint, or drop the zoom to 50%. If the silhouette stops reading there, more detail will not save it.
- `View → Tiled Mode` for anything meant to repeat — the seams become obvious immediately.

### Animating

- The onion-skin toggle sits at the top of the timeline. It draws neighbouring frames faintly under the current one.
- Drag a cel in the timeline with `Ctrl` held to copy it instead of moving it — the same modifier as on the canvas.
- Tag a frame range (right-click the range → **New Tag**) so idle, walk and attack each preview and export on their own.

### Getting it out of Aseprite

- Never export at a fractional scale. `File → Export As` at 400% or 1000% with **Nearest neighbor** keeps the pixels square; anything else blurs the work.
- Save the `.ase` *and* export the `.png`. The `.ase` keeps layers, tags and palette; the `.png` keeps none of them.
