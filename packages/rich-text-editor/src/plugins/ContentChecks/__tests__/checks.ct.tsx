/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { ChecksProbe } from './fixtures/ChecksProbe';

type ChecksRte = NonNullable<Window['checksRte']>;

const ready = async (page: Page) => {
    await expect(page.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.checksRte !== undefined)).toBe(true);
};

const panelOf = (page: Page) => page.getByRole('region', { name: 'Accessibility checks' });

const issueOf = (page: Page, id: string) => panelOf(page).locator(`li[data-rte-issue-id="${id}"]`);

test('selects the issue node, scrolls it into view and focuses the surface on Go to, keeping the panel open', async ({
    mount,
    page,
}) => {
    await mount(<ChecksProbe />);
    await ready(page);
    const frame = page.getByTestId('frame');
    await page.getByRole('button', { name: 'Accessibility checks' }).click();
    await expect(panelOf(page).getByRole('heading', { level: 2 })).toBeFocused();
    const before = await page.evaluate(() => (window.checksRte as ChecksRte).document());
    const heading = page.getByRole('textbox', { name: 'Notes' }).locator('h2');
    const frameBox = await frame.boundingBox();
    const hidden = await heading.boundingBox();
    expect(frameBox).not.toBeNull();
    expect(hidden).not.toBeNull();
    expect(hidden!.y).toBeGreaterThanOrEqual(frameBox!.y + frameBox!.height);

    await issueOf(page, 'heading.empty:empty').getByRole('button', { name: 'Go to' }).click();

    await expect(page.getByRole('textbox', { name: 'Notes' })).toBeFocused();
    await expect(panelOf(page)).toBeVisible();
    const range = await page.evaluate(() => (window.checksRte as ChecksRte).headingRange());
    await expect
        .poll(() => page.evaluate(() => (window.checksRte as ChecksRte).selection()))
        .toEqual({ empty: true, from: range.from, to: range.to, nodeId: 'empty', type: 'heading' });
    const shown = await heading.boundingBox();
    const nextFrame = await frame.boundingBox();
    expect(shown!.y + shown!.height).toBeGreaterThan(nextFrame!.y);
    expect(shown!.y).toBeLessThan(nextFrame!.y + nextFrame!.height);
    expect(await page.evaluate(() => (window.checksRte as ChecksRte).document())).toBe(before);

    await issueOf(page, 'link.text-vague:0,1').getByRole('button', { name: 'Go to' }).click();

    await expect(page.getByRole('textbox', { name: 'Notes' })).toBeFocused();
    await expect
        .poll(() => page.evaluate(() => (window.checksRte as ChecksRte).selection()))
        .toMatchObject({ empty: false, from: 6, to: 10, type: 'paragraph' });
    await expect(panelOf(page)).toBeVisible();
});

test('keeps the heading in the frame on Go to when the surface holds a stale DOM selection and focus is outside it', async ({
    mount,
    page,
}) => {
    await mount(<ChecksProbe />);
    await ready(page);
    const frame = page.getByTestId('frame');
    const surface = page.getByRole('textbox', { name: 'Notes' });
    await page.getByRole('button', { name: 'Accessibility checks' }).click();
    await expect(panelOf(page).getByRole('heading', { level: 2 })).toBeFocused();
    await surface.evaluate((element) => {
        const text = element.querySelector('p')?.firstChild;
        const selection = element.ownerDocument.defaultView?.getSelection();
        if (text === null || text === undefined || selection === null || selection === undefined) {
            throw new Error('The first paragraph has no text to select.');
        }

        selection.setBaseAndExtent(text, 1, text, 3);
        (element.ownerDocument.activeElement as HTMLElement | null)?.blur();
    });
    await expect(surface).not.toBeFocused();

    await issueOf(page, 'heading.empty:empty').getByRole('button', { name: 'Go to' }).click();

    await expect(surface).toBeFocused();
    const heading = surface.locator('h2');
    await expect
        .poll(async () => {
            const box = await heading.boundingBox();
            const frameBox = await frame.boundingBox();

            return (
                box !== null &&
                frameBox !== null &&
                box.y < frameBox.y + frameBox.height &&
                box.y + box.height > frameBox.y
            );
        })
        .toBe(true);
});

