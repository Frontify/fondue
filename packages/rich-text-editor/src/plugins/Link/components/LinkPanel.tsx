/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';
import { type ReactNode, useState } from 'react';

import { type EditorControlApi } from '#/domain';

import { draftFrom, keepSelection, type LinkDraft, type LinkRun } from '../helpers/draft';

import { LinkForm } from './LinkForm';
import styles from './linkPanel.module.scss';

/**
 * What a link shows under itself: where it goes, and the two things to do with
 * it. Edit swaps the same form in, and moving the caret off the link unmounts
 * the whole panel — which is all it takes to cancel an edit in progress.
 */
export const LinkPanel = ({ api, run }: { api: EditorControlApi; run: LinkRun }): ReactNode => {
    const [draft, setDraft] = useState<LinkDraft | null>(null);
    const href = run.value.href ?? '';

    if (draft !== null) {
        return <LinkForm api={api} initial={draft} existing onDone={() => setDraft(null)} />;
    }

    return (
        <div className={styles.panel}>
            <a className={styles.target} href={href} target="_blank" rel="noopener noreferrer" title={href}>
                {href}
            </a>
            <div className={styles.panelActions}>
                <Button
                    {...keepSelection}
                    size="small"
                    emphasis="weak"
                    onPress={() => setDraft(draftFrom(run.value, run.text))}
                >
                    Edit
                </Button>
                <Button
                    {...keepSelection}
                    size="small"
                    emphasis="weak"
                    onPress={() => {
                        // The caret is somewhere in the link; the whole run has
                        // to be selected for the mark to come off all of it.
                        api.marks.select('link');
                        api.marks.toggle('link');
                    }}
                >
                    Remove
                </Button>
            </div>
        </div>
    );
};
