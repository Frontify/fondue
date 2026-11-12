/* (c) Copyright Frontify Ltd., all rights reserved. */

// Word and Outlook write a list as paragraphs with an `mso-list` style and the
// marker (a bullet glyph or a number) as text in a span, and end every
// paragraph with an `<o:p>` marker.

import { OFFICE_LIST_ATTRIBUTES, removeOfficeListData } from '#/core';

/** The name `mso-list` takes in a style attribute, so the engine's style merge keeps it. */
const KEPT_LIST_PROPERTY = '--mso-list';
/** The name `mso-list` takes in a `<style>` rule, apart from a paragraph's own so that one wins. */
const RULE_LIST_PROPERTY = '--mso-list-rule';
/** A paragraph's own list property, as Word writes it or as `keepOfficeListStyles` renamed it. */
const OWN_LIST_PROPERTY = `(?:mso-list|${KEPT_LIST_PROPERTY})`;
/** Word's list data, as in `l0 level2 lfo1`: list template, level and list instance. */
const LIST_DATA = String.raw`(l\d+)\s+level(\d+)(?:\s+(lfo\d+))?`;

/** A declaration of `property` in a style attribute whose value starts with `value`. */
const declaration = (property: string, value: string): RegExp =>
    new RegExp(String.raw`(?:^|;)\s*${property}:\s*${value}`, 'i');

const LIST_STYLE = declaration(OWN_LIST_PROPERTY, LIST_DATA);
/** A paragraph's own list property, which can also say `none`. */
const OWN_LIST_STYLE = declaration(OWN_LIST_PROPERTY, '');
const RULE_LIST_STYLE = declaration(RULE_LIST_PROPERTY, LIST_DATA);
/** The style of the span that holds a list paragraph's marker. */
const MARKER_STYLE = declaration(OWN_LIST_PROPERTY, 'ignore');

/** Word's list data in the HTML string, found without parsing it. */
const OFFICE_LIST_MARKUP = /mso-list/i;
// Stops at the next tag, so an unclosed one costs one scan, not one per start.
const TAG = /<[a-z][^<>]*>/gi;
const STYLE_ATTRIBUTE = /(\sstyle\s*=\s*)("[^"]*"|'[^']*')/gi;
// Split on, not matched around: a pattern holding a whole `<style>` body overflows the regexp stack past a few megabytes.
const STYLE_TAGS = /(<\/?style(?![\w-])[^<>]*>)/gi;
const MSO_LIST_PROPERTY = /(?<![\w-])mso-list(?=\s*:)/gi;

/** The marker Word ends each paragraph with. */
const PARAGRAPH_MARKER = 'o:p';
/** Elements only Word and Outlook write: their style classes and `mso-` properties. */
const OFFICE_STYLED = '[class*="Mso"], [style*="mso-"]';
/** Spans that may hold a list paragraph's marker, before their style is read. */
const LIST_SPAN = 'span[style*="mso-list"]';
/** The element Word writes a list item as. */
const LIST_PARAGRAPH = 'p';

/**
 * Keeps Word's list data past the engine, which merges the pasted `<style>`
 * rules into each element with the CSSOM and so drops every `mso-` property
 * the rules touch. A custom property survives that merge. The merge appends
 * each rule after the element's own style, so the rules get a name of their
 * own to keep a paragraph's own level and list. Only HTML that holds
 * `mso-list`, and only where CSS lives (style attributes and `<style>` bodies),
 * so text that mentions `mso-list` stays as written.
 */
export const keepOfficeListStyles = (html: string): string => {
    if (!OFFICE_LIST_MARKUP.test(html)) {
        return html;
    }
    const withAttributes = html.replaceAll(TAG, (tag) =>
        tag.replaceAll(
            STYLE_ATTRIBUTE,
            (_match, name: string, value: string) => name + value.replaceAll(MSO_LIST_PROPERTY, KEPT_LIST_PROPERTY),
        ),
    );
    // The split puts each style tag at an odd index; a body is the text between an opening tag and a closing one.
    const parts = withAttributes.split(STYLE_TAGS);
    for (let index = 2; index < parts.length - 1; index += 2) {
        const opening = parts[index - 1] ?? '';
        const closing = parts[index + 1] ?? '';
        if (!opening.startsWith('</') && closing.startsWith('</')) {
            parts[index] = (parts[index] ?? '').replaceAll(MSO_LIST_PROPERTY, RULE_LIST_PROPERTY);
        }
    }
    return parts.join('');
};

