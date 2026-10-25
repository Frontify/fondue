/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { SwitchingDocuments } from './fixtures/SwitchingDocuments';

const logEntries = (page: Page) => page.locator('[aria-label="Event log"] li').allTextContents();

test('saves unsaved edits once before remounting the editor under another definition', async ({ mount, page }) => {
    await mount(<SwitchingDocuments />);
    await expect.poll(() => logEntries(page)).toContain('ready story.switching.note');

    await page.getByRole('button', { name: 'Edit the text' }).click();
    await page.getByRole('button', { name: 'Open as a comment' }).click();
    await expect.poll(() => logEntries(page)).toContain('ready story.switching.comment');

    const entries = await logEntries(page);
    const remount = entries.indexOf('ready story.switching.comment');
    const saves = entries.filter((entry) => entry.startsWith('save'));
    expect(saves).toEqual(['save note-1']);
    expect(entries.indexOf('save note-1')).toBeLessThan(remount);
    expect(entries).not.toContain('diagnostic persistence.disposed-dirty');
});

test('saves unsaved edits once when opening another document of the same definition', async ({ mount, page }) => {
    await mount(<SwitchingDocuments />);
    await expect.poll(() => logEntries(page)).toContain('ready story.switching.note');

    await page.getByRole('button', { name: 'Edit the text' }).click();
    await page.getByRole('button', { name: 'Open the second note' }).click();
    await expect.poll(() => logEntries(page)).toContain('replaceDocument replaced');

    const entries = await logEntries(page);
    expect(entries.filter((entry) => entry.startsWith('save'))).toEqual(['save note-1']);
    expect(entries).not.toContain('diagnostic persistence.disposed-dirty');
    expect(entries).not.toContain('ready story.switching.comment');
    await expect(page.getByRole('textbox', { name: 'Note' })).toHaveText('The second note.');
});
