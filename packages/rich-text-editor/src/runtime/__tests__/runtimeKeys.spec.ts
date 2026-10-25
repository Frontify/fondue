/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { isApplePlatform } from '#/bridge/platform';
import { defineEditorPart, type EditorApi } from '#/bridge/plugin';
import { fixtureHeadingSet } from '#/features/__tests__/fixtures/features';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { compileContentModel, defineFeature, type FeatureDeclaration } from '#/model';
import { pressKey, setSelection } from '#/testing';
import { bindingHere } from '#/ui/shortcuts';

import { stored, para, words, TEXT_INSERT, start, heading, textOf, installRuntimeHooks } from './fixtures/start';

installRuntimeHooks();

describe('key precedence', () => {
    it('runs the commands features bind to one key in plugin order until one applies', () => {
        const leaveHeading = defineFeature({
            id: 'fixture.leave-heading',
            version: 1,
            requires: [{ id: 'fixture.heading-set', version: 1 }],
        });
        const markLine = defineFeature({
            id: 'fixture.mark-line',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
        });
        const parts = [
            defineEditorPart(leaveHeading, {
                needs: ['blocks'],
                commands: { 'fixture.paragraph.set': { run: (api) => api.blocks.set('paragraph') } },
                keys: { Enter: 'fixture.paragraph.set' },
            }),
            defineEditorPart(markLine, {
                needs: ['insert'],
                commands: { 'fixture.text.insert': TEXT_INSERT },
                keys: { Enter: { command: 'fixture.text.insert', payload: { text: '¶' } } },
            }),
        ];
        const model = compileContentModel([core(), bold(), fixtureHeadingSet(), leaveHeading(), markLine()], {
            id: 'test.bold',
            version: 1,
        });
        const { handle, view, changes } = start(stored(para(words('ab')), heading(2, words('cd'))), {
            model,
            parts,
        });

        setSelection(handle, { text: 'ab', from: 2, to: 2 });
        pressKey(handle, 'Enter');
        setSelection(handle, { text: 'cd', from: 2, to: 2 });
        pressKey(handle, 'Enter');

        expect(changes.map(({ commandId }) => commandId)).toEqual(['fixture.text.insert', 'fixture.paragraph.set']);
        expect([textOf(view.state.doc), view.state.doc.child(1).type.name]).toEqual(['ab¶cd', 'paragraph']);
    });
});

