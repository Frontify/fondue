/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyBinding } from '#/model';
import { type EditorRuntime, positionOf, runtimeOf } from '#/runtime/runtime';

/** Names content, never document positions. */
export type SelectionTarget =
    | { readonly text: string; readonly occurrence?: number; readonly from?: number; readonly to?: number }
    | { readonly nodeId: string };

const attachedOf = (handle: object) => {
    const runtime = runtimeOf(handle);
    if (runtime === undefined || runtime.view === undefined) {
        throw new Error('The handle belongs to no editor with an attached surface.');
    }
    return { runtime, view: runtime.view };
};
const viewOf = (handle: object): NonNullable<EditorRuntime['view']> => attachedOf(handle).view;

/** Types `text` one character at a time, as the browser does: a `beforeinput` event, then the change it makes. */
export const typeText = (handle: object, text: string): void => {
    const view = viewOf(handle);
    if (!view.editable) {
        return;
    }
    for (const character of text) {
        const event = new InputEvent('beforeinput', { inputType: 'insertText', data: character, cancelable: true });
        view.dom.dispatchEvent(event);
        view.dispatch(view.state.tr.insertText(character));
    }
};

/** Presses one key binding in the package key syntax, such as `Mod-b`, at the surface. */
export const pressKey = (handle: object, key: KeyBinding): void => {
    const view = viewOf(handle);
    const parts = key.split('-');
    const has = (modifier: string) => parts.slice(0, -1).includes(modifier);
    const mac = /Mac|iP(hone|[oa]d)/.test(navigator.platform);
    const event = new KeyboardEvent('keydown', {
        key: parts.at(-1) ?? '',
        altKey: has('Alt'),
        shiftKey: has('Shift'),
        ctrlKey: has('Ctrl') || (has('Mod') && !mac),
        metaKey: has('Mod') && mac,
        bubbles: true,
        cancelable: true,
    });
    view.dom.dispatchEvent(event);
};

/** Selects the `occurrence`th match of `text` (from its `from` to its `to` offset), or the node with `nodeId`. */
export const setSelection = (handle: object, target: SelectionTarget): void => {
    const { runtime, view } = attachedOf(handle);
    const { doc } = view.state;
    if ('nodeId' in target) {
        const position = positionOf(doc, target.nodeId);
        if (position === undefined) {
            throw new Error(`No node has the nodeId ${target.nodeId}.`);
        }
        runtime.select({ node: position });
        return;
    }
    const { text, occurrence = 1, from = 0, to = text.length } = target;
    let found = 0;
    let start: number | undefined;
    doc.descendants((node, pos) => {
        if (start !== undefined || !node.isTextblock) {
            return start === undefined;
        }
        // One character per position, so an offset in the string is an offset in the block.
        const content = node.textBetween(0, node.content.size, undefined, '￼');
        let index = content.indexOf(text);
        while (index >= 0 && start === undefined) {
            found += 1;
            if (found === occurrence) {
                start = pos + 1 + index;
            }
            index = content.indexOf(text, index + 1);
        }
        return false;
    });
    if (start === undefined) {
        throw new Error(`The document holds no occurrence ${occurrence} of "${text}".`);
    }
    runtime.select({ anchor: start + from, head: start + to });
};
