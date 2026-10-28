/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';
import { type CSSProperties } from 'react';

import { bullets, listItem } from '#/react/__tests__/fixtures/listBlocks';
import { ListProbe } from '#/react/__tests__/fixtures/ListProbe';

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });

const markerOf = (list: Locator) =>
    list
        .locator('li')
        .first()
        .evaluate((item) => {
            const style = getComputedStyle(item, '::marker');

            return { color: style.color, size: style.fontSize };
        });

test('theme variables survive in listLevels colour and size in the editor and the reader', async ({ mount, page }) => {
    const listLevels = {
        bullet: [{ shape: 'disc', color: 'var(--host-accent)', size: 'var(--host-marker-size)' }],
        ordered: [{ counterType: 'decimal' }],
    };
    await mount(
        <div style={{ '--host-accent': 'rgb(200, 0, 0)', '--host-marker-size': '18px' } as CSSProperties}>
            <ListProbe blocks={[bullets(listItem('one'))]} listLevels={listLevels} reader />
        </div>,
    );
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');

    const themed = { color: 'rgb(200, 0, 0)', size: '18px' };
    expect(await markerOf(surfaceOf(page))).toEqual(themed);
    expect(await markerOf(page.getByRole('region', { name: 'Reader' }))).toEqual(themed);
});