for (const forcedColors of ['none', 'active'] as const) {
    test(`marks the issues in the surface with an outline and an icon while the panel is open, forced colours ${forcedColors}`, async ({
        mount,
        page,
    }, testInfo) => {
        await page.emulateMedia({ forcedColors });
        await mount(<ChecksProbe />);
        await ready(page);
        const surface = page.getByRole('textbox', { name: 'Notes' });
        await expect(surface.locator('[data-rte-issue]')).toHaveCount(0);

        await page.getByRole('button', { name: 'Accessibility checks' }).click();

        const link = surface.locator('[data-rte-issue="warning"]');
        await expect(link).toHaveText('here');
        const marked = await link.evaluate((element) => {
            const style = getComputedStyle(element);

            return { style: style.outlineStyle, width: Number.parseFloat(style.outlineWidth) };
        });
        expect(marked).toEqual({ style: 'solid', width: 2 });
        const icon = surface.locator('[data-rte-issue-icon="warning"] svg');
        await expect(icon).toBeVisible();
        const iconBox = await icon.boundingBox();
        expect(iconBox!.width).toBeGreaterThan(8);
        await testInfo.attach(`issue decorations, forced colours ${forcedColors}`, {
            body: await surface.locator('p').first().screenshot(),
            contentType: 'image/png',
        });

        await page.keyboard.press('Escape');

        await expect(panelOf(page)).toHaveCount(0);
        await expect(surface.locator('[data-rte-issue]')).toHaveCount(0);
        await expect(surface.locator('[data-rte-issue-icon]')).toHaveCount(0);
    });
}

test('shows each issue severity by the shape of its icon, which a grayscale screenshot still tells apart', async ({
    mount,
    page,
}, testInfo) => {
    await mount(<ChecksProbe />);
    await ready(page);
    await page.addStyleTag({ content: 'html { filter: grayscale(1); }' });
    await page.getByRole('button', { name: 'Accessibility checks' }).click();
    const surface = page.getByRole('textbox', { name: 'Notes' });
    await expect(surface.locator('[data-rte-issue-icon] svg').first()).toBeVisible();
    const severities = [
        ...new Set(
            await surface
                .locator('[data-rte-issue-icon]')
                .evaluateAll((icons) => icons.map((icon) => icon.getAttribute('data-rte-issue-icon') ?? '')),
        ),
    ];

    const shapes = new Set<string>();
    const shots: Buffer[] = [];
    for (const severity of severities) {
        const icon = surface.locator(`[data-rte-issue-icon="${severity}"]`).first();
        shapes.add(await icon.locator('svg').innerHTML());
        const shot = await icon.screenshot();
        shots.push(shot);
        await testInfo.attach(`${severity} issue mark in grayscale`, { body: shot, contentType: 'image/png' });
    }

    expect(severities.length).toBeGreaterThan(1);
    expect(shapes.size).toBe(severities.length);
    for (const [index, shot] of shots.entries()) {
        expect(shots.slice(index + 1).some((other) => other.equals(shot))).toBe(false);
    }
});

test('opens on its summary heading, lets Tab move through its controls and out, and returns focus to the surface on Escape', async ({
    mount,
    page,
    browserName,
}) => {
    await mount(<ChecksProbe />);
    await ready(page);
    const surface = page.getByRole('textbox', { name: 'Notes' });

    await page.getByRole('button', { name: 'Accessibility checks' }).click();
    await expect(panelOf(page).getByRole('heading', { level: 2 })).toBeFocused();
    const controls = await panelOf(page).locator('button:visible').count();
    const focusInPanel = () => panelOf(page).evaluate((panel) => panel.contains(panel.ownerDocument.activeElement));
    // Safari's Tab skips buttons, which Option+Tab reaches.
    let tab = 'Tab';
    if (browserName === 'webkit') {
        tab = 'Alt+Tab';
    }

    let presses = 0;
    let inside = true;
    while (inside && presses <= controls) {
        await page.keyboard.press(tab);
        presses += 1;
        inside = await focusInPanel();
    }

    expect(inside).toBe(false);
    expect(presses).toBeGreaterThan(1);
    await expect(surface).toBeFocused();

    await panelOf(page).getByRole('heading', { level: 2 }).focus();
    await page.keyboard.press('Escape');

    await expect(panelOf(page)).toHaveCount(0);
    await expect(surface).toBeFocused();
});

