/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { type NodeViewDeclaration, useRichTextNodeView } from '#/bridge/define';
import { defineEditorPlugin } from '#/bridge/plugin';

import { fixtureChrome } from './feature';

const textOf = (value: unknown): string => {
    if (typeof value === 'string') {
        return value;
    }
    return '';
};

/** A checkbox, a language and a click count, which shows whether React kept the chrome's state. */
const BlockChrome = () => {
    const { attrs, selected, update } = useRichTextNodeView();
    const [clicks, setClicks] = useState(0);
    const language = textOf(attrs.language);
    return (
        <div data-chrome="block" data-selected={String(selected)}>
            <input
                type="checkbox"
                aria-label={language}
                checked={attrs.checked === true}
                onChange={() => update({ checked: attrs.checked !== true })}
            />
            <button type="button" data-clicks="" onClick={() => setClicks(clicks + 1)}>
                {clicks}
            </button>
            <span data-language="">{language}</span>
        </div>
    );
};

/** The document listeners that open popups hold, which a released node view leaves at 0. */
export const popupListeners = { count: 0 };

/** A popup that listens on the document while it is open, as an overlay that closes on Escape does. */
const Popup = ({ label }: { readonly label: string }) => {
    useEffect(() => {
        const listener = () => undefined;
        document.addEventListener('keydown', listener);
        popupListeners.count += 1;
        return () => {
            document.removeEventListener('keydown', listener);
            popupListeners.count -= 1;
        };
    }, []);
    return <span data-popup="">{label}</span>;
};

/** Sets state in a mount effect, as the chrome of Tiptap issue #7811 does, opens a popup, and shows the resolved name. */
const MentionChrome = () => {
    const { attrs, nodeId, context } = useRichTextNodeView();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    // oxlint-disable-next-line @eslint-react/set-state-in-effect -- runs chrome that does.
    useEffect(() => setMounted(true), []);
    const resolved = context.resolveReference('user', nodeId ?? '');
    let label = textOf(attrs.label);
    if (resolved.status === 'current') {
        label = resolved.label;
    }
    return (
        <span data-chrome="mention">
            <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
                {label}
            </button>
            {mounted && <span data-mounted="" />}
            {open && <Popup label={label} />}
        </span>
    );
};

const ImageChrome = () => {
    const { attrs, selected } = useRichTextNodeView();
    const [clicks, setClicks] = useState(0);
    return (
        <div data-chrome="image" data-selected={String(selected)}>
            <button type="button" data-clicks="" onClick={() => setClicks(clicks + 1)}>
                {clicks}
            </button>
            <span>{textOf(attrs.assetId)}</span>
        </div>
    );
};

/** The chrome of each node of the stand-in feature. */
export const CHROME_VIEWS: readonly NodeViewDeclaration[] = [
    { node: 'chrome_block', component: BlockChrome },
    { node: 'chrome_mention', component: MentionChrome },
    { node: 'chrome_image', component: ImageChrome },
];

/** The stand-in feature's editor part with `views`, and block commands to and from `chrome_block`. */
export const chromeEditorWith = (views: readonly NodeViewDeclaration[]) =>
    defineEditorPlugin(fixtureChrome, {
        commands: {
            'fixture.chrome-block.set': {
                run: (api) => api.blocks.set('chrome_block'),
                active: (api) => api.blocks.active('chrome_block'),
            },
            'fixture.chrome-block.unset': {
                run: (api) => api.blocks.set('paragraph'),
                active: (api) => api.blocks.active('paragraph'),
            },
        },
        views,
    });

/** The chrome of each node, with `view` in place of the one of its node. */
export const chromeViewsWith = (view: NodeViewDeclaration): readonly NodeViewDeclaration[] => [
    ...CHROME_VIEWS.filter(({ node }) => node !== view.node),
    view,
];

/** The stand-in feature's editor part, with chrome on each of its nodes. */
export const fixtureChromeEditor = chromeEditorWith(CHROME_VIEWS);
