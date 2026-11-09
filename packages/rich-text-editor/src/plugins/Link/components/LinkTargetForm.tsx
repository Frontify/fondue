/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Checkbox, Label, TextInput } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { toHref } from '../../shared/helpers/href';
import { isCompositionKey } from '../../shared/helpers/keys';
import { type LinkDestination, type LinkSearch } from '../helpers/destination';
import { allowsHref, describeAllowed, type LinkPolicy } from '../helpers/policy';
import { type LinkValue } from '../helpers/value';

import { DestinationField } from './DestinationField';
import styles from './linkForm.module.scss';

const UNREADABLE = 'Enter a web address (example.com), an email address, or a phone number (tel:…).';

/**
 * The `kind` says whether the form makes a new link, which gets a Text field, or edits one that exists, whose text is edited in place. It also decides what `onSave` receives.
 */
export type LinkTargetFormProps = {
    initial: LinkValue;
    policy: LinkPolicy;
    /**
     * Turns the "Link to" field into a search over the app's pages.
     */
    search?: LinkSearch;
    onCancel: () => void;
    /** Offered for a link that exists: take it away, keeping its text. */
    onRemove?: () => void;
} & (
    | {
          kind: 'create';
          /**
           * The text the new link shows, to start with.
           */
          text: string;
          /**
           * The text is the Text field's.
           */
          onSave: (value: LinkValue, text: string) => void;
      }
    | { kind: 'edit'; onSave: (value: LinkValue) => void }
);

/**
 * Where a link points, and whether it opens a new tab. An existing link's text
 * is edited in place; a new link gets a Text field, shown in `create` mode.
 * Input is validated on save, with the reason announced under the field.
 */
export const LinkTargetForm = (props: LinkTargetFormProps): ReactNode => {
    const { initial, policy, search, onCancel, onRemove } = props;
    // A stored link without a string target opens the form empty rather than uncontrolled.
    const [typed, setTyped] = useState(typeof initial.href === 'string' ? initial.href : '');
    const [text, setText] = useState(props.kind === 'create' ? props.text : '');
    const [openInNewTab, setOpenInNewTab] = useState(initial.openInNewTab === true);
    // Set by a failed save, cleared when the field changes.
    const [error, setError] = useState<string | null>(null);
    const textId = useId();
    const urlId = useId();
    const newTabId = useId();
    const errorId = useId();
    const urlFieldRef = useRef<HTMLInputElement>(null);
    const textFieldRef = useRef<HTMLInputElement>(null);

    const startsOnText = props.kind === 'create' && props.text === '';
    useEffect(() => {
        // Selected text is already there to keep, so the address is what is left to type.
        let first = urlFieldRef.current;
        if (startsOnText) {
            first = textFieldRef.current;
        }
        first?.focus();
    }, [startsOnText]);

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
        let value: LinkValue = { href };
        if (openInNewTab) {
            value = { href, openInNewTab: true };
        }
        if (props.kind === 'create') {
            props.onSave(value, text);
        } else {
            props.onSave(value);
        }
    };

    const saveOnEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (isCompositionKey(event)) {
            return;
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            save();
        }
    };

    const pick = (destination: LinkDestination): void => {
        setTyped(destination.href);
        setError(null);
        // An empty Text field takes the page's name; text already there is the author's.
        if (props.kind === 'create' && text === '') {
            setText(destination.label);
        }
    };

    return (
        <div className={styles.fields}>
            {props.kind === 'edit' ? null : (
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
                <DestinationField
                    id={urlId}
                    inputRef={urlFieldRef}
                    value={typed}
                    status={error === null ? 'neutral' : 'error'}
                    errorId={errorId}
                    search={search}
                    policy={policy}
                    onChange={(next) => {
                        setTyped(next);
                        setError(null);
                    }}
                    onPick={pick}
                    onEnter={saveOnEnter}
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
