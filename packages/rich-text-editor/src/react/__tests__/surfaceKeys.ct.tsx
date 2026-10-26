/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { type RichTextProfile } from '#/index';

import { SURFACE_KEY_ROWS } from '../examples/keyboard';

import { execute, selectImage, settled, toolbarOf } from './fixtures/layout';
import { ProfileProbe } from './fixtures/ProfileProbe';
import { ready } from './fixtures/ready';

type Effect = {
    /** The editor sets `onSubmit`. */
    readonly submits?: boolean;
    /** The editor gets the host services an image needs. */
    readonly services?: boolean;
    /** The toolbar mode the editor mounts with. */
    readonly toolbarMode: 'fixed' | 'bubble';
    /** Presses `key` and asserts the effect the row of the keyboard reference states. */
    readonly run: (page: Page, key: string) => Promise<void>;
};

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Message' });
const submitted = (page: Page) => page.evaluate(() => window.profileProbe?.submitted ?? []);

/** The Playwright name of a key binding of the reference, such as `Mod-Enter`. */
const pressedAs = (key: string) => key.replaceAll('Mod', 'ControlOrMeta').replaceAll('-', '+');

const focusMoves: Effect = {
    toolbarMode: 'fixed',
    run: async (page, key) => {
        await surfaceOf(page).click();
        await page.keyboard.press(pressedAs(key));
        await expect(toolbarOf(page).locator(':focus')).toHaveCount(1);
        // The toolbar hands focus back on Escape, not on the shortcut again; the first Escape closes the item's tooltip.
        await expect(page.getByRole('tooltip')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(page.getByRole('tooltip')).toHaveCount(0);
        await page.keyboard.press('Escape');

        await expect(surfaceOf(page)).toBeFocused();
    },
};

const focusLeaves: Effect = {
    toolbarMode: 'fixed',
    run: async (page, key) => {
        await surfaceOf(page).click();
        await page.keyboard.type('Hello');
        await page.keyboard.press(pressedAs(key));

        await expect(page.locator('[data-rte-surface]:focus')).toHaveCount(0);
        await expect(surfaceOf(page)).toHaveText('Hello');
    },
};

const bubbleCloses: Effect = {
    toolbarMode: 'bubble',
    run: async (page, key) => {
        const bubble = page.locator('[data-rte-bubble-toolbar]');
        await surfaceOf(page).click();
        await page.keyboard.type('Hello');
        await settled(page);
        await page.keyboard.press('Shift+Home');
        await expect(bubble).toBeVisible();
        await page.keyboard.press(pressedAs(key));

        await expect(bubble).toBeHidden();
    },
};

const submits: Effect = {
    toolbarMode: 'fixed',
    submits: true,
    run: async (page, key) => {
        await surfaceOf(page).click();
        await page.keyboard.type('Hello');
        await page.keyboard.press(pressedAs(key));

        expect(await submitted(page)).toEqual(['Hello']);
    },
};

/** Types a code block, presses the key at its end, then types a mark of where the caret went. */
const newParagraphAfterCodeBlock: Effect = {
    toolbarMode: 'fixed',
    run: async (page, key) => {
        await surfaceOf(page).click();
        await page.keyboard.type('``` x = 1');
        await page.keyboard.press(pressedAs(key));
        await page.keyboard.type('!');

        // The block also holds its language label, so the text it contains is checked.
        await expect(surfaceOf(page).locator('pre')).toContainText('x = 1');
        await expect(surfaceOf(page).locator('pre')).not.toContainText('!');
        await expect(surfaceOf(page).locator('p')).toHaveText(['!']);
    },
};

/** Inserts an image, selects it, presses the key and expects the context menu at the image. */
const contextMenuOpens: Effect = {
    toolbarMode: 'fixed',
    services: true,
    run: async (page, key) => {
        await surfaceOf(page).focus();
        await page.keyboard.insertText('Intro');
        await execute(page, 'image.insert');
        await expect(surfaceOf(page).locator('figure')).toHaveCount(1);
        await selectImage(page);
        await page.keyboard.press(pressedAs(key));

        await expect(page.getByRole('menu', { name: 'Selection actions' })).toBeVisible();
    },
};

const effectOf = (key: string, profile: RichTextProfile): Effect | undefined => {
    if (key === 'Alt-F10') {
        return focusMoves;
    }

    if (key === 'Shift-F10' || key === 'ContextMenu') {
        return contextMenuOpens;
    }

    if (key === 'Tab' || key === 'Shift-Tab') {
        return focusLeaves;
    }

    if (key === 'Escape') {
        return bubbleCloses;
    }

    if (key === 'ArrowDown') {
        return newParagraphAfterCodeBlock;
    }

    if (key === 'Mod-Enter' && (profile === 'document' || profile === 'brand-document')) {
        return newParagraphAfterCodeBlock;
    }

    if (key === 'Enter' || key === 'Shift-Enter' || key === 'Mod-Enter') {
        return submits;
    }

    return undefined;
};

for (const { action, key, profiles } of SURFACE_KEY_ROWS) {
    for (const profile of profiles) {
        test(`${key} in the ${profile} profile: ${action}`, async ({ mount, page }) => {
            const effect = effectOf(key, profile);
            if (effect === undefined) {
                throw new Error(`No effect is pinned for ${key} in the ${profile} profile.`);
            }

            await mount(
                <ProfileProbe
                    profile={profile}
                    submits={effect.submits === true}
                    withServices={effect.services === true}
                    defaultToolbarMode={effect.toolbarMode}
                />,
            );
            await ready(page);

            await effect.run(page, key);
        });
    }
}
