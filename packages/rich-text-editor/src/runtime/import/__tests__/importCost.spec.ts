/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { JSDOM } from 'jsdom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { core } from '#/features/core/feature';
import { bulletList } from '#/features/listsBullet/feature';
import { listItem } from '#/features/listsItem/feature';
import { orderedList } from '#/features/listsOrdered/feature';
import { taskList } from '#/features/listsTask/feature';
import { compileContentModel } from '#/model';
import { exceedsMarkupDepth } from '#/runtime/import/limits';

import { fromHTML } from '../fromHtml';

const { window } = new JSDOM('');
const dom = window as unknown as Window;
const listModel = compileContentModel([core(), listItem(), bulletList(), orderedList(), taskList()], {
    id: 'test.import-cost',
    version: 1,
});

type Proto = { querySelector: Element['querySelector']; querySelectorAll: Element['querySelectorAll'] };
const proto = window.Element.prototype as unknown as Proto;
const original = { one: proto.querySelector, all: proto.querySelectorAll };

/** The elements below each receiver of a subtree query that `matches` accepts, summed: the nodes those scans cover. */
const scanned = (matches: (element: Element) => boolean, run: () => void) => {
    let total = 0;
    const count = (receiver: Element) => {
        if (matches(receiver)) {
            total += original.all.call(receiver, '*').length;
        }
    };

    vi.spyOn(proto, 'querySelector').mockImplementation(function (this: Element, selector: string) {
        count(this);

        return original.one.call(this, selector);
    });
    vi.spyOn(proto, 'querySelectorAll').mockImplementation(function (this: Element, selector: string) {
        count(this);

        return original.all.call(this, selector);
    });
    run();

    return total;
};

const textOf = (html: string, model = listModel) => {
    const result = fromHTML(html, model, { window: dom });

    return JSON.stringify(result.status === 'editable' ? result.document.content : result.status);
};

afterEach(() => {
    vi.restoreAllMocks();
});

describe('the cost of the HTML import grows linearly with the markup', () => {
    it('reads the subtree of a nested svg once', () => {
        const markup = (size: number) => `<p>a</p>${'<svg><g></g>'.repeat(size)}${'</svg>'.repeat(size)}`;
        const cost = (size: number) =>
            scanned(
                (element) => element.localName === 'svg',
                () => textOf(markup(size)),
            );

        const [small, large] = [cost(100), cost(200)];

        expect(large).toBeLessThanOrEqual(small * 2.5);
    });

    it('reads the spans of nested Word list items once, and keeps each item its own marker', () => {
        const markup = (size: number) =>
            '<ul><li style="mso-list:l0 level1 lfo1"><span style="mso-list:Ignore">&bull;</span>A' +
            '<ul><li style="mso-list:l0 level2 lfo1"><span style="mso-list:Ignore">1.</span>B' +
            `${'<ul><li style="mso-list:l0 level3 lfo1">C'.repeat(size)}${'<span>x</span>'.repeat(size * 4)}` +
            `${'</li></ul>'.repeat(size)}</li></ul></li></ul>`;
        const cost = (size: number) =>
            scanned(
                (element) => element.localName === 'li',
                () => textOf(markup(size)),
            );

        const [small, large] = [cost(30), cost(60)];

        expect(large).toBeLessThanOrEqual(small * 2.5);
        vi.restoreAllMocks();
        const nested = textOf(
            '<ul><li style="mso-list:l0 level1 lfo1"><span style="mso-list:Ignore">&bull;</span>A' +
                '<ul><li style="mso-list:l0 level2 lfo1"><span style="mso-list:Ignore">1.</span>B</li></ul></li></ul>',
        );
        expect(nested).toContain('"type":"bullet_list"');
        expect(nested).toContain('"type":"ordered_list"');
    });

    it('looks for the checkbox of a task item among its own children only', () => {
        const markup = (size: number) =>
            `${'<ul class="contains-task-list"><li class="task-list-item"><b>x</b>'.repeat(size)}${'</li></ul>'.repeat(size)}`;
        const cost = (size: number) =>
            scanned(
                (element) => element.localName === 'li',
                () => textOf(markup(size)),
            );

        const [small, large] = [cost(100), cost(200)];

        expect(large).toBeLessThanOrEqual(small * 2.5);
    });
});

