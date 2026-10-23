/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dialog, Label, RadioList, TextInput } from '@frontify/fondue-components';
import { type FormEvent, useCallback, useId, useRef, useState } from 'react';

import { type EditorApi, type OverlayProps, useEditorApi, useEditorOverlay } from '#/bridge/plugin';
import { type CodecContext, REPLACED_ASSET } from '#/model';

import styles from './styles/media.module.scss';

type Intent = 'meaningful' | 'decorative';

/** The alternative text dialog's strings, in the UI locale. */
export interface AltTextStrings {
    readonly title: string;
    readonly choice: string;
    readonly meaningful: string;
    readonly meaningfulHint: string;
    readonly decorative: string;
    readonly decorativeHint: string;
    readonly field: string;
    readonly required: string;
    readonly suggestion: string;
    readonly useSuggestion: string;
    readonly save: string;
    readonly cancel: string;
}

export const altTextStrings = (t: CodecContext['t']): AltTextStrings => ({
    title: t('RichTextEditor_imageAltTitle'),
    choice: t('RichTextEditor_imageAltChoice'),
    meaningful: t('RichTextEditor_imageAltMeaningful'),
    meaningfulHint: t('RichTextEditor_imageAltMeaningfulHint'),
    decorative: t('RichTextEditor_imageAltDecorative'),
    decorativeHint: t('RichTextEditor_imageAltDecorativeHint'),
    field: t('RichTextEditor_imageAltField'),
    required: t('RichTextEditor_imageAltRequired'),
    suggestion: t('RichTextEditor_imageAltSuggestion'),
    useSuggestion: t('RichTextEditor_imageAltUseSuggestion'),
    save: t('RichTextEditor_imageAltSave'),
    cancel: t('RichTextEditor_cancel'),
});

interface Stored {
    readonly intent: Intent;
    readonly text: string;
    /** The meaningful text of another image of the same asset, which the dialog offers and never fills in. */
    readonly suggestion: string | undefined;
}

const textOf = (value: unknown): string => (typeof value === 'string' ? value : '');

/** What the image `nodeId` stores, read when the dialog opens. */
const storedOf = (api: EditorApi | undefined, nodeId: string): Stored => {
    const nodes = api?.content.read({ nodeId });
    const first = nodes?.[0];
    const attrs = first?.attrs;
    if (api === undefined || attrs === undefined) {
        return { intent: 'meaningful', text: '', suggestion: undefined };
    }
    const { assetId, altIntent, altText } = attrs;
    const other = api.blocks
        .list('asset_image')
        .find(
            ({ nodeId: candidateId, attrs: candidate }) =>
                candidateId !== nodeId &&
                typeof assetId === 'string' &&
                candidate.assetId === assetId &&
                candidate.altIntent === 'meaningful' &&
                textOf(candidate.altText).trim() !== '',
        );
    let suggestion: string | undefined;
    if (other !== undefined) {
        suggestion = textOf(other.attrs.altText);
    }
    // A decorative image opens as stored; any other opens with Meaningful, the first option, selected.
    let intent: Intent = 'meaningful';
    if (altIntent === 'decorative') {
        intent = 'decorative';
    }
    return { intent, text: textOf(altText), suggestion };
};

/**
 * Alternative text of one image: Meaningful, first and selected unless the image is decorative, with a required
 * text field that holds the stored text and nothing else, or Decorative. Save sets `altIntent` and `altText` together
 * as one undo step; a decorative image keeps no text. Another image of the same asset with meaningful text is offered
 * as a suggestion the author can take. Cancel, Escape and Save return focus to `opener`, such as the chrome button or
 * the toolbar's More.
 */
