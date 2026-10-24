/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorApi, type MarkRunValue, sameRange } from '#/bridge/plugin';
import { checkHref, type CodecContext } from '#/model';

/** The commands the bubble runs. */
export const EDIT_LINK = 'link.edit';
export const REMOVE_LINK = 'link.remove';

/** The link bubble's strings, in the UI locale. */
export interface LinkBubbleStrings {
    readonly label: string;
    readonly open: string;
    readonly edit: string;
    readonly copy: string;
    readonly remove: string;
    readonly copied: string;
}

/** The link bubble's strings, in the UI locale. */
export const linkBubbleStrings = (t: CodecContext['t']): LinkBubbleStrings => ({
    label: t('RichTextEditor_link'),
    open: t('RichTextEditor_linkOpenInNewTab'),
    edit: t('RichTextEditor_linkEdit'),
    copy: t('RichTextEditor_linkCopy'),
    remove: t('RichTextEditor_linkRemove'),
    copied: t('RichTextEditor_linkCopied'),
});

/** The link at a caret in an editable surface, at either edge of it or inside it; none for a range or a read-only surface. */
export const caretLink = (api: EditorApi | undefined): MarkRunValue | undefined => {
    if (api === undefined || !api.editable() || !api.selection().collapsed) {
        return undefined;
    }
    return api.marks.run('link', { extendToMarkRange: 'touching' });
};

export const sameLink = (a: MarkRunValue | undefined, b: MarkRunValue | undefined) =>
    a === b ||
    (a !== undefined &&
        b !== undefined &&
        sameRange(a.range, b.range) &&
        JSON.stringify(a.attrs) === JSON.stringify(b.attrs));

// Only a caret at a link is read, so typing elsewhere never renders the bubble.
export const caretOf = (api: EditorApi | undefined) => {
    if (caretLink(api) === undefined) {
        return undefined;
    }
    return api?.selectedRange();
};

/** Moves focus back to the surface unless the author moved it elsewhere meanwhile, as a toolbar press does. */
export const returnFocus = (api: EditorApi, within: Element | null) => {
    const { activeElement, body } = document;
    if (activeElement === body || (within !== null && within.contains(activeElement))) {
        api.focus();
    }
};

/** Opens a checked `href` in a new tab that cannot reach this page. */
export const openLink = (owner: Window | null, href: unknown): void => {
    const checked = typeof href === 'string' ? checkHref(href) : undefined;
    if (owner !== null && checked !== undefined && checked.ok) {
        owner.open(checked.href, '_blank', 'noopener,noreferrer');
    }
};
