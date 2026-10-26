/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, screen } from '@testing-library/react';
import { AllSelection } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { partWithOptions } from '#/bridge/plugin';
import { brandDocumentModel } from '#/features';
import { blocksOf } from '#/features/__tests__/fixtures/generated';
import { mountUploads, para, pngFile, settle, text } from '#/features/mediaUpload/__tests__/fixtures/uploads';
import { pluginsById } from '#/features/plugins';
import { type ContentNodeJSON } from '#/model';
import { compiledModel } from '#/model/internal';
import { type SelectionTarget, setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

const model = brandDocumentModel;

/** The first canonical fixture block of the model that holds a node or mark of `type`. */
const blockWith = (type: string): ContentNodeJSON => {
    const holds = (node: ContentNodeJSON): boolean =>
        node.type === type ||
        (node.marks ?? []).some((mark) => mark.type === type) ||
        (node.content ?? []).some((child) => holds(child));
    const found = blocksOf(model).find((block) => holds(block));
    if (found === undefined) {
        throw new Error(`No fixture block holds ${type}.`);
    }

    return found;
};

/** The commands that open an overlay or a panel: the toolbar entries of the model's shipped parts and the image chrome's. */
const overlayEntries = (): readonly {
    command: string;
    payload?: unknown;
}[] => [
    ...compiledModel(model).features.flatMap(({ id, options }) => {
        const part = pluginsById([id])[0]?.editor;
        if (part === undefined) {
            return [];
        }

        return (partWithOptions(part, options).toolbar ?? []).filter(
            (entry) => entry.opensOverlay === true || entry.panel !== undefined,
        );
    }),
    { command: 'image.alt.edit' },
];

describe('session state outside the document', () => {
    it('leaves the snapshot and the copied HTML as they were after every overlay opens, an upload progresses and the content checks run', async () => {
        const blocks = [
            para(text('Before')),
            blockWith('link'),
            blockWith('ordered_list'),
            blockWith('figure'),
            blockWith('heading'),
            blockWith('code_block'),
        ];
        const mounted = await mountUploads({ model, blocks });
        setSelection(mounted.handle, { text: 'Before', from: 6, to: 6 });
        await mounted.choose([pngFile('logo.png')]);
        const { view } = mounted;
        const copied = () => {
            act(() => {
                view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)));
            });
            const clipboardData = new DataTransfer();
            act(() => {
                view.dom.dispatchEvent(
                    new ClipboardEvent('copy', {
                        clipboardData,
                        bubbles: true,
                        cancelable: true,
                    }),
                );
            });

            return clipboardData.getData('text/html');
        };

        const before = mounted.handle.getSnapshot().document;
        const html = copied();
        // The slot the upload start inserts holds what the file measured, never its progress or a local URL.
        const slot = mounted.images().find(({ assetId }) => assetId === null);
        if (slot === undefined) {
            throw new Error('The upload start inserted no slot.');
        }

        const { nodeId: _nodeId, ...stored } = slot;
        const leaks = /blob:|data:|progress|pending|uploading|% uploaded/i;

        expect(stored).toEqual({
            assetId: null,
            labelSnapshot: 'logo.png',
            altIntent: 'missing',
            altText: '',
            width: 40,
            height: 30,
            displayWidth: null,
            mediaType: null,
        });
        expect(JSON.stringify(before)).not.toMatch(leaks);
        expect(html).not.toMatch(leaks);
        // The panel host stays mounted and swaps its panel, so a panel counts by its ID.
        const overlays = () =>
            new Set<unknown>([
                ...document.body.querySelectorAll('[role="dialog"], [role="menu"]'),
                ...[...document.body.querySelectorAll('[data-rte-panel]')].map(
                    (panel) => `panel ${panel.getAttribute('data-rte-panel-id') ?? ''}`,
                ),
            ]);
        const chooser = vi.spyOn(HTMLInputElement.prototype, 'click');
        const imageTargets: SelectionTarget[] = mounted.imageIds().map((nodeId) => ({ nodeId }));
        const targets: SelectionTarget[] = [{ text: 'Before' }, { text: 'Before', from: 6, to: 6 }, ...imageTargets];
        const orderedItem = blockWith('ordered_list').content?.[0];
        const orderedItemContent = orderedItem?.content;
        const orderedLine = orderedItemContent?.[0];
        const orderedLineContent = orderedLine?.content;
        const orderedRun = orderedLineContent?.[0];
        const orderedText = orderedRun?.text;
        if (orderedText !== undefined) {
            targets.push({ text: orderedText, from: 0, to: 0 });
        }

        const codeRun = blockWith('code_block').content?.[0];
        const codeText = codeRun?.text;
        if (codeText !== undefined) {
            targets.push({ text: codeText, from: 0, to: 0 });
        }

        const opened: string[] = [];

        for (const entry of overlayEntries()) {
            // Image commands act on the selected image, so they try the image selections first.
            const ordered = entry.command.startsWith('image.') ? [...imageTargets, ...targets] : targets;
            for (const target of ordered) {
                act(() => setSelection(mounted.handle, target));
                const shown = overlays();
                chooser.mockClear();
                let status: string | undefined;
                act(() => {
                    status = mounted.handle.execute(entry.command as never, entry.payload as never).status;
                });
                await settle();
                // A command that only opens an overlay changes no content, so it reports no-op.
                if (status !== 'rejected') {
                    const appeared = [...overlays()].filter((overlay) => !shown.has(overlay)).length;
                    // Image opens the browser's file chooser, which no element of the page shows.
                    const opens =
                        appeared > 0 ||
                        (['image.insert', 'image.replace'].includes(entry.command) && chooser.mock.calls.length > 0);

                    expect([entry.command, opens]).toEqual([entry.command, true]);
                    expect(mounted.handle.getSnapshot().document).toEqual(before);
                    expect(copied()).toBe(html);
                    opened.push(entry.command);
                    break;
                }
            }
        }

        act(() => mounted.uploads.pending[0]?.context.reportProgress(0.5));
        await settle();
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        await settle();

        expect(opened).toEqual(overlayEntries().map(({ command }) => command));
        // The open dialog hides the rest of the page from assistive technology.
        expect(screen.getByRole('progressbar', { name: 'logo.png', hidden: true })).toBeDefined();
        expect(screen.getByText(/Errors: 1\./)).toBeDefined();
        expect(mounted.handle.getSnapshot().document).toEqual(before);
        expect(copied()).toBe(html);
        expect(copied()).not.toMatch(leaks);
        mounted.unmount();
    });
});
