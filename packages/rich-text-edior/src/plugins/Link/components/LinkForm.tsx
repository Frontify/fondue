/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Checkbox, Label, TextInput } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { type EditorControlApi } from '#/RichTextEditor';

import { type LinkDraft } from '../helpers/draft';
import { toHref } from '../helpers/href';

import styles from './linkForm.module.scss';

/**
 * The two halves of a link — the text it reads as, and the target it points at
 * — and what to do with them. Opened on a snapshot of the selection rather than
 * reading it as it goes, so it is mounted fresh each time and always starts on
 * what the document actually says.
 *
 * With nothing selected there is nothing to fill the text with, so it is typed
 * here instead and the link is created out of it.
 */
export const LinkForm = ({
    api,
    initial,
    existing,
    onDone,
}: {
    api: EditorControlApi;
    initial: LinkDraft;
    /** There is already a link here: the form saves and can also take it away. */
    existing: boolean;
    onDone: () => void;
}): ReactNode => {
    const [typed, setTyped] = useState(initial.href);
    const [text, setText] = useState(initial.text);
    const [openInNewTab, setOpenInNewTab] = useState(initial.openInNewTab);
    const textId = useId();
    const urlId = useId();
    const textFieldRef = useRef<HTMLInputElement>(null);
    const urlFieldRef = useRef<HTMLInputElement>(null);

    const href = toHref(typed);
    const complete = href !== null && text.trim() !== '';

    useEffect(() => {
        // Whichever field still needs filling: with text already there, the
        // target is all that is missing, so typing starts there.
        (initial.text === '' ? textFieldRef : urlFieldRef).current?.focus();
        // On mount only — the fields are the user's from then on.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, []);

    const commit = (): void => {
        if (!complete || href === null) {
            return;
        }
        // Everything below acts on the selection, so it has to be the link:
        // opened on a caret there is nothing selected yet, and opened from the
        // toolbar this is what already happened and does nothing.
        api.selectMark('link');
        // Writing the text puts it in the selection, so the mark below lands on
        // exactly it — the same path whether it was typed here or in the editor.
        // Only when it changed: rewriting it would flatten anything else the
        // selection carries (bold inside it, a mention next to it).
        if (text !== initial.text) {
            api.replaceSelectionWithText(text);
        }
        // A value-carrying mark has to be cleared before it can be re-set:
        // toggling on top of an existing link would only remove it.
        if (api.isMarkActive('link')) {
            api.toggleMark('link');
        }
        api.toggleMark('link', openInNewTab ? { href, openInNewTab: true } : { href });
        onDone();
    };

    const remove = (): void => {
        api.selectMark('link');
        api.toggleMark('link');
        onDone();
    };

    /** Enter submits from either field — a two-field form still behaves like one. */
    const submitOnEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            event.preventDefault();
            commit();
        }
    };

    return (
        <div className={styles.fields}>
            <div className={styles.field}>
                <Label htmlFor={textId}>Text</Label>
                <TextInput
                    id={textId}
                    ref={textFieldRef}
                    placeholder="Text to link"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={submitOnEnter}
                />
            </div>
            <div className={styles.field}>
                <Label htmlFor={urlId}>Link to</Label>
                <TextInput
                    id={urlId}
                    ref={urlFieldRef}
                    type="url"
                    placeholder="example.com"
                    value={typed}
                    status={typed !== '' && href === null ? 'error' : 'neutral'}
                    onChange={(event) => setTyped(event.target.value)}
                    onKeyDown={submitOnEnter}
                />
            </div>
            <div className={styles.newTab}>
                <Checkbox
                    aria-label="Open in new tab"
                    value={openInNewTab}
                    onChange={() => setOpenInNewTab((previous) => !previous)}
                />
                <span>Open in new tab</span>
            </div>
            <div className={styles.formActions}>
                {existing ? (
                    <Button size="small" emphasis="weak" onPress={remove}>
                        Remove
                    </Button>
                ) : null}
                <Button size="small" disabled={!complete} onPress={commit}>
                    {existing ? 'Save' : 'Add'}
                </Button>
            </div>
        </div>
    );
};
