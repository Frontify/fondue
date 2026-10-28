/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorApi, type EditorRange, type SelectionHandle } from '#/bridge/pluginApi/plugin';
import {
    type CodecContext,
    type HrefPolicy,
    hrefPolicyOf,
    isPresentationStyle,
    type JsonObject,
    type PresentationStyle,
} from '#/model';

/** The command the popover runs. */
export const SET_LINK = 'link.set';

/** The link popover's strings, in the UI locale. */
export type LinkPopoverStrings = {
    title: string;
    destination: string;
    text: string;
    newWindow: string;
    style: string;
    noStyle: string;
    invalid: string;
    /** The schemes `allowedSchemes` lists, joined in the UI locale, which a link must start with. */
    schemesAllowed: (schemes: string) => string;
    /** The hosts `allowedHosts` lists, joined in the UI locale, which a link must go to. */
    hostsAllowed: (hosts: string) => string;
    /** Apply could not run for another reason, such as a read-only editor. */
    failed: string;
    removed: string;
    insertNew: string;
    results: string;
    /** What the live region says for the active destination, such as `Brand colors, 1 of 3`. */
    result: (label: string, position: number, total: number) => string;
    apply: string;
};

/** A presentation style the Style select offers. */
export type LinkStyleOption = {
    id: string;
    label: string;
};

/** What the popover opens with, read when its command ran. */
export type LinkInitial = {
    href: string;
    text: string;
    openInNewWindow: boolean;
    styleId: string;
    /** The field that takes focus: the text at a caret outside a link, else the destination. */
    focus: 'text' | 'destination';
    /** The whole link the popover edits, which it anchors to. */
    link: EditorRange | undefined;
};

const textOf = (value: unknown): string => (typeof value === 'string' ? value : '');

/** The options of the `links` feature: its URL policy and the resource types its popover searches. */
const linkOptions = (
    options: JsonObject | undefined,
): { policy: HrefPolicy | undefined; resourceTypes: readonly string[] } => {
    if (options === undefined) {
        return { policy: undefined, resourceTypes: [] };
    }

    const { resourceTypes } = options;
    let types: string[] = [];
    if (Array.isArray(resourceTypes)) {
        types = resourceTypes.filter((type): type is string => typeof type === 'string');
    }

    return { policy: hrefPolicyOf(options), resourceTypes: types };
};

/** The URL policy, and the destination search when the host has a reference service and `links` names resource types. */
export const searchOf = (api: EditorApi | undefined) => {
    const { policy, resourceTypes } = linkOptions(api?.optionsOf('links'));
    const service = api?.services.references();
    if (service === undefined || resourceTypes.length === 0) {
        return { policy, search: undefined };
    }

    return { policy, search: { service, resourceTypes } };
};

/** The link at the selection, or the selected text of one block for a new link. */
export const linkInitialOf = (api: EditorApi<'marks'>): LinkInitial => {
    const empty: LinkInitial = {
        href: '',
        text: '',
        openInNewWindow: false,
        styleId: '',
        focus: 'text',
        link: undefined,
    };
    const link = api.marks.run('link', { extendToMarkRange: 'touching' });
    if (link !== undefined) {
        return {
            href: textOf(link.attrs.href),
            text: link.text,
            openInNewWindow: link.attrs.openInNewWindow === true,
            styleId: textOf(link.attrs.styleId),
            focus: 'destination',
            link: link.range,
        };
    }

    if (api.selection().collapsed) {
        return empty;
    }

    return { ...empty, text: api.selectedText(), focus: 'destination' };
};

/**
 * The target Apply runs at: the whole link the popover edits, which maps through edits inside it and is invalid once
 * its text is removed, else the selection.
 */
export const captureLinkTarget = (
    api: EditorApi | undefined,
    link: LinkInitial['link'],
): SelectionHandle | undefined => {
    if (link === undefined) {
        return api?.targets.capture(undefined, { purpose: 'format', onIntersectingEdit: 'invalidate' });
    }

    return api?.targets.capture(link, { purpose: 'format', onIntersectingEdit: 'map' });
};

/** The link popover's strings, in the UI locale. */
export const linkPopoverStrings = (translate: CodecContext['translate']): LinkPopoverStrings => ({
    title: translate('RichTextEditor_link'),
    destination: translate('RichTextEditor_linkDestination'),
    text: translate('RichTextEditor_linkText'),
    newWindow: translate('RichTextEditor_linkOpenInNewWindow'),
    style: translate('RichTextEditor_linkStyle'),
    noStyle: translate('RichTextEditor_linkStyleNone'),
    invalid: translate('RichTextEditor_linkInvalid'),
    schemesAllowed: (schemes) => translate('RichTextEditor_linkSchemesAllowed', { schemes }),
    hostsAllowed: (hosts) => translate('RichTextEditor_linkHostsAllowed', { hosts }),
    failed: translate('RichTextEditor_linkFailed'),
    removed: translate('RichTextEditor_linkTextRemoved'),
    insertNew: translate('RichTextEditor_linkInsertNew'),
    results: translate('RichTextEditor_linkResults'),
    // The live region writes a value between U+2068 and U+2069 into a `bdi` of its own.
    result: (label, position, total) =>
        translate('RichTextEditor_suggestionOption', { label: `\u2068${label}\u2069`, position, total }),
    apply: translate('RichTextEditor_apply'),
});

/** The presentation styles the link popover offers: each that applies to links and is not deprecated. */
export const linkStylesOf = (styles: readonly PresentationStyle[]): readonly LinkStyleOption[] =>
    styles
        .filter((style) => isPresentationStyle(style) && style.deprecated !== true && style.appliesTo.includes('link'))
        .map(({ id, label }) => ({ id, label }));

/** An index moved past either end of a list of `length` items, wrapped around to the other end. */
export const wrapped = (index: number, length: number): number => ((index % length) + length) % length;

/** Why Apply did not link: a destination the check or the policy refuses, linked text removed meanwhile, or another refusal. */
export type Problem = 'invalid' | 'scheme' | 'host' | 'removed' | 'failed';
// The problems of the destination itself, which mark the field invalid.
export const FIELD_PROBLEMS: ReadonlySet<Problem | undefined> = new Set(['invalid', 'scheme', 'host']);

/** The policy's list in the UI locale, such as `https: or mailto:`. */
export const listed = (items: readonly string[], lang: string | undefined): string =>
    new Intl.ListFormat(lang, { type: 'disjunction' }).format(items);

/** The destination search a popover runs, when the host has a reference service and `links` names resource types. */
export type LinkSearch = NonNullable<ReturnType<typeof searchOf>['search']>;
