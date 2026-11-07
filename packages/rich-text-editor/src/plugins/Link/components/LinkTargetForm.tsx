/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Checkbox, Label, TextInput } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { toHref } from '../../shared/helpers/href';
import { allowsHref, describeAllowed, type LinkPolicy } from '../helpers/policy';
import { type LinkValue } from '../helpers/value';

import styles from './linkForm.module.scss';

const UNREADABLE = 'Enter a web address (example.com), an email address, or a phone number (tel:…).';

/**
 * Where a link points, and whether it opens a new tab. An existing link's text
 * is edited in place; a new link gets a Text field, shown when `initialText`
 * is given. Input is validated on save, with the reason announced under the
 * field.
 */
export const LinkTargetForm = ({
    initial,
    initialText,
    policy,
    onSave,
    onCancel,
    onRemove,
}: {
    initial: LinkValue;
    /** The text the link shows, for a link not made yet. Without it the form has no Text field. */
    initialText?: string;
    policy: LinkPolicy;
    /** The text comes with the value only when the form has a Text field. */
    onSave: (value: LinkValue, text?: string) => void;
    onCancel: () => void;
    /** Offered for a link that exists: take it away, keeping its text. */
    onRemove?: () => void;
}): ReactNode => {
    // A stored link without a string target opens the form empty rather than uncontrolled.
    const [typed, setTyped] = useState(typeof initial.href === 'string' ? initial.href : '');
    const [text, setText] = useState(initialText ?? '');
    const [openInNewTab, setOpenInNewTab] = useState(initial.openInNewTab === true);
    // Set by a failed save, cleared when the field changes.
    const [error, setError] = useState<string | null>(null);
    const textId = useId();
    const urlId = useId();
    const newTabId = useId();
    const errorId = useId();
    const urlFieldRef = useRef<HTMLInputElement>(null);
    const textFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Selected text is already there to keep, so the address is what is left to type.
        const first = initialText === '' ? textFieldRef.current : urlFieldRef.current;
        first?.focus();
    }, [initialText]);

    const save = (): void => {
        const href = toHref(typed);
        if (href === null || !allowsHref(policy, href)) {
            if (typed.trim() === '') {
                setError('Enter where the link goes.');
            } else if (href === null) {
                setError(UNREADABLE);
            } else {
                // A policy with nothing to name cannot be what refused it.
                setError(describeAllowed(policy) || UNREADABLE);
            }
            urlFieldRef.current?.focus();
            return;
        }
        const value: LinkValue = openInNewTab ? { href, openInNewTab: true } : { href };
        if (initialText === undefined) {
            onSave(value);
        } else {
            onSave(value, text);
        }
    };

    const saveOnEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
        // The Enter that confirms an input-method composition is not a submit; 229 is what browsers report for it.
        if (event.nativeEvent.isComposing || event.keyCode === 229) {
            return;
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            save();
        }
    };

    return (
        <div className={styles.fields}>
            {initialText === undefined ? null : (
                <div className={styles.field}>
                    <Label htmlFor={textId}>Text</Label>
                    <TextInput
                        id={textId}
                        ref={textFieldRef}
                        type="text"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        onKeyDown={saveOnEnter}
                    />
                </div>
            )}
            <div className={styles.field}>
                <Label htmlFor={urlId}>Link to</Label>
                <TextInput
                    id={urlId}
                    ref={urlFieldRef}
                    type="url"
                    placeholder="example.com"
                    value={typed}
                    status={error === null ? 'neutral' : 'error'}
                    aria-describedby={error === null ? undefined : errorId}
                    aria-errormessage={errorId}
                    onChange={(event) => {
                        setTyped(event.target.value);
                        setError(null);
                    }}
                    onKeyDown={saveOnEnter}
                />
                {/* Always in the page, so the message is announced as it appears. */}
                <span id={errorId} role="alert" className={styles.error}>
                    {error}
                </span>
            </div>
            <div className={styles.newTab}>
                <Checkbox
                    id={newTabId}
                    value={openInNewTab}
                    onChange={() => setOpenInNewTab((previous) => !previous)}
                />
                <Label htmlFor={newTabId}>Open in new tab</Label>
            </div>
            <div className={styles.formActions}>
                {onRemove ? (
                    <Button size="small" emphasis="weak" onPress={onRemove}>
                        Remove link
                    </Button>
                ) : null}
                <Button size="small" emphasis="weak" onPress={onCancel}>
                    Cancel
                </Button>
                <Button size="small" onPress={save}>
                    Save
                </Button>
            </div>
        </div>
    );
};
