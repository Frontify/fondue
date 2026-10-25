/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef, useState } from 'react';

import { type PanelComponentProps } from '#/bridge/define';
import { type EditorApi, useClientLayoutEffect, useEditorApi } from '#/bridge/plugin';

import styles from './styles/outline.module.scss';

const HEADING_KEY = {
    1: 'RichTextEditor_heading1',
    2: 'RichTextEditor_heading2',
    3: 'RichTextEditor_heading3',
    4: 'RichTextEditor_heading4',
    5: 'RichTextEditor_heading5',
    6: 'RichTextEditor_heading6',
} as const;

type Level = keyof typeof HEADING_KEY;

interface OutlineHeading {
    readonly nodeId: string;
    readonly level: Level;
    readonly text: string;
}

const isLevel = (level: unknown): level is Level =>
    level === 1 || level === 2 || level === 3 || level === 4 || level === 5 || level === 6;

/** The document's headings in order, with each stored level and its text. */
const headingsOf = (api: EditorApi | undefined): readonly OutlineHeading[] =>
    (api?.blocks.list('heading') ?? []).flatMap(({ nodeId, attrs, text }) => {
        const { level } = attrs;
        if (nodeId === null || !isLevel(level)) {
            return [];
        }
        return [{ nodeId, level, text }];
    });

/**
 * The document's headings in the order they were read when the panel opened. Choosing one moves the selection to
 * that heading in the current document. A heading that is gone stays listed until the choice, which then moves
 * nothing, reads the headings again and says so, with focus on the outline rather than on another heading.
 */
export const OutlinePanel = ({ t }: PanelComponentProps) => {
    const api = useEditorApi();
    const navRef = useRef<HTMLElement>(null);
    const [entries, setEntries] = useState(() => headingsOf(api));
    useClientLayoutEffect(() => {
        const nav = navRef.current;
        const button = nav?.querySelector('button');
        const target = button ?? nav;
        target?.focus();
    }, []);
    return (
        <nav ref={navRef} className={styles.nav} aria-label={t('RichTextEditor_outline')} tabIndex={-1}>
            {entries.length === 0 && <p className={styles.empty}>{t('RichTextEditor_outlineEmpty')}</p>}
            {entries.length > 0 && (
                <ol className={styles.list}>
                    {entries.map((entry) => (
                        <li key={entry.nodeId}>
                            <button
                                type="button"
                                className={styles.item}
                                data-level={entry.level}
                                data-node-id={entry.nodeId}
                                onClick={() => {
                                    if (api === undefined) {
                                        return;
                                    }
                                    if (!api.blocks.list('heading').some(({ nodeId }) => nodeId === entry.nodeId)) {
                                        navRef.current?.focus();
                                        setEntries(headingsOf(api));
                                        api.announce(t('RichTextEditor_outlineHeadingGone'));
                                        return;
                                    }
                                    api.select({ nodeId: entry.nodeId }, { scroll: true });
                                }}
                            >
                                <span className={styles.level}>{t(HEADING_KEY[entry.level])}</span>
                                {entry.text !== '' && <span className={styles.text}> {entry.text}</span>}
                            </button>
                        </li>
                    ))}
                </ol>
            )}
        </nav>
    );
};