describe('markup nested past what a browser parser reads', () => {
    // jsdom builds the tree in time that grows with the square of the nesting: 10,000 `div` take seconds, 50,000 minutes.
    const nested = (depth: number, open = '<div>', close = '</div>') => `${open.repeat(depth)}x${close.repeat(depth)}`;

    it('blocks 5,000 nested elements as past maxDepth before the DOM parses them', () => {
        const parse = vi.spyOn(window.DOMParser.prototype, 'parseFromString');

        const result = fromHTML(nested(5000), listModel, { window: dom });

        expect(result).toMatchObject({ status: 'blocked', reason: 'limit-exceeded' });
        expect(parse).not.toHaveBeenCalled();
    });

    it('reads 512 nested elements and blocks 513', () => {
        expect(fromHTML(nested(512), listModel, { window: dom }).status).toBe('editable');
        expect(fromHTML(nested(513), listModel, { window: dom }).status).toBe('blocked');
    });

    it('counts a self-closing element of HTML as open, since the parser ignores the slash', () => {
        expect(fromHTML(`${'<div/>'.repeat(600)}x`, listModel, { window: dom }).status).toBe('blocked');
    });

    it('counts no void element, no self-closing SVG element and no end tag that opened nothing', () => {
        const html = `${'<br>'.repeat(600)}<svg>${'<path d="M0 0"/>'.repeat(600)}</svg>${'</div>'.repeat(600)}x`;

        expect(fromHTML(html, listModel, { window: dom }).status).toBe('editable');
    });

    it.each(['<a', '<a ', '</', '< ', '<a><', '<a title=">'])(
        'counts the tags of a million characters of %j in one pass',
        (piece) => {
            const markup = piece.repeat(Math.floor(1_000_000 / piece.length));
            const started = performance.now();

            exceedsMarkupDepth(markup);

            expect(performance.now() - started).toBeLessThan(1000);
        },
    );

    it('reads a tag whose attribute holds a greater-than sign as one tag', () => {
        const html = `${'<div title="a>b">'.repeat(600)}x`;

        expect(fromHTML(html, listModel, { window: dom }).status).toBe('blocked');
    });
});

describe('a class attribute with tens of thousands of tokens', () => {
    // jsdom parses a class attribute again on each class query, in time that grows with the square of its tokens: 80,000 take seconds.
    it('is cut to maxAttributeLength before any class query reads it', () => {
        const classes = Array.from({ length: 20_000 }, (_, index) => `c${index}`).join(' ');
        const original = window.Element.prototype.getElementsByClassName;
        const longest: number[] = [];
        vi.spyOn(window.Element.prototype, 'getElementsByClassName').mockImplementation(function (
            this: Element,
            names: string,
        ) {
            for (const element of Array.from(this.querySelectorAll('[class]'))) {
                longest.push((element.getAttribute('class') ?? '').length);
            }

            return original.call(this, names);
        });

        const result = fromHTML(`<p class="${classes}">kept</p>`, listModel, { window: dom });

        expect(Math.max(...longest)).toBeLessThanOrEqual(8192);
        expect(textOf(`<p class="${classes}">kept</p>`)).toContain('"text":"kept"');
        expect(result.status).toBe('editable');
    });
});

describe('the paste policy of a feature that holds the items of a list', () => {
    it('keeps no paragraph directly inside a list whose items it refuses', () => {
        const definition = {
            authoring: { features: { 'lists.item': { paste: false } }, creatableHeadingLevels: [] },
            limits: undefined,
        };

        const result = fromHTML('<ul><li>a</li></ul>', listModel, {
            window: dom,
            definition: definition as never,
        });

        expect(result.status).toBe('editable');
        if (result.status !== 'editable') {
            return;
        }

        expect(JSON.stringify(result.document.content)).not.toContain('"type":"bullet_list"');
        expect(JSON.stringify(result.document.content)).toContain('"text":"a"');
    });
});
