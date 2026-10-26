/* (c) Copyright Frontify Ltd., all rights reserved. */

import fc from 'fast-check';
import { JSDOM } from 'jsdom';

import { checkHref, type ContentModel } from '#/model';
import { type JsonNode } from '#/model/__tests__/helpers/documents';
import { attributesOf, compiledModel, markHrefPolicy } from '#/model/internal';
import { type PastePolicy, refusedNames } from '#/runtime/import/policy';

const CONTENT_TAGS =
    'p span b strong i em u s del code pre a h1 h2 h3 h4 h5 h6 ul ol li blockquote br hr sub sup'.split(' ');
const OTHER_TAGS = [
    ...'div strike img table tr td th font mark script style iframe object embed svg math template noscript form'.split(
        ' ',
    ),
    ...'input button textarea select link meta base video audio source title body html head'.split(' '),
];
const ATTRIBUTES = [
    ...'onclick onerror onload onmouseover onfocus style href src srcset srcdoc action formaction xlink:href target'.split(
        ' ',
    ),
    ...'class id lang dir start colspan rowspan scope aria-checked type checked data-rte-style data-rte-color color'.split(
        ' ',
    ),
    ...'background width height alt name data-pm-slice'.split(' '),
];
const VALUES = [
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    ' javascript:alert(1)',
    'java\tscript:alert(1)',
    'java&#x09;script:alert(1)',
    '&#106;avascript:alert(1)',
    '&#x6A;avascript:alert(1)',
    'vbscript:msgbox(1)',
    'data:text/html,<script>alert(1)</script>',
    'https://frontify.com/a?b=1#c',
    '//evil.example/x',
    'mailto:team@frontify.com',
    'color: red; background: url(javascript:alert(1))',
    'width: expression(alert(1))',
    'text-align: justify',
    'font-weight: bold; font-style: italic',
    'vertical-align: super',
    'color: rgb(192, 57, 43)',
    'list-style-type: upper-roman',
    '_blank',
    'true',
    'false',
    'checkbox',
    'rtl',
    'de-CH',
    '3',
    '-1',
    '99999',
    '"><script>alert(1)</script>',
];
const RAW = [
    '<!-- x -->',
    '<![CDATA[x]]>',
    '<script>alert(1)</script>',
    '</p>',
    '<img src=x onerror=alert(1)>',
    '<svg><script>alert(1)</script></svg>',
    '<a href=javascript:alert(1)>x</a>',
    '<math><mi xlink:href="javascript:alert(1)">x</mi></math>',
    '<p style="mso-list:l0 level1 lfo1" class="MsoListParagraph">o</p>',
    '<b style="font-weight:normal" id="docs-internal-guid-1">g</b>',
    '<input type="checkbox" checked>',
];
const textArb = fc.string({
    unit: fc.constantFrom(
        'a',
        'Z',
        ' ',
        '  ',
        '\u00A0',
        '&amp;',
        '&lt;script&gt;',
        '&nbsp;',
        '&#0;',
        '&#xD800;',
        '&quot;',
        '&',
        '😀',
        '\n',
        '\t',
        '<',
    ),
    maxLength: 6,
});
const attributeArb = fc.tuple(
    fc.constantFrom(...ATTRIBUTES),
    fc.oneof({ weight: 3, arbitrary: fc.constantFrom(...VALUES) }, { weight: 1, arbitrary: textArb }),
);
const URLS = [
    'https://frontify.com/a?b=1#c',
    'http://example.com/x',
    '/brand/guidelines',
    '#section-2',
    'mailto:team@frontify.com',
    ...VALUES.slice(0, 9),
];
const escapeAttribute = (value: string) => value.replaceAll('"', '&quot;');
export const { html: htmlArb } = fc.letrec<{ html: string }>((tie) => ({
    html: fc.oneof(
        { depthSize: 'small', withCrossShrink: true },
        textArb,
        fc.constantFrom(...RAW),
        fc
            .tuple(fc.constantFrom(...URLS), fc.boolean(), fc.array(tie('html'), { maxLength: 2 }))
            .map(([href, blank, children]) => {
                let target = '';
                if (blank) {
                    target = ' target="_blank"';
                }

                return `<a href="${escapeAttribute(href)}"${target}>${children.join('')}</a>`;
            }),
        fc
            .tuple(
                fc.oneof(
                    { weight: 4, arbitrary: fc.constantFrom(...CONTENT_TAGS) },
                    { weight: 1, arbitrary: fc.constantFrom(...OTHER_TAGS) },
                ),
                fc.array(attributeArb, { maxLength: 3 }),
                fc.array(tie('html'), { maxLength: 4 }),
            )
            .map(([tag, attributes, children]) => {
                const written = attributes.map(([name, value]) => ` ${name}="${escapeAttribute(value)}"`).join('');

                return `<${tag}${written}>${children.join('')}</${tag}>`;
            }),
    ),
}));

