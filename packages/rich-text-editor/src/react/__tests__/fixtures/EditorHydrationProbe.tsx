/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useLayoutEffect, useRef } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';
import { bold, core } from '#/plugins';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';

import { storedOf } from './EditorProbe';

const model = compileContentModel([core(), bold()], { id: 'test.ct', version: 1 });
const definition = defineEditor({ id: 'test.ct', model, plugins: pluginsFor(model) });

export type EditorHydrationResult = {
    /** `process.env.NODE_ENV` as the bundle was built; `development` keeps React's mismatch warnings. */
    mode: string;
    /** Every error React reported through `onRecoverableError`. */
    recoverable: readonly string[];
    serverHtml: string;
    /** The surface text in the layout effects of the hydration commit, before any frame paints. */
    atCommit: string;
    /** The surface text in each animation frame from the hydration commit on. */
    frames: readonly string[];
};

type CommittedProps = { onCommit: () => void };

const Committed = ({ onCommit }: CommittedProps) => {
    useLayoutEffect(onCommit, [onCommit]);

    return null;
};

export type EditorHydrationProbeProps = {
    text: string;
    /** Stores the text in an unknown format version, which shows the blocked shell. */
    blocked?: boolean;
    onDone: (result: EditorHydrationResult) => void;
};

/**
 * Renders the editor with `renderToString`, puts that markup in the page and hydrates it, then samples the surface
 * text in each frame after the commit.
 */
export const EditorHydrationProbe = ({ text, blocked = false, onDone }: EditorHydrationProbeProps) => {
    const hostRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let defaultValue = storedOf(text);
        if (blocked) {
            defaultValue = { ...defaultValue, document: { ...defaultValue.document, formatVersion: 2 as 1 } };
        }

        const container = window.document.createElement('div');
        const tree = (done: () => void) => (
            <>
                <RichTextEditor aria-label="Notes" definition={definition} defaultValue={defaultValue} />
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
                // This sibling's layout effect runs after the editor's, so a view attached later would miss it.
                atCommit = surfaceText();
                requestAnimationFrame(sample);
            }),
            { onRecoverableError: (error) => recoverable.push(String(error)) },
        );

        return () => root.unmount();
    }, [text, blocked, onDone]);

    return <div ref={hostRef} />;
};
