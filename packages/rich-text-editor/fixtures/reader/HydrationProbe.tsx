/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

import { RichTextReader } from '../../src/reader/reader';

import { semanticModel } from './semantic';

const model = semanticModel();

export interface HydrationResult {
    /** `process.env.NODE_ENV` as the bundle was built; `development` keeps React's mismatch warnings. */
    readonly mode: string;
    /** Every error React reported through `onRecoverableError`. */
    readonly recoverable: readonly string[];
    readonly html: string;
}

const Done = ({ onDone }: { onDone: () => void }) => {
    useEffect(onDone, [onDone]);
    return null;
};

/**
 * Renders `document` with `renderToString`, puts that markup in the page and hydrates it, then reports what React
 * said. `html` replaces the server markup, so a test can check that a mismatch is seen.
 */
export const HydrationProbe = ({
    document,
    html,
    onDone,
}: {
    document: unknown;
    html?: string;
    onDone: (result: HydrationResult) => void;
}) => {
    const host = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const container = window.document.createElement('div');
        const tree = (done: () => void) => (
            <>
                <RichTextReader document={document} model={model} />
                <Done onDone={done} />
            </>
        );
        container.innerHTML = html ?? renderToString(tree(() => undefined));
        host.current?.append(container);
        const recoverable: string[] = [];
        const root = hydrateRoot(
            container,
            tree(() => onDone({ mode: `${process.env.NODE_ENV}`, recoverable, html: container.innerHTML })),
            { onRecoverableError: (error) => recoverable.push(String(error)) },
        );
        return () => root.unmount();
    }, [document, html, onDone]);
    return <div ref={host} />;
};
