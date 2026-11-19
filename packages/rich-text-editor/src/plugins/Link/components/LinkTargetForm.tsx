/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Checkbox, Label, Select, TextInput } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { useTranslate } from '#/ui/translation';

import { toHref } from '../../shared/helpers/href';
import { isCompositionKey } from '../../shared/helpers/keys';
import { APPEARANCES, isButtonLink, isLinkAppearance, NO_APPEARANCES } from '../helpers/appearance';
import { type LinkDestination, type LinkSearch } from '../helpers/destination';
import { type LinkAppearance, type LinkValue } from '../helpers/value';

import { DestinationField } from './DestinationField';
import styles from './linkForm.module.scss';

// The Select's value for no appearance; it cannot clash with an appearance's name.
const NO_STYLE_VALUE = 'none';

/**
 * A `create` form has a Text field and saves the text too. An `edit` form leaves the text to the editor.
 */
export type LinkTargetFormProps = {
    initial: LinkValue;
    /**
     * Turns the "Link to" field into a search over the app's pages.
     */
    search?: LinkSearch;
    /**
     * The button looks a Style select offers, after "No style". Left out, the form has no Style select.
     */
    appearances?: readonly LinkAppearance[];
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
           * The Text field's value.
           */
          onSave: (value: LinkValue, text: string) => void;
      }
    | { kind: 'edit'; onSave: (value: LinkValue) => void }
);

type FormMode = {
    /** What the Text field of a new link starts with; null for an existing link, whose text is edited in place. */
    textField: string | null;
    onSave: (value: LinkValue, text: string) => void;
};

const resolveMode = (props: LinkTargetFormProps): FormMode => {
    switch (props.kind) {
        case 'create':
            return { textField: props.text, onSave: props.onSave };
        case 'edit': {
            const { onSave } = props;
            return { textField: null, onSave: (value) => onSave(value) };
        }
    }
};

/**
 * Where a link points, and whether it opens a new tab. Input is validated on save, with the reason announced under
 * the field.
 */
export const LinkTargetForm = (props: LinkTargetFormProps): ReactNode => {
    const translate = useTranslate();
    const { initial, search, appearances = NO_APPEARANCES, onCancel, onRemove } = props;
    const { textField, onSave } = resolveMode(props);
    // A stored link without a string target opens the form empty rather than uncontrolled.
    const [typed, setTyped] = useState(typeof initial.href === 'string' ? initial.href : '');
    let initialText = '';
    if (textField !== null) {
        initialText = textField;
    }
    const [text, setText] = useState(initialText);
    const [openInNewTab, setOpenInNewTab] = useState(initial.openInNewTab === true);

    // A stored value this form cannot name is not kept, as the renderer shows it plain.
    let storedAppearance: LinkAppearance | null = null;
    if (isButtonLink(initial)) {
        storedAppearance = initial.appearance;
    }

    const [appearance, setAppearance] = useState(storedAppearance);
    // A stored style the editor no longer offers stays selectable, so editing never drops it silently.
    const styleOptions = [...appearances];
    if (storedAppearance !== null && !appearances.includes(storedAppearance)) {
        styleOptions.push(storedAppearance);
    }

    // Set by a failed save, cleared when the field changes.
    const [error, setError] = useState<string | null>(null);
    const textId = useId();
    const urlId = useId();
    const styleId = useId();
    const styleLabelId = useId();
    const newTabId = useId();
    const errorId = useId();
    const urlFieldRef = useRef<HTMLInputElement>(null);
    const textFieldRef = useRef<HTMLInputElement>(null);

    const startsOnText = textField === '';
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
        if (href === null) {
            if (typed.trim() === '') {
                setError(translate('RichTextEditor_linkEmpty'));
            } else {
                setError(translate('RichTextEditor_linkInvalid'));
            }
            urlFieldRef.current?.focus();
            return;
        }
        let value: LinkValue = { href };
        if (openInNewTab) {
            value = { href, openInNewTab: true };
        }

        if (appearance !== null) {
            value = { ...value, appearance };
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

    const chooseStyle = (selected: string | null): void => {
        if (isLinkAppearance(selected)) {
            setAppearance(selected);
        } else {
            setAppearance(null);
        }
    };

    return (
        <div className={styles.fields}>
            {textField === null ? null : (
                <div className={styles.field}>
                    <Label htmlFor={textId}>{translate('RichTextEditor_text')}</Label>
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
                <Label htmlFor={urlId}>{translate('RichTextEditor_linkTo')}</Label>
                <DestinationField
                    id={urlId}
                    inputRef={urlFieldRef}
                    value={typed}
                    status={error === null ? 'neutral' : 'error'}
                    errorId={errorId}
                    search={search}
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
            {styleOptions.length === 0 ? null : (
                <div className={styles.field}>
                    <Label id={styleLabelId} htmlFor={styleId}>
                        {translate('RichTextEditor_linkStyle')}
                    </Label>
                    {/* A combobox is not a labelable element, so `htmlFor` alone does not name it. */}
                    <Select
                        id={styleId}
                        aria-labelledby={styleLabelId}
                        value={appearance ?? NO_STYLE_VALUE}
                        onSelect={chooseStyle}
                    >
                        <Select.Item value={NO_STYLE_VALUE} label={translate('RichTextEditor_linkNoStyle')}>
                            {translate('RichTextEditor_linkNoStyle')}
                        </Select.Item>
                        {styleOptions.map((option) => (
                            <Select.Item key={option} value={option} label={translate(APPEARANCES[option].label)}>
                                {translate(APPEARANCES[option].label)}
                            </Select.Item>
                        ))}
                    </Select>
                </div>
            )}
            <div className={styles.newTab}>
                <Checkbox
                    id={newTabId}
                    value={openInNewTab}
                    onChange={() => setOpenInNewTab((previous) => !previous)}
                />
                <Label htmlFor={newTabId}>{translate('RichTextEditor_linkOpenInNewTab')}</Label>
            </div>
            <div className={styles.formActions}>
                {onRemove ? (
                    <Button size="small" emphasis="weak" onPress={onRemove}>
                        {translate('RichTextEditor_linkRemove')}
                    </Button>
                ) : null}
                <Button size="small" emphasis="weak" onPress={onCancel}>
                    {translate('RichTextEditor_cancel')}
                </Button>
                <Button size="small" onPress={save}>
                    {translate('RichTextEditor_save')}
                </Button>
            </div>
        </div>
    );
};
