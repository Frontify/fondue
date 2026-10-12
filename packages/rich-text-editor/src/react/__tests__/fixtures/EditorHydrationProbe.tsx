/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useLayoutEffect, useRef } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

import { bold, core } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

import { storedOf } from './EditorProbe';

const definition = defineEditor({
    id: 'test.ct',
    model: compileContentModel([core(), bold()], { id: 'test.ct', version: 1 }),
});

export interface EditorHydrationResult {
    /** `process.env.NODE_ENV` as the bundle was built; `development` keeps React's mismatch warnings. */
    readonly mode: string;
    /** Every error React reported through `onRecoverableError`. */
    readonly recoverable: readonly string[];
    readonly serverHtml: string;
    /** The surface text in the layout effects of the hydration commit, before any frame paints. */
    readonly atCommit: string;
    /** The surface text in each animation frame from the hydration commit on. */
    readonly frames: readonly string[];
}

const Committed = ({ onCommit }: { readonly onCommit: () => void }) => {
    useLayoutEffect(onCommit, [onCommit]);
    return null;
};

/**
 * Renders the editor with `renderToString`, puts that markup in the page and hydrates it, then samples the surface
 * text in each frame after the commit.
 */
export const EditorHydrationProbe = ({
    text,
    onDone,
}: {
    readonly text: string;
    readonly onDone: (result: EditorHydrationResult) => void;
}) => {
    const hostRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const container = window.document.createElement('div');
        const tree = (done: () => void) => (
            <>
                <RichTextEditor aria-label="Notes" definition={definition} defaultValue={storedOf(text)} />
                <Committed onCommit={done} />
            </>
        );
        const serverHtml = renderToString(tree(() => undefined));
        container.innerHTML = serverHtml;
        hostRef.current?.append(container);
        const recoverable: string[] = [];
        const frames: string[] = [];
        let atCommit = '';
        const surfaceText = () => {
            const surface = container.querySelector('[role="textbox"]');
            if (surface === null || surface.textContent === null) {
                return '';
            }
            return surface.textContent;
        };
        const sample = () => {
            frames.push(surfaceText());
            if (frames.length < 3) {
                requestAnimationFrame(sample);
                return;
            }
            onDone({ mode: `${process.env.NODE_ENV}`, recoverable, serverHtml, atCommit, frames });
        };
        const root = hydrateRoot(
            container,
            tree(() => {
                atCommit = surfaceText();
                requestAnimationFrame(sample);
            }),
            { onRecoverableError: (error) => recoverable.push(String(error)) },
        );
        return () => root.unmount();
    }, [text, onDone]);
    return <div ref={hostRef} />;
};
