/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/test';

import { APPS } from './setup';

for (const { name, port } of APPS) {
    test(`serves the reader rendered on the server and mounts the comment editor in the ${name} app, with no page error or console.error`, async ({
        page,
        request,
    }) => {
        const url = `http://localhost:${port}/`;
        const response = await request.get(url);
        const served = await response.text();
        const errors: string[] = [];
        page.on('pageerror', (error) => errors.push(error.message));
        page.on('console', (message) => {
            if (message.type() === 'error') {
                errors.push(message.text());
            }
        });

        expect(served).toContain('Rendered on the server.');

        await page.goto(url);
        const editor = page.getByRole('textbox', { name: 'Comment' });
        await expect(editor).toHaveAttribute('contenteditable', 'true');
        await editor.click();
        await page.keyboard.type(' Typed.');

        await expect(editor).toContainText('Typed.');
        expect(errors).toEqual([]);
        await expect(page.locator('[data-smoke="reader"]')).toContainText('Rendered on the server.');
    });
}
