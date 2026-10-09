/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useLayoutEffect, useRef } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

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
    /** The surface text in each animation frame from the hydration commit on. */
    readonly frames: readonly string[];
}

const Committed = ({ onCommit }: { readonly onCommit: () => void }) => {
    useLayoutEffect(onCommit, [onCommit]);
    return null;
};

/** Server renders the editor, hydrates that markup and samples the surface text in each frame after the commit. */
export const EditorHydrationProbe = ({
    text,
    onDone,
}: {
    readonly text: string;
    readonly onDone: (result: EditorHydrationResult) => void;
}) => {
    const host = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const tree = (onCommit: () => void) => (
            <>
                <RichTextEditor aria-label="Notes" definition={definition} defaultValue={storedOf(text)} />
                <Committed onCommit={onCommit} />
            </>
        );
        const container = window.document.createElement('div');
        const serverHtml = renderToString(tree(() => undefined));
        container.innerHTML = serverHtml;
        host.current?.append(container);
        const recoverable: string[] = [];
        const frames: string[] = [];
        const sample = () => {
            frames.push(container.querySelector('[role="textbox"]')?.textContent ?? '');
            if (frames.length < 3) {
                requestAnimationFrame(sample);
                return;
            }
            onDone({ mode: `${process.env.NODE_ENV}`, recoverable, serverHtml, frames });
        };
        const root = hydrateRoot(
            container,
            tree(() => requestAnimationFrame(sample)),
            { onRecoverableError: (error) => recoverable.push(String(error)) },
        );
        return () => root.unmount();
    }, [text, onDone]);
    return <div ref={host} />;
};