export const AltTextDialog = ({
    nodeId,
    opener,
    strings,
    close: onClose,
}: OverlayProps & {
    readonly nodeId: string;
    readonly strings: AltTextStrings;
}) => {
    const api = useEditorApi();
    const [stored] = useState(() => storedOf(api, nodeId));
    const [open, setOpen] = useState(true);
    const [intent, setIntent] = useState<Intent>(stored.intent);
    const [text, setText] = useState(stored.text);
    const [invalid, setInvalid] = useState(false);
    const fieldRef = useRef<HTMLInputElement>(null);
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };
    const overlay = useEditorOverlay(open, close);
    const dismiss = (next: boolean) => {
        if (!next) {
            overlay.returnFocusTo(opener);
        }
        overlay.onOpenChange(next);
    };
    // Focus inside the content before Radix autofocuses it keeps Fondue from moving it to the first control.
    const focusedRef = useRef(false);
    const focusChecked = useCallback((group: HTMLDivElement | null) => {
        if (group !== null && !focusedRef.current) {
            focusedRef.current = true;
            group.querySelector<HTMLElement>('[role="radio"][aria-checked="true"]')?.focus();
        }
    }, []);
    const legendId = useId();
    const radioId = useId();
    const fieldId = useId();
    const errorId = useId();
    const formId = useId();
    const save = (event: FormEvent) => {
        event.preventDefault();
        if (intent === 'meaningful' && text.trim() === '') {
            setInvalid(true);
            fieldRef.current?.focus();
            return;
        }
        let altText = '';
        if (intent === 'meaningful') {
            altText = text;
        }
        api?.attributes.set('asset_image', { altIntent: intent, altText }, { nodeId });
        api?.nodeState.set(nodeId, REPLACED_ASSET, null);
        overlay.returnFocusTo(opener);
        close(false);
    };
    const options = [
        { value: 'meaningful', label: strings.meaningful, hint: strings.meaningfulHint },
        { value: 'decorative', label: strings.decorative, hint: strings.decorativeHint },
    ] as const;
    let describedBy: { readonly 'aria-describedby'?: string } = {};
    if (invalid) {
        describedBy = { 'aria-describedby': errorId };
    }
    const { suggestion } = stored;
    return (
        <Dialog.Root open={open} onOpenChange={dismiss} modal>
            <Dialog.Content ref={overlay.contentRef} container={overlay.container} maxWidth="400px">
                <Dialog.Header>
                    <Dialog.Title>{strings.title}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <form id={formId} className={styles.form} onSubmit={save} noValidate>
                        <div ref={focusChecked} className={styles.choice}>
                            <span id={legendId}>{strings.choice}</span>
                            <RadioList.Root
                                aria-labelledby={legendId}
                                value={intent}
                                onValueChange={(next) => {
                                    if (next === 'meaningful' || next === 'decorative') {
                                        setIntent(next);
                                        setInvalid(false);
                                    }
                                }}
                            >
                                {options.map((option) => (
                                    <div key={option.value} className={styles.option}>
                                        <RadioList.RadioButton
                                            id={`${radioId}-${option.value}`}
                                            value={option.value}
                                            aria-describedby={`${radioId}-${option.value}-hint`}
                                        />
                                        <span>
                                            <label htmlFor={`${radioId}-${option.value}`}>{option.label}</label>
                                            <span id={`${radioId}-${option.value}-hint`} className={styles.hint}>
                                                {option.hint}
                                            </span>
                                        </span>
                                    </div>
                                ))}
                            </RadioList.Root>
                        </div>
                        {intent === 'meaningful' && (
                            <>
                                <Label htmlFor={fieldId} required>
                                    {strings.field}
                                </Label>
                                <TextInput
                                    ref={fieldRef}
                                    id={fieldId}
                                    value={text}
                                    required
                                    status={invalid ? 'error' : 'neutral'}
                                    aria-errormessage={errorId}
                                    {...describedBy}
                                    onChange={(event) => {
                                        setText(event.target.value);
                                        setInvalid(false);
                                    }}
                                />
                                {invalid && (
                                    <p id={errorId} className={styles.error}>
                                        {strings.required}
                                    </p>
                                )}
                                {suggestion !== undefined && suggestion !== text && (
                                    <p className={styles.suggestion}>
                                        <span>
                                            {strings.suggestion} <bdi>{suggestion}</bdi>
                                        </span>
                                        <Button
                                            emphasis="default"
                                            size="small"
                                            onPress={() => {
                                                setText(suggestion);
                                                setInvalid(false);
                                            }}
                                        >
                                            {strings.useSuggestion}
                                        </Button>
                                    </p>
                                )}
                            </>
                        )}
                    </form>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        emphasis="default"
                        onPress={() => {
                            overlay.returnFocusTo(opener);
                            close(false);
                        }}
                    >
                        {strings.cancel}
                    </Button>
                    <Button type="submit" form={formId} emphasis="strong">
                        {strings.save}
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    );
};
