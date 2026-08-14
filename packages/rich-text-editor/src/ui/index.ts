/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The React shell: the driving side of the hexagon. It turns props into calls on
 * the `EditorHandle` port and editor state into rendered chrome — the frame, the
 * plugins' toolbar, and the layer their floating UI hangs in.
 *
 * The hooks are this layer's application logic, and deliberately not a layer of
 * their own: creating the editor, carrying prop changes into it, routing keys to
 * open surfaces and answering where the selection is are all inseparable from
 * React's effects and refs. `useEditorHandle` is also the one place that chooses
 * the implementations behind the ports.
 *
 * - `RichTextEditor.tsx`  — the props, and what renders where
 * - `hooks/useEditorHandle` — owns the live editor; the only file that wires an adapter in
 * - `hooks/useFloating`     — the plugins' floating UI: placements → surfaces, and key routing
 * - `hooks/useSelectionRect`/`useFocusWithin` — the two questions the floating toolbar needs answered
 * - `components/Toolbar`    — the plugins' controls, in mount order
 * - `components/FloatingToolbar` — the bar, positioned over the selection
 * - `components/FloatingLayer`   — the flyouts the plugins' floating UI is drawn in
 *
 * VOCABULARY, because one word covers two mechanisms. "Floating UI" in the domain
 * sense is what a PLUGIN declares (`FloatingSpec`) — anchored to the selection, a
 * mark or a typed trigger — and it reaches the screen through `useFloating` and
 * `FloatingLayer`. The floating TOOLBAR is the editor's OWN chrome and goes
 * through `useSelectionRect` and `FloatingToolbar`. Different routes through the
 * port too: `handle.floating.placements()` for the first, `handle.selectionRect()`
 * for the second.
 */

export { RichTextEditor, type RichTextEditorProps } from './RichTextEditor';
export { type ToolbarPlacement } from './components/Toolbar';