const UNSAFE_SCHEME = /^[\s\u0000-\u001F]*(?:j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t|vbscript|data)\s*:/i;

/** The document problems a safe import never has: unsafe URLs, event handler or style attributes, unsafe scheme strings. */
export const unsafeParts = (model: ContentModel, content: unknown): string[] => {
    const { nodes, marks } = compiledModel(model);
    const declared = new Map<string, Readonly<Record<string, { type: string }>>>();
    for (const node of nodes) {
        declared.set(node.name, attributesOf(node));
    }

    for (const mark of marks) {
        declared.set(mark.name, mark.declaration.attrs);
    }

    const policy = markHrefPolicy(model, 'link');
    const found: string[] = [];
    const check = (member: JsonNode, path: string) => {
        const declarations = declared.get(member.type as string) ?? {};
        for (const [name, value] of Object.entries((member.attrs ?? {}) as JsonNode)) {
            if (/^on/i.test(name) || name === 'style' || name === 'srcdoc' || declarations[name] === undefined) {
                found.push(`${path}/attrs/${name}`);
            }

            if (typeof value === 'string' && UNSAFE_SCHEME.test(value)) {
                found.push(`${path}/attrs/${name}`);
            }

            if (declarations[name]?.type === 'url' && (typeof value !== 'string' || !checkHref(value, policy).ok)) {
                found.push(`${path}/attrs/${name}`);
            }
        }
    };

    const visit = (node: JsonNode, path: string) => {
        check(node, path);
        for (const [index, mark] of ((node.marks ?? []) as JsonNode[]).entries()) {
            check(mark, `${path}/marks/${index}`);
        }

        for (const [index, child] of ((node.content ?? []) as JsonNode[]).entries()) {
            visit(child, `${path}/content/${index}`);
        }
    };

    visit(content as JsonNode, '');

    return found;
};

const SCRIPT_CAPABLE = /^(script|style|iframe|object|embed|form|input|button|base|meta|link|svg|math|template)$/i;

/** Event handlers, script-capable elements and unsafe URLs in the HTML that `toHTML` writes. */
export const unsafeHtml = (html: string): string[] => {
    const { document } = new JSDOM(`<body>${html}</body>`).window;
    const found: string[] = [];
    for (const element of Array.from(document.body.querySelectorAll('*'))) {
        // A task item's disabled checkbox is the one input the codecs write.
        const checkbox = element.localName === 'input' && element.getAttribute('type') === 'checkbox';
        if (SCRIPT_CAPABLE.test(element.localName) && !checkbox) {
            found.push(element.localName);
        }

        for (const { name, value } of Array.from(element.attributes)) {
            if (/^on/i.test(name) || /srcdoc$/i.test(name)) {
                found.push(`${element.localName}[${name}]`);
            }

            if (/^(href|src|xlink:href|action|formaction)$/i.test(name) && !checkHref(value).ok) {
                found.push(`${element.localName}[${name}]`);
            }
        }
    }

    return found;
};

/** The nodes and marks of features whose policy refuses paste, and headings at levels the definition cannot create. */
export const policyFaults = (
    model: ContentModel,
    authoring: { features: PastePolicy; creatableHeadingLevels: readonly number[] },
    content: unknown,
): string[] => {
    const refused = refusedNames(model, authoring.features);
    const found: string[] = [];
    const visit = (node: JsonNode, path: string) => {
        if (refused.nodes.has(node.type as string)) {
            found.push(`${path} ${node.type as string}`);
        }

        for (const mark of (node.marks ?? []) as JsonNode[]) {
            if (refused.marks.has(mark.type as string)) {
                found.push(`${path} ${mark.type as string}`);
            }
        }

        if (
            node.type === 'heading' &&
            !authoring.creatableHeadingLevels.includes((node.attrs as JsonNode).level as number)
        ) {
            found.push(`${path} heading`);
        }

        for (const [index, child] of ((node.content ?? []) as JsonNode[]).entries()) {
            visit(child, `${path}/content/${index}`);
        }
    };

    visit(content as JsonNode, '');

    return found;
};
