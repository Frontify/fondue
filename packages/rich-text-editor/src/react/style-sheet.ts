/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject } from 'react';

import { useClientLayoutEffect } from '#/bridge/client-layout-effect';

interface Attached {
    readonly element: HTMLStyleElement;
    count: number;
}

// One `style` element per stylesheet text and document, which every editor that shows it shares.
const sheets = new WeakMap<Document, Map<string, Attached>>();

const attach = (owner: Document, css: string) => {
    let byText = sheets.get(owner);
    if (byText === undefined) {
        byText = new Map();
        sheets.set(owner, byText);
    }
    const texts = byText;
    let attached = texts.get(css);
    if (attached === undefined) {
        const element = owner.createElement('style');
        element.setAttribute('data-rte-styles', '');
        element.textContent = css;
        owner.head.append(element);
        attached = { element, count: 0 };
        texts.set(css, attached);
    }
    const entry = attached;
    entry.count += 1;
    return () => {
        entry.count -= 1;
        if (entry.count === 0) {
            entry.element.remove();
            texts.delete(css);
        }
    };
};

/** Puts the generated recipe stylesheet in the document of `ref` once, while an editor shows it. */
export const useRecipeSheet = (ref: RefObject<HTMLElement | null>, css: string): void => {
    useClientLayoutEffect(() => {
        const owner = ref.current?.ownerDocument;
        if (owner === undefined || css === '') {
            return undefined;
        }
        return attach(owner, css);
    }, [ref, css]);
};
