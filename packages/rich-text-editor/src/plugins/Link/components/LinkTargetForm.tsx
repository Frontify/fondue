/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Checkbox, Label, TextInput } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { type LinkValue } from '../helpers/draft';
import { toHref } from '../helpers/href';

import styles from './linkForm.module.scss';

/**
 * Where an existing link points, and whether it opens a new tab. The text is
 * not here: it is in the document, edited in place.
 */
export const LinkTargetForm = ({
    initial,
    onSave,
    onCancel,
}: {
    initial: LinkValue;
    onSave: (value: LinkValue) => void;
    onCancel: () => void;
}): ReactNode => {
    const [typed, setTyped] = useState(initial.href);
    const [openInNewTab, setOpenInNewTab] = useState(initial.openInNewTab === true);
    const urlId = useId();
    const urlFieldRef = useRef<HTMLInputElement>(null);
    const href = toHref(typed);

    useEffect(() => {
        urlFieldRef.current?.focus();
    }, []);

    const save = (): void => {
        if (href !== null) {
            onSave(openInNewTab ? { href, openInNewTab: true } : { href });
        }
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
                    status={typed !== '' && href === null ? 'error' : 'neutral'}
                    onChange={(event) => setTyped(event.target.value)}
                    onKeyDown={saveOnEnter}
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
                <Button size="small" emphasis="weak" onPress={onCancel}>
                    Cancel
                </Button>
                <Button size="small" disabled={href === null} onPress={save}>
                    Save
                </Button>
            </div>
        </div>
    );
};