test('expands the help of an issue with Enter and Space on its Accordion trigger, and shows the severity as a Badge', async ({
    mount,
    page,
}) => {
    await mount(<ChecksProbe />);
    await ready(page);
    await page.getByRole('button', { name: 'Accessibility checks' }).click();
    const issue = issueOf(page, 'link.text-vague:0,1');
    const trigger = issue.getByRole('button', { name: 'How to decide' });
    await expect(issue.locator('[data-component="badge"]')).toHaveText('Warning');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toHaveAttribute('aria-describedby', /\S+ \S+/);

    await trigger.focus();
    await page.keyboard.press('Enter');

    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(issue.getByText('Read the link text alone')).toBeVisible();

    await page.keyboard.press('Space');

    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('prints neither the issues panel nor the issue marks', async ({ mount, page }) => {
    await mount(<ChecksProbe />);
    await ready(page);
    await page.getByRole('button', { name: 'Accessibility checks' }).click();
    const surface = page.getByRole('textbox', { name: 'Notes' });
    await expect(surface.locator('[data-rte-issue-icon]').first()).toBeVisible();

    await page.emulateMedia({ media: 'print' });

    await expect(panelOf(page)).toBeHidden();
    await expect(surface.locator('[data-rte-issue-icon]').first()).toBeHidden();
    const outline = await surface
        .locator('[data-rte-issue]')
        .first()
        .evaluate((element) => getComputedStyle(element).outlineStyle);
    expect(outline).toBe('none');
    await expect(surface.getByText('Read')).toBeVisible();
});

test('moves focus to the summary heading when the issue whose Fix had focus leaves the list at the next check', async ({
    mount,
    page,
}) => {
    await mount(<ChecksProbe />);
    await ready(page);
    await page.getByRole('button', { name: 'Accessibility checks' }).click();
    const fix = issueOf(page, 'heading.empty:empty').getByRole('button', { name: 'Fix' });

    await fix.focus();
    await page.keyboard.press('Enter');

    await expect(issueOf(page, 'heading.empty:empty')).toHaveCount(0);
    await expect(panelOf(page).getByRole('heading', { level: 2 })).toBeFocused();
});

test('moves focus to the summary heading when the issue whose Dismiss had focus leaves the list', async ({
    mount,
    page,
}) => {
    await mount(<ChecksProbe />);
    await ready(page);
    await page.getByRole('button', { name: 'Accessibility checks' }).click();
    const dismiss = issueOf(page, 'link.text-vague:0,1').getByRole('button', { name: 'Dismiss' });

    await dismiss.focus();
    await page.keyboard.press('Enter');

    await expect(issueOf(page, 'link.text-vague:0,1')).toHaveCount(0);
    await expect(panelOf(page).getByRole('heading', { level: 2 })).toBeFocused();
});

test('returns focus to Fix after the language dialog it opened applies or removes a language', async ({
    mount,
    page,
}) => {
    await mount(<ChecksProbe />);
    await ready(page);
    await page.evaluate(() => (window.checksRte as ChecksRte).select(1, 5));
    await page.getByRole('button', { name: 'Accessibility checks' }).click();
    const fix = issueOf(page, 'language.parts-review').getByRole('button', { name: 'Fix' });

    await fix.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Language' });
    await dialog.getByRole('textbox', { name: 'Language tag' }).fill('fr');
    await dialog.getByRole('button', { name: 'Apply' }).click();

    await expect(dialog).toHaveCount(0);
    await expect(fix).toBeFocused();

    await page.keyboard.press('Enter');
    await page.getByRole('dialog', { name: 'Language' }).getByRole('button', { name: 'Remove language' }).click();

    await expect(page.getByRole('dialog', { name: 'Language' })).toHaveCount(0);
    await expect(fix).toBeFocused();
});
