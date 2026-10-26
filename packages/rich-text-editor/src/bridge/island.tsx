/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import { type ContentNodeJSON } from '#/model';
import { ISLAND_BLOCK, ISLAND_INLINE, islandText, islandLabel } from '#/model/internal';

import { NodeChromeButton, NodeChromeToolbar, useRichTextNodeView } from './define';
import styles from './island.module.scss';
import { useEditorApi, useEditorValue } from './plugin';

/** The stored nodes that replace an island with its text: a paragraph per line for a block, else one run of text with spaces for line breaks. */
export const islandReplacement = (inline: boolean, original: unknown): readonly ContentNodeJSON[] => {
    const text = islandText(original);
    if (inline) {
        if (text === '') {
            return [];
        }

        return [{ type: 'text', text: text.replaceAll('\n', ' ') }];
    }

    return text.split('\n').map((line): ContentNodeJSON => {
        if (line === '') {
            return { type: 'paragraph' };
        }

        return { type: 'paragraph', content: [{ type: 'text', text: line }] };
    });
};

/**
 * An opaque island as the reader shows it: a group named by its feature, or generically, with its text; an editable
 * one adds Copy original and Convert to text.
 */
const IslandFallback = ({ inline }: { inline: boolean }) => {
    const { attrs, context, select } = useRichTextNodeView();
    const api = useEditorApi();
    const editable = useEditorValue((live) => live?.editable() === true);
    let feature: string | null = null;
    if (typeof attrs.feature === 'string') {
        feature = attrs.feature;
    }

    const label = islandLabel(context, feature);
    const copy = () => {
        // `navigator.clipboard` is undefined outside a secure context.
        if (navigator.clipboard?.writeText === undefined) {
            api?.announce(context.t('RichTextEditor_copyFailed'));

            return;
        }

        navigator.clipboard
            .writeText(JSON.stringify(attrs.original))
            .then(() => api?.announce(context.t('RichTextEditor_originalCopied')))
            .catch(() => api?.announce(context.t('RichTextEditor_copyFailed')));
    };

    const convert = () => {
        if (api === undefined) {
            return;
        }

        // An island carries no `nodeId`, so the write finds it as the selected node.
        select();
        const written = api.content.replace(api.selectedRange(), islandReplacement(inline, attrs.original));
        if (written.status === 'applied') {
            api.announce(context.t('RichTextEditor_convertedToText'));
        }

        api.focus();
    };

    let Container: 'span' | 'div' = 'div';
    let layout = styles.block;
    if (inline) {
        Container = 'span';
        layout = styles.inline;
    }

    return (
        <>
            <span role="group" aria-label={label} data-rte-island="">
                {islandText(attrs.original)}
            </span>
            {editable && (
                <Container className={`${styles.bar} ${layout}`}>
                    <NodeChromeToolbar aria-label={label}>
                        <NodeChromeButton label={context.t('RichTextEditor_copyOriginal')} onClick={copy} />
                        <NodeChromeButton label={context.t('RichTextEditor_convertToText')} onClick={convert} />
                    </NodeChromeToolbar>
                </Container>
            )}
        </>
    );
};

const BlockIsland = () => <IslandFallback inline={false} />;
const InlineIsland = () => <IslandFallback inline />;

/** The fallback of each island node, which every editor shows without a view of its own. */
export const ISLAND_VIEWS: ReadonlyMap<string, ComponentType<object>> = new Map([
    [ISLAND_BLOCK, BlockIsland],
    [ISLAND_INLINE, InlineIsland],
]);
