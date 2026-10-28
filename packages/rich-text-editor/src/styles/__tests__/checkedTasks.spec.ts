/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const content = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../content.css'), 'utf8');

// jsdom's selector engine misreads `:where()` around a complex selector and `:has()` with a child combinator, so the
// test drops the one and marks what the other matches.
const HAS_CHECKED_CHROME = ':has(> [data-rte-chrome] > input:checked)';
const unwrapped = (selector: string) =>
    selector.replace(/^:where\(([\s\S]*)\)$/, '$1').replaceAll(HAS_CHECKED_CHROME, '[data-has-checked-chrome]');
const markCheckedChrome = (root: HTMLElement) => {
    for (const item of root.querySelectorAll('li')) {
        const chrome = [...item.children].find((child) => child.hasAttribute('data-rte-chrome'));
        if (chrome !== undefined && chrome.querySelector(':scope > input:checked') !== null) {
            item.setAttribute('data-has-checked-chrome', '');
        }
    }

    return root;
};

const selectorParts = (selector: string) => {
    const parts: string[] = [];
    for (const part of selector.split(/,(?![^()]*\))/)) {
        const normalized = unwrapped(part.trim().replaceAll(/\s+/g, ' '));
        if (normalized !== '') {
            parts.push(normalized);
        }
    }

    return parts;
};

const declarationsOf = (body: string) => {
    const declarations: string[] = [];
    for (const part of body.split(';')) {
        const declaration = part.trim().replaceAll(/\s+/g, ' ');
        if (declaration !== '') {
            declarations.push(declaration);
        }
    }

    return declarations;
};

/** The rules of the struck checked-task look: each selector of the list on its own, with its declarations. */
const struckRules = () => {
    const found: { selectors: string[]; declarations: string[] }[] = [];
    const source = content.replaceAll(/\/\*[\s\S]*?\*\//g, '');
    for (const match of source.matchAll(/([^{};]+)\{([^{}]*)\}/g)) {
        const selectors = selectorParts(match[1] ?? '');
        if (!selectors.some((selector) => selector.includes('data-rte-strike-checked-tasks'))) {
            continue;
        }

        found.push({ selectors, declarations: declarationsOf(match[2] ?? '') });
    }

    return found;
};

/** The editor's DOM of a checked task of two blocks with an unchecked nested task: chrome around the checkbox and the content. */
const editorTree = () => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="fondue-rte-content" data-rte-strike-checked-tasks="">
            <ul data-task-list="">
                <li data-test="done">
                    <div data-rte-chrome="">
                        <input type="checkbox" checked>
                        <div data-rte-content="">
                            <div>
                                <p data-test="done-text">Done <span data-test="done-run" style="color: #ff0000">red</span></p>
                                <p data-test="also-text">Also</p>
                                <ul data-task-list="" data-test="nested">
                                    <li>
                                        <div data-rte-chrome="">
                                            <input type="checkbox">
                                            <div data-rte-content=""><div><p data-test="open-text">Open</p></div></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>`;

    return markCheckedChrome(root);
};

/** The reader's DOM of the same tasks. */
const readerTree = () => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="fondue-rte-content" data-rte-strike-checked-tasks="">
            <ul data-task-list="">
                <li data-checked="true">
                    <input type="checkbox" disabled checked>
                    <div data-test="done-text"><p>Done <a data-test="done-run" href="https://frontify.com">link</a></p></div>
                    <p data-test="also-text">Also</p>
                    <ul data-task-list="" data-test="nested">
                        <li data-checked="false">
                            <input type="checkbox" disabled>
                            <div><p data-test="open-text">Open</p></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>`;

    return root;
};

/** The `data-test` names of the elements, or of their nearest named ancestor, that a rule with `declaration` matches. */
const styled = (root: HTMLElement, declaration: (text: string) => boolean) => {
    const selectors = struckRules()
        .filter(({ declarations }) => declarations.some(declaration))
        .flatMap(({ selectors: list }) => list);
    const matched = new Set<string>();
    for (const element of root.querySelectorAll('*')) {
        if (selectors.some((selector) => element.matches(selector))) {
            const named = element.closest('[data-test]')?.getAttribute('data-test');
            matched.add(named ?? element.tagName);
        }
    }

    return [...matched].sort();
};

describe('the struck checked-task look', () => {
    it.each([
        ['editor', editorTree],
        ['reader', readerTree],
    ])('strikes and greys every own block of the checked item in the %s, never its nested tasks', (_, tree) => {
        const root = tree();

        expect(styled(root, (text) => text.startsWith('text-decoration-line'))).toEqual(['also-text', 'done-text']);
        expect(styled(root, (text) => text.startsWith('color'))).toEqual(['also-text', 'done-run', 'done-text']);
    });

    it('gives the secondary text colour priority over a run own colour, through the variable a host overrides', () => {
        const colors = struckRules().flatMap(({ declarations }) =>
            declarations.filter((declaration) => declaration.startsWith('color')),
        );

        expect(colors).toEqual(['color: var(--rte-content-secondary-text-color) !important']);
    });
});
