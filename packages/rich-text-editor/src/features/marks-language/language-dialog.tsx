/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Label, TextInput } from '@frontify/fondue-components';
import { type FormEvent, useCallback, useEffect, useId, useRef, useState } from 'react';

import { EditorDialog, useEditorDialog } from '#/bridge/define';
import { type EditorApi, type OverlayProps, useEditorApi } from '#/bridge/plugin';
import { type CodecContext } from '#/model';

import styles from './styles/language.module.scss';

/** The command the dialog runs. */
export const SET_LANGUAGE = 'mark.language.set';

/** The language dialog's strings, in the UI locale. */
interface LanguageStrings {
    readonly title: string;
    readonly tag: string;
    readonly direction: string;
    readonly none: string;
    readonly automatic: string;
    readonly leftToRight: string;
    readonly rightToLeft: string;
    readonly invalid: string;
    readonly remove: string;
    readonly apply: string;
    readonly cancel: string;
}

const directions = [
    { value: '', label: 'none' },
    { value: 'ltr', label: 'ltr' },
    { value: 'rtl', label: 'rtl' },
    { value: 'auto', label: 'auto' },
] as const;

const languageStrings = (t: CodecContext['t']): LanguageStrings => ({
    title: t('RichTextEditor_languageTitle'),
    tag: t('RichTextEditor_languageTag'),
    direction: t('RichTextEditor_languageDirection'),
    none: t('RichTextEditor_languageNone'),
    automatic: t('RichTextEditor_languageAutomatic'),
    leftToRight: t('RichTextEditor_languageLeftToRight'),
    rightToLeft: t('RichTextEditor_languageRightToLeft'),
    invalid: t('RichTextEditor_languageInvalid'),
    remove: t('RichTextEditor_languageRemove'),
    apply: t('RichTextEditor_apply'),
    cancel: t('RichTextEditor_cancel'),
});

/** The `languages` option of `marks.language`, or none when that feature is not installed. */
const languageOptions = (api: EditorApi): readonly string[] => {
    const languages = api.optionsOf('marks.language')?.languages;
    if (!Array.isArray(languages)) {
        return [];
    }
    return languages.filter((tag): tag is string => typeof tag === 'string');
};

const labelOf = (tag: string, locale: string): string => {
    const name = new Intl.DisplayNames([locale], { type: 'language' }).of(tag);
    if (name === undefined) {
        return tag;
    }
    return name;
};

const directionOf = (value: string): 'ltr' | 'rtl' | 'auto' | null => {
    if (value === 'ltr' || value === 'rtl' || value === 'auto') {
        return value;
    }
    return null;
};

/** The language mark at the selection's start, used to fill the dialog. */
const currentLanguage = (api: EditorApi): { readonly lang: string; readonly dir: string } => {
    const attrs = api.marks.attrs('language');
    let lang = '';
    if (typeof attrs?.lang === 'string') {
        lang = attrs.lang;
    }
    let dir = '';
    if (typeof attrs?.dir === 'string') {
        dir = attrs.dir;
    }
    return { lang, dir };
};

/**
 * Language of a passage: the option's tags, labelled in the UI locale, with a stored tag the option misses first, or
 * a typed tag when the option lists none. Apply runs `mark.language.set` and returns focus to the surface; Remove runs
 * it with `null`. Cancel and Escape return focus to the control that opened the dialog.
 */
