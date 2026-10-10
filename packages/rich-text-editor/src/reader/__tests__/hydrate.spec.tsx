/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RichTextReader } from '../reader';

import { semanticModel } from './fixtures/semantic';
import { fixturesIn } from './helpers/helpers';

const model = semanticModel();

declare global {
    // React reads this flag to allow `act` outside a test renderer.
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}

describe('the reader hydrating in the DOM', () => {
    beforeEach(() => {
        globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    const hydrate = (document: unknown) => {
        const html = renderToString(<RichTextReader document={document} model={model} />);
        const container = window.document.createElement('div');
        container.innerHTML = html;
        window.document.body.append(container);
        const recoverable: unknown[] = [];
        const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        act(() => {
            hydrateRoot(container, <RichTextReader document={document} model={model} />, {
                onRecoverableError: (error) => recoverable.push(error),
            });
        });
        return { container, recoverable, errors };
    };

    it('detects markup the server did not write, so a clean run proves something', () => {
        const container = window.document.createElement('div');
        container.innerHTML = '<div>not what the reader writes</div>';
        window.document.body.append(container);
        const recoverable: unknown[] = [];
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        act(() => {
            hydrateRoot(container, <RichTextReader document={fixturesIn('valid')[0]?.[1]} model={model} />, {
                onRecoverableError: (error) => recoverable.push(error),
            });
        });

        expect(recoverable.length).toBeGreaterThan(0);
    });

    it('hydrates an unsupported_inline inside a paragraph as a span, with no hydration error', () => {
        const unknown = fixturesIn('unknown').find(([name]) => name === 'unknown-nodes.json')?.[1];

        const { container, recoverable, errors } = hydrate(unknown);

        expect(container.querySelector('p > span[role="group"]')?.textContent).toBe('smile');
        expect(container.querySelector('p > div')).toBeNull();
        expect(container.querySelectorAll('[data-rte-message="islands"]')).toHaveLength(1);
        expect(recoverable).toEqual([]);
        expect(errors).not.toHaveBeenCalled();
    });

    it.each(fixturesIn('valid'))('hydrates the valid fixture %s with no hydration error', (_, document) => {
        const { recoverable, errors } = hydrate(document);

        expect(recoverable).toEqual([]);
        expect(errors).not.toHaveBeenCalled();
    });
});
