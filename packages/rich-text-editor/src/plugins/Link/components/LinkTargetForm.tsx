/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Checkbox, Label, TextInput } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { toHref } from '../../shared/helpers/href';
import { type LinkValue } from '../helpers/value';

import styles from './linkForm.module.scss';

/**
 * Where a link points, and whether it opens a new tab. The text is edited in
 * place, not here. Input is validated on save, with the reason announced under
 * the field.
 */
export const LinkTargetForm = ({
    initial,
    onSave,
    onCancel,
    onRemove,
}: {
    initial: LinkValue;
    onSave: (value: LinkValue) => void;
    onCancel: () => void;
    /** Offered for a link that exists: take it away, keeping its text. */
    onRemove?: () => void;
}): ReactNode => {
    // A stored link without a string target opens the form empty rather than uncontrolled.
    const [typed, setTyped] = useState(typeof initial.href === 'string' ? initial.href : '');
    const [openInNewTab, setOpenInNewTab] = useState(initial.openInNewTab === true);
    // Set by a failed save, cleared when the field changes.
    const [error, setError] = useState<string | null>(null);
    const urlId = useId();
    const newTabId = useId();
    const errorId = useId();
    const urlFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        urlFieldRef.current?.focus();
    }, []);

    const save = (): void => {
        const href = toHref(typed);
        if (href === null) {
            setError(
                typed.trim() === ''
                    ? 'Enter where the link goes.'
                    : 'Enter a web address (example.com), an email address, or a phone number (tel:…).',
            );
            urlFieldRef.current?.focus();
            return;
        }
        onSave(openInNewTab ? { href, openInNewTab: true } : { href });
    };

    const saveOnEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            event.preventDefault();
            save();
        }
    };

    return (
        <div className={styles.fields}>
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
