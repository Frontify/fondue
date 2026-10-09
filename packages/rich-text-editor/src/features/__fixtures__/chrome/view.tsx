/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { defineNodeView, useRichTextNodeView } from '#/bridge/define';

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

/** The document listeners that open popups hold, which a released node view leaves at 0 (SPEC-rich-text-react/AC-020). */
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

/** Sets state in a mount effect, as the chrome of Tiptap issue #7811 does, and opens a popup. */
const MentionChrome = () => {
    const { attrs } = useRichTextNodeView();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    // oxlint-disable-next-line @eslint-react/set-state-in-effect -- SPEC-rich-text-react/AC-010 runs chrome that does.
    useEffect(() => setMounted(true), []);
    const label = textOf(attrs.label);
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

const VIEWS = [
    { node: 'chrome_block', component: BlockChrome },
    { node: 'chrome_mention', component: MentionChrome },
    { node: 'chrome_image', component: ImageChrome },
];

/** The stand-in feature with chrome on each of its nodes, as a feature's own `view.tsx` attaches it. */
export const fixtureChromeViews = () => {
    let feature = fixtureChrome();
    for (const view of VIEWS) {
        feature = defineNodeView(feature, view);
    }
    return feature;
};