describe('platform key bindings', () => {
    const pullQuoteDeclaration = {
        id: 'acme.pull-quote',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            acme_pull_quote: {
                group: 'block',
                content: 'inline*',
                attrs: { tone: { type: 'enum', values: ['neutral', 'brand'], default: 'neutral' } },
                html: ['blockquote', { class: 'acme-pull-quote', 'data-tone': { attr: 'tone' } }, 0],
                parse: [{ tag: 'blockquote.acme-pull-quote', attrs: { tone: { from: 'data-tone' } } }],
            },
        },
        formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
    } as const satisfies FeatureDeclaration;
    const pullQuote = defineFeature(pullQuoteDeclaration);
    const pullQuoteSet = {
        run: (api: EditorApi<'blocks'>) => api.blocks.set('acme_pull_quote', undefined, { toggle: true }),
    };
    const part = defineEditorPart(pullQuote, {
        needs: ['blocks'],
        commands: { 'acme.pull-quote.set': pullQuoteSet },
        keys: { 'mac:Mod-Alt-q': 'acme.pull-quote.set', 'other:Ctrl-Shift-q': 'acme.pull-quote.set' },
    });
    const model = compileContentModel([core(), pullQuote()], {
        id: 'test.bold',
        version: 1,
    });
    const firstType = ({ view }: ReturnType<typeof start>) => view.state.doc.child(0).type.name;
    // `Mod` is Meta on the platform the keymap takes for Apple's, else Ctrl.
    const modAltQ = (apple: boolean) =>
        new KeyboardEvent('keydown', { key: 'q', altKey: true, metaKey: apple, ctrlKey: !apple, bubbles: true });
    afterEach(() => vi.restoreAllMocks());

    it('compiles the mac: and other: keys of a feature and runs each on its platform only', () => {
        const platform = vi.spyOn(navigator, 'platform', 'get').mockReturnValue('Win32');
        const session = start(stored(para(words('ab'))), { model, parts: [part] });
        setSelection(session.handle, { text: 'ab', from: 1, to: 1 });

        pressKey(session.handle, 'Ctrl-Shift-q');
        expect(firstType(session)).toBe('acme_pull_quote');
        platform.mockReturnValue('MacIntel');
        // The `other:` binding does nothing on an Apple platform, where the `mac:` one turns the block back.
        pressKey(session.handle, 'Ctrl-Shift-q');
        expect(firstType(session)).toBe('acme_pull_quote');
        pressKey(session.handle, 'Mod-Alt-q');
        expect(firstType(session)).toBe('paragraph');
    });

    it('runs the mac: binding over a plain binding of the same key on an Apple platform', () => {
        const both = defineEditorPart(pullQuote, {
            needs: ['blocks'],
            commands: {
                'acme.pull-quote.set': pullQuoteSet,
                'acme.pull-quote.unset': { run: (api) => api.blocks.set('paragraph') },
            },
            keys: { 'mac:Mod-Alt-q': 'acme.pull-quote.set', 'Mod-Alt-q': 'acme.pull-quote.unset' },
        });
        const platform = vi.spyOn(navigator, 'platform', 'get').mockReturnValue('MacIntel');
        const session = start(stored(para(words('ab'))), { model, parts: [both] });
        setSelection(session.handle, { text: 'ab', from: 1, to: 1 });

        pressKey(session.handle, 'Mod-Alt-q');
        expect(firstType(session)).toBe('acme_pull_quote');
        platform.mockReturnValue('Win32');
        pressKey(session.handle, 'Mod-Alt-q');
        expect(firstType(session)).toBe('paragraph');
    });

    it('picks the mac: binding for the keydown and the tooltip alike when only userAgentData names macOS', () => {
        vi.spyOn(navigator, 'platform', 'get').mockReturnValue('');
        Object.defineProperty(navigator, 'userAgentData', { configurable: true, get: () => ({ platform: 'macOS' }) });
        try {
            const session = start(stored(para(words('ab'))), { model, parts: [part] });
            setSelection(session.handle, { text: 'ab', from: 1, to: 1 });

            expect(bindingHere(['mac:Mod-Alt-q', 'other:Ctrl-Shift-q'], isApplePlatform())).toBe('mac:Mod-Alt-q');
            pressKey(session.handle, 'Ctrl-Shift-q');
            expect(firstType(session)).toBe('paragraph');
            session.view.dom.dispatchEvent(modAltQ(true));
            expect(firstType(session)).toBe('acme_pull_quote');
        } finally {
            Reflect.deleteProperty(navigator, 'userAgentData');
        }
    });

    it('runs a mac:Mod binding on the Meta key when only userAgentData names macOS', () => {
        vi.spyOn(navigator, 'platform', 'get').mockReturnValue('');
        Object.defineProperty(navigator, 'userAgentData', { configurable: true, get: () => ({ platform: 'macOS' }) });
        try {
            const bound = defineEditorPart(pullQuote, {
                needs: ['blocks'],
                commands: { 'acme.pull-quote.set': pullQuoteSet },
                keys: { 'mac:Mod-b': 'acme.pull-quote.set' },
            });
            const session = start(stored(para(words('ab'))), { model, parts: [bound] });
            setSelection(session.handle, { text: 'ab', from: 1, to: 1 });

            session.view.dom.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', metaKey: true, bubbles: true }));
            expect(firstType(session)).toBe('acme_pull_quote');
        } finally {
            Reflect.deleteProperty(navigator, 'userAgentData');
        }
    });
});