export const LanguageDialog = ({ opener, close: onClose }: OverlayProps) => {
    const api = useEditorApi();
    const dialog = useEditorDialog(opener, onClose);
    const [current] = useState(() => {
        if (api === undefined) {
            return { lang: '', dir: '' };
        }
        return currentLanguage(api);
    });
    let translate: CodecContext['t'] = (key) => key;
    if (api !== undefined) {
        translate = api.t;
    }
    const strings = languageStrings(translate);
    let languages: readonly string[] = [];
    let locale = 'en-US';
    if (api !== undefined) {
        languages = languageOptions(api);
        locale = api.locale();
    }
    const [tag, setTag] = useState(current.lang);
    const [dir, setDir] = useState(current.dir);
    const [invalid, setInvalid] = useState(false);
    // Each rejected Apply, after whose error renders focus moves to the field that holds it.
    const [rejections, setRejections] = useState(0);
    const fieldRef = useRef<HTMLInputElement>(null);
    const groupRef = useRef<HTMLFieldSetElement>(null);
    // Focus inside the content before Radix autofocuses it keeps Fondue from moving it to the first radio.
    const focusedRef = useRef(false);
    const focusOnce = useCallback((element: HTMLInputElement | null) => {
        if (element !== null && !focusedRef.current) {
            focusedRef.current = true;
            element.focus();
        }
    }, []);
    const fieldId = useId();
    const errorId = useId();
    const legendId = useId();
    const directionId = useId();
    let offered = languages;
    if (languages.length > 0 && current.lang !== '' && !languages.includes(current.lang)) {
        offered = [current.lang, ...languages];
    }
    const directionLabel = (value: '' | 'ltr' | 'rtl' | 'auto') => {
        if (value === 'ltr') {
            return strings.leftToRight;
        }
        if (value === 'rtl') {
            return strings.rightToLeft;
        }
        if (value === 'auto') {
            return strings.automatic;
        }
        return strings.none;
    };
    const apply = (event: FormEvent) => {
        event.preventDefault();
        if (api === undefined) {
            return;
        }
        const result = api.commands.execute(SET_LANGUAGE, { lang: tag, dir: directionOf(dir) });
        if (result.status === 'rejected') {
            setInvalid(true);
            setRejections((count) => count + 1);
            return;
        }
        dialog.finish('surface');
    };
    const remove = () => {
        api?.commands.execute(SET_LANGUAGE, null);
        dialog.finish('surface');
    };
    let status: 'error' | 'neutral' = 'neutral';
    if (invalid) {
        status = 'error';
    }
    let errorMessage: string | undefined;
    let describedBy: { readonly 'aria-describedby'?: string } = {};
    // The radio a rejected Apply focuses, described by the error: the checked one, else the first. The invalid state stays on
    // the group, since a radio takes no `aria-invalid`.
    let invalidOption: string | undefined;
    if (invalid) {
        errorMessage = errorId;
        describedBy = { 'aria-describedby': errorId };
        invalidOption = offered.includes(tag) ? tag : offered[0];
    }
    useEffect(() => {
        if (rejections === 0) {
            return;
        }
        const radio = groupRef.current?.querySelector<HTMLInputElement>('input[aria-describedby]');
        const target = radio ?? fieldRef.current;
        target?.focus();
    }, [rejections]);
    return (
        <EditorDialog
            dialog={dialog}
            title={strings.title}
            cancel={strings.cancel}
            submit={{ label: strings.apply, onSubmit: apply, formClassName: styles.form }}
            actions={
                <Button emphasis="default" onPress={remove}>
                    {strings.remove}
                </Button>
            }
        >
            {offered.length === 0 && (
                <>
                    <Label htmlFor={fieldId}>{strings.tag}</Label>
                    <TextInput
                        ref={fieldRef}
                        id={fieldId}
                        value={tag}
                        status={status}
                        aria-errormessage={errorId}
                        {...describedBy}
                        onChange={(event) => {
                            setTag(event.target.value);
                            setInvalid(false);
                        }}
                    />
                    {invalid && <p id={errorId}>{strings.invalid}</p>}
                </>
            )}
            {offered.length > 0 && (
                <fieldset
                    ref={groupRef}
                    role="radiogroup"
                    className={styles.languages}
                    aria-labelledby={legendId}
                    aria-invalid={invalid || undefined}
                    aria-errormessage={errorMessage}
                >
                    <legend id={legendId}>{strings.tag}</legend>
                    <div className={styles.options}>
                        {offered.map((option) => (
                            <label key={option} className={styles.option}>
                                <input
                                    ref={option === current.lang ? focusOnce : undefined}
                                    type="radio"
                                    name="language"
                                    value={option}
                                    checked={tag === option}
                                    aria-describedby={option === invalidOption ? errorId : undefined}
                                    onChange={() => {
                                        setTag(option);
                                        setInvalid(false);
                                    }}
                                />
                                {labelOf(option, locale)}
                            </label>
                        ))}
                    </div>
                    {invalid && <p id={errorId}>{strings.invalid}</p>}
                </fieldset>
            )}
            <Label htmlFor={directionId}>{strings.direction}</Label>
            <select id={directionId} value={dir} onChange={(event) => setDir(event.target.value)}>
                {directions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {directionLabel(option.value)}
                    </option>
                ))}
            </select>
        </EditorDialog>
    );
};
