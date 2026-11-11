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
const MISSING_ADDRESS = 'Enter where the link goes.';
const TEXT_LABEL = 'Text';
const LINK_TO_LABEL = 'Link to';
const NEW_TAB_LABEL = 'Open in new tab';
const REMOVE_LABEL = 'Remove link';
const CANCEL_LABEL = 'Cancel';
const SAVE_LABEL = 'Save';

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

type TextField = {
    text: string;
};

type FormMode = {
    /** The Text field a new link shows; null for an existing link, whose text is edited in place. */
    textField: TextField | null;
    onSave: (value: LinkValue, text: string) => void;
};

const resolveMode = (props: LinkTargetFormProps): FormMode => {
    switch (props.kind) {
        case 'create':
            return { textField: { text: props.text }, onSave: props.onSave };
        case 'edit': {
            const { onSave } = props;
            return { textField: null, onSave: (value) => onSave(value) };
        }
    }
};

/**
 * Where a link points, and whether it opens a new tab. An existing link's text
 * is edited in place; a new link gets a Text field, shown in `create` mode.
 * Input is validated on save, with the reason announced under the field.
 */
export const LinkTargetForm = (props: LinkTargetFormProps): ReactNode => {
    const { initial, policy, search, onCancel, onRemove } = props;
    const { textField, onSave } = resolveMode(props);
    // A stored link without a string target opens the form empty rather than uncontrolled.
    const [typed, setTyped] = useState(typeof initial.href === 'string' ? initial.href : '');
    let initialText = '';
    if (textField !== null) {
        initialText = textField.text;
    }
    const [text, setText] = useState(initialText);
    const [openInNewTab, setOpenInNewTab] = useState(initial.openInNewTab === true);
    // Set by a failed save, cleared when the field changes.
    const [error, setError] = useState<string | null>(null);
    const textId = useId();
    const urlId = useId();
    const newTabId = useId();
    const errorId = useId();
    const urlFieldRef = useRef<HTMLInputElement>(null);
    const textFieldRef = useRef<HTMLInputElement>(null);

    const startsOnText = textField !== null && textField.text === '';
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
                setError(MISSING_ADDRESS);
            } else if (href === null) {
                setError(UNREADABLE);
            } else {
                // A policy with nothing to name cannot be what refused it.
                let reason = describeAllowed(policy);
                if (reason === '') {
                    reason = UNREADABLE;
                }
                setError(reason);
            }
            urlFieldRef.current?.focus();
            return;
        }
        let value: LinkValue = { href };
        if (openInNewTab) {
            value = { href, openInNewTab: true };
        }
        onSave(value, text);
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
        if (textField !== null && text === '') {
            setText(destination.label);
        }
    };

    return (
        <div className={styles.fields}>
            {textField === null ? null : (
                <div className={styles.field}>
                    <Label htmlFor={textId}>{TEXT_LABEL}</Label>
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
                <Label htmlFor={urlId}>{LINK_TO_LABEL}</Label>
                <DestinationField
                    id={urlId}
                    ref={urlFieldRef}
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
                <Label htmlFor={newTabId}>{NEW_TAB_LABEL}</Label>
            </div>
            <div className={styles.formActions}>
                {onRemove ? (
                    <Button size="small" emphasis="weak" onPress={onRemove}>
                        {REMOVE_LABEL}
                    </Button>
                ) : null}
                <Button size="small" emphasis="weak" onPress={onCancel}>
                    {CANCEL_LABEL}
                </Button>
                <Button size="small" onPress={save}>
                    {SAVE_LABEL}
                </Button>
            </div>
        </div>
    );
};
