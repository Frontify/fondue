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
 */

export { RichTextEditor, type RichTextEditorProps } from './RichTextEditor';
export { type ToolbarPlacement } from './components/Toolbar';
