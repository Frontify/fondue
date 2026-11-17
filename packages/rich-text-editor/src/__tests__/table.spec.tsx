/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { defaultPlugins, type RteDocument, RichTextRenderer, serializeToHtml, tablePlugin } from '../index';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const plugins = [...defaultPlugins, tablePlugin({ label: 'Tabelle' })];

const cell = (text: string, attributes: Record<string, unknown> = {}) => ({
    type: 'tableCell',
    ...attributes,
    children: [{ type: 'paragraph', children: [{ text }] }],
});

const header = (text: string) => ({
    type: 'tableHeader',
    children: [{ type: 'paragraph', children: [{ text }] }],
});

const doc: RteDocument = {
    version: 1,
    blocks: [
        {
            type: 'table',
            children: [
                { type: 'tableRow', children: [header('Name'), header('Role')] },
                { type: 'tableRow', children: [cell('Ada', { colspan: 2 })] },
            ],
        },
    ],
} as RteDocument;

const unmounts: (() => void)[] = [];
afterEach(() => {
    for (const unmount of unmounts.splice(0)) {
        act(unmount);
    }
});

const rendered = (): HTMLElement => {
    const container = window.document.createElement('div');
    const root = createRoot(container);
    act(() => root.render(<RichTextRenderer value={doc} plugins={plugins} />));
    unmounts.push(() => root.unmount());
    return container;
};

describe('a table in the readonly view', () => {
    it('scrolls in a region the keyboard reaches and a screen reader names', () => {
        const region = rendered().querySelector('[role="region"]');

        expect(region?.getAttribute('tabindex')).toBe('0');
        expect(region?.getAttribute('aria-label')).toBe('Tabelle');
    });

    it('keeps the table, its rows and its cells native', () => {
        const table = rendered().querySelector('[role="region"] > table');

        expect(table?.querySelector(':scope > tbody > tr > th')?.getAttribute('scope')).toBe('col');
        expect(table?.querySelector(':scope > tbody > tr > td')?.getAttribute('colspan')).toBe('2');
        expect(table?.querySelectorAll('tr')).toHaveLength(2);
    });
});

describe('a table exported as HTML', () => {
    it('writes header cells with their scope and cells with their spans', () => {
        const html = serializeToHtml(doc, { plugins, wrap: false });

        expect(html).toMatch(/<th class="[^"]*" scope="col">/);
        expect(html).toMatch(/<td class="[^"]*" colspan="2">/);
        expect(html).not.toContain('rowspan');
    });
});
