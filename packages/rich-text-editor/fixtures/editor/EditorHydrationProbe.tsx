/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useLayoutEffect, useRef } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { bold, core } from '../../src/features';
import { defineEditor, RichTextEditor } from '../../src/index';
import { compileContentModel } from '../../src/model';

import { storedOf } from './EditorProbe';

const definition = defineEditor({
    id: 'test.ct',
    model: compileContentModel([core(), bold()], { id: 'test.ct', version: 1 }),
});

export interface EditorHydrationResult {
    /** `process.env.NODE_ENV` as the bundle was built; `development` keeps React's mismatch warnings. */
    readonly mode: string;
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

/** Hydrates the editor over `serverHtml`, rendered in Node, and samples the surface text in each frame after the commit. */
export const EditorHydrationProbe = ({
    text,
    serverHtml,
    blocked = false,
    onDone,
}: {
    readonly text: string;
    readonly serverHtml: string;
    /** Stores the text in an unknown format version, which shows the blocked shell; `serverHtml` must match. */
    readonly blocked?: boolean;
    readonly onDone: (result: EditorHydrationResult) => void;
}) => {
    const host = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let defaultValue = storedOf(text);
        if (blocked) {
            defaultValue = { ...defaultValue, document: { ...defaultValue.document, formatVersion: 2 as 1 } };
        }
        const container = window.document.createElement('div');
        container.innerHTML = serverHtml;
        host.current?.append(container);
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
            <>
                <RichTextEditor aria-label="Notes" definition={definition} defaultValue={defaultValue} />
                <Committed
                    onCommit={() => {
                        // This sibling's layout effect runs after the editor's, so a view attached later would miss it.
                        atCommit = surfaceText();
                        requestAnimationFrame(sample);
                    }}
                />
            </>,
            { onRecoverableError: (error) => recoverable.push(String(error)) },
        );
        return () => root.unmount();
    }, [text, serverHtml, blocked, onDone]);
    return <div ref={host} />;
};