/** Whether the paste carries Word or Outlook markup, found without reading every element's style. */
const isOffice = (dom: HTMLElement): boolean =>
    dom.getElementsByTagName(PARAGRAPH_MARKER).length > 0 || dom.querySelector(OFFICE_STYLED) !== null;

/** Word's list data on a list paragraph, as written: the list's id, the level's digits and the marker's text. */
type ListData = { list: string; level: string; marker: string };

/** The elements of `dom` that hold text other than whitespace, each ancestor added once. */
const elementsWithText = (dom: HTMLElement): Set<Node> => {
    const holding = new Set<Node>();
    const walker = dom.ownerDocument.createTreeWalker(dom, NodeFilter.SHOW_TEXT);
    for (let text = walker.nextNode(); text !== null; text = walker.nextNode()) {
        if ((text.textContent ?? '').trim() === '') {
            continue;
        }
        for (let parent = text.parentNode; parent !== null && !holding.has(parent); parent = parent.parentNode) {
            holding.add(parent);
        }
    }
    return holding;
};

/**
 * The `<o:p>` marker ends a paragraph and usually holds at most a space. A blank
 * one goes; one with text stays, since the parse reads an unknown element's
 * content as it is, and moving a large subtree out costs its size per marker.
 */
const removeParagraphMarkers = (dom: HTMLElement): void => {
    // By tag name, since not every DOM parses the escaped `o\:p` selector.
    const markers = [...dom.getElementsByTagName(PARAGRAPH_MARKER)];
    if (markers.length === 0) {
        return;
    }
    // Read once for the whole paste: each marker reading its own text reads nested markers' text again.
    const holding = elementsWithText(dom);
    for (const marker of markers) {
        // A marker inside a blank one went with it.
        if (!holding.has(marker) && dom.contains(marker)) {
            marker.remove();
        }
    }
};

const markerSpans = (root: ParentNode): HTMLElement[] =>
    [...root.querySelectorAll<HTMLElement>(LIST_SPAN)].filter((span) =>
        MARKER_STYLE.test(span.getAttribute('style') ?? ''),
    );

/** The list data on `element`, or `undefined` when it is not a list paragraph. */
const readListData = (element: HTMLElement): ListData | undefined => {
    // Word never puts a paragraph inside another; only parser tricks do, and list data written there would nest lists without bound.
    if (element.parentElement?.closest(LIST_PARAGRAPH)) {
        return undefined;
    }
    const style = element.getAttribute('style') ?? '';
    let declared = RULE_LIST_STYLE.exec(style);
    if (OWN_LIST_STYLE.test(style)) {
        declared = LIST_STYLE.exec(style);
    }
    if (declared === null) {
        return undefined;
    }
    return {
        list: `${declared[1] ?? ''} ${declared[3] ?? ''}`.trim(),
        level: declared[2] ?? '',
        marker: markerSpans(element)[0]?.textContent ?? '',
    };
};

/** Keeps the list data of each list paragraph, for a list plugin's paste transform to read. */
const keepListData = (dom: HTMLElement): void => {
    for (const paragraph of dom.querySelectorAll(LIST_PARAGRAPH)) {
        const data = readListData(paragraph);
        if (data !== undefined) {
            paragraph.setAttribute(OFFICE_LIST_ATTRIBUTES.list, data.list);
            paragraph.setAttribute(OFFICE_LIST_ATTRIBUTES.level, data.level);
            paragraph.setAttribute(OFFICE_LIST_ATTRIBUTES.marker, data.marker);
        }
    }
};

/**
 * Removes any Office list data the paste carries, then, for Word and Outlook,
 * keeps the list data of their list paragraphs as attributes and removes what
 * they write besides content: the `<o:p>` markers and each list marker, also
 * the number a heading carries. Does nothing else to a paste from elsewhere.
 */
export const tidyOffice = (dom: HTMLElement): void => {
    // Only the editor writes the Office list data, so none the paste itself carries is read.
    removeOfficeListData(dom);
    if (!isOffice(dom)) {
        return;
    }
    removeParagraphMarkers(dom);
    keepListData(dom);
    for (const span of markerSpans(dom)) {
        span.remove();
    }
};
