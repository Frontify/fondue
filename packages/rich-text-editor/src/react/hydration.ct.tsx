/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { type EditorHydrationResult, EditorHydrationProbe } from '../../fixtures/editor/EditorHydrationProbe';

// `NODE_ENV=development` keeps React's mismatch warnings, which `pnpm test:components:hydration` builds with.
for (const text of ['', 'Rotate the signing keys']) {
    test(`SPEC-rich-text-output/AC-033 SPEC-rich-text-output/AC-034 hydrates the editor of "${text}" and shows its content from the first frame`, async ({
        mount,
        page,
    }) => {
        const problems: string[] = [];
        page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));
        page.on('console', (message) => {
            if (message.type() === 'error') {
                problems.push(`console.error: ${message.text()}`);
            }
        });
        let reported: EditorHydrationResult | undefined;

        await mount(
            <EditorHydrationProbe
                text={text}
                onDone={(result) => {
                    reported = result;
                }}
            />,
        );
        await expect.poll(() => reported).toBeDefined();

        expect(reported?.recoverable).toEqual([]);
        expect(problems).toEqual([]);
        expect(reported?.serverHtml).toContain('data-rte-surface=""></div>');
        expect(reported?.atCommit).toBe(text);
        expect(reported?.frames).toEqual([text, text, text]);
        test.info().annotations.push({ type: 'react build', description: String(reported?.mode) });
    });
}

test('SPEC-rich-text-output/AC-033 SPEC-rich-text-react/AC-087 hydrates the blocked shell of a document in an unknown format version with no mismatch', async ({
    mount,
    page,
}) => {
    const problems: string[] = [];
    page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));
    page.on('console', (message) => {
        if (message.type() === 'error') {
            problems.push(`console.error: ${message.text()}`);
        }
    });
    let reported: EditorHydrationResult | undefined;

    await mount(
        <EditorHydrationProbe
            text="Rotate the signing keys"
            blocked
            onDone={(result) => {
                reported = result;
            }}
        />,
    );
    await expect.poll(() => reported).toBeDefined();

    expect(reported?.recoverable).toEqual([]);
    expect(problems).toEqual([]);
    expect(reported?.serverHtml).toContain('data-rte-shell="blocked"');
    expect(reported?.serverHtml).not.toContain('contenteditable');
    await expect(page.getByRole('button', { name: 'Copy original' })).toBeVisible();
    test.info().annotations.push({ type: 'react build', description: String(reported?.mode) });
});
