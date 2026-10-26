/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, useEffect } from 'react';

import { useClientLayoutEffect } from './clientLayoutEffect';

/**
 * Whether the editor's React tree renders or runs effects now, which a development build marks for
 * `react.execute-in-render`. React offers no public signal for its render or effect phases, so the package marks
 * its own: a session render through its effects between two `Phase` markers, and every render of a part that reads
 * the editor through a package hook.
 */
export type ReactWork = {
    /** Between the opening and the closing `Phase` of a session render, through its layout effects and effects. */
    phase: boolean;
    /** From the render of a part that calls a package hook to the commit that follows it. */
    rendering: boolean;
};

export const createReactWork = (): ReactWork => ({
    phase: false,
    rendering: false,
});

/** `undefined` in a production build, which runs no check. */
export const inReactWork = (work: ReactWork | undefined): boolean =>
    work !== undefined && (work.phase || work.rendering);

/** The session's marks, which a production build leaves `undefined`. */
export const ReactWorkContext = createContext<ReactWork | undefined>(undefined);
ReactWorkContext.displayName = 'RichTextEditorReactWorkContext';

/**
 * Marks the render of the part that calls it until its commit; a render that never commits closes at the next
 * microtask, so no event handler finds it open.
 */
export const useRenderMark = (): void => {
    const work = useContext(ReactWorkContext);
    if (work !== undefined && !work.rendering) {
        work.rendering = true;
        // oxlint-disable-next-line @eslint-react/purity -- a render that never commits runs no effect to close its mark.
        queueMicrotask(() => {
            work.rendering = false;
        });
    }

    useClientLayoutEffect(() => {
        if (work !== undefined) {
            work.rendering = false;
        }
    });
};

/**
 * Marks the render, layout effects and effects of the parts between an opening and a closing `Phase`, which React
 * runs in tree order; a render that never commits closes at the next microtask.
 */
export const Phase = ({ work, open }: { readonly work: ReactWork; readonly open: boolean }) => {
    work.phase = open;
    if (open) {
        // oxlint-disable-next-line @eslint-react/purity -- a render that never commits runs no effect to close its mark.
        queueMicrotask(() => {
            work.phase = false;
        });
    }

    useClientLayoutEffect(() => {
        work.phase = open;
    });
    useEffect(() => {
        work.phase = open;
    });

    return null;
};

/** The accessible name of a surface: the text its `aria-labelledby` elements hold, else its `aria-label`. */
const nameOf = (surface: Element): string => {
    const labelledBy = surface.getAttribute('aria-labelledby');
    if (labelledBy === null) {
        return (surface.getAttribute('aria-label') ?? '').trim();
    }

    const document = surface.ownerDocument;

    return labelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent)
        .join(' ')
        .trim();
};

// Set on a surface once its session is ready, as a property so the DOM output stays the same.
const READY = Symbol('rte.ready');

/** Marks a surface whose session is ready, such as one remounted in a live session, for later editors to compare with. */
export const markReady = (surface: Element): void => {
    if (!(READY in surface)) {
        Object.defineProperty(surface, READY, { value: true });
    }
};

/**
 * Marks `surface` ready and tells whether a surface that became ready before it has the same accessible name, so the
 * editor mounted second warns wherever it sits in the document.
 */
export const sharesName = (surface: Element): boolean => {
    const name = nameOf(surface);
    const surfaces = [...surface.ownerDocument.querySelectorAll('[data-rte-surface]')];
    const shared = surfaces.some((other) => other !== surface && READY in other && nameOf(other) === name);
    markReady(surface);

    return shared;
};
