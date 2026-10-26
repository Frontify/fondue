/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { clipped, moreOf, populate, PROFILES, ready } from './fixtures/layout';
import { ProfileProbe } from './fixtures/ProfileProbe';

// Firefox scales its default font size as a 200% text size does; the others take a 32 px root font size (CL-3075).
test.use({ launchOptions: { firefoxUserPrefs: { 'font.size.variable.x-western': 32 } } });

for (const profile of PROFILES) {
    test(`scales the ${profile} profile's chrome and content text to twice the 16 px run, clipping none`, async ({
        mount,
        page,
        browserName,
    }) => {
        const heights = async () => {
            const component = await mount(<ProfileProbe profile={profile} />);
            await ready(page);
            await populate(page);
            await moreOf(page).click();
            // More loads its rows on first use.
            await expect(page.getByRole('menu')).toBeVisible();
            const measured = await page.evaluate(() => {
                const height = (element: Element | null) => {
                    if (element === null) {
                        return 0;
                    }
                    const range = document.createRange();
                    range.selectNodeContents(element);
                    return range.getBoundingClientRect().height;
                };
                return {
                    content: height(document.querySelector('[role="textbox"] p')),
                    chrome: height(document.querySelector('[role="menu"] [role^="menuitem"] > span')),
                };
            });
            const clips = await clipped(page);
            await component.unmount();
            return { ...measured, clips };
        };
        let before;
        if (browserName === 'firefox') {
            // The 16 px run: a root font size that undoes the preference for rem-sized text.
            const sixteen = await page.addStyleTag({ content: 'html { font-size: 16px; }' });
            before = await heights();
            await sixteen.evaluate((element) => (element as Element).remove());
        } else {
            before = await heights();
            await page.addStyleTag({ content: 'html { font-size: 32px; }' });
        }
        const after = await heights();

        expect(after.content / before.content).toBeGreaterThan(1.8);
        expect(after.chrome / before.chrome).toBeGreaterThan(1.8);
        expect(after.clips).toEqual([]);
    });
}
