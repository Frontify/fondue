/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dialog, Label, TextInput } from '@frontify/fondue-components';
import { type FormEvent, useContext, useId, useState } from 'react';

import { SessionContext } from '#/bridge/hooks';
import { useEditorOverlay } from '#/bridge/overlays';
import { type ContentModel } from '#/model';
import { compiledModel } from '#/model/compile';
import { type EditorRuntime } from '#/runtime/runtime';

/** The command the dialog runs. */
export const SET_LANGUAGE = 'mark.language.set';

/** The language dialog's strings, in the UI locale. */
export interface LanguageStrings {
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

/** The `languages` option of `marks.language`, or none when that feature is not installed. */
export const languageOptions = (model: ContentModel): readonly string[] => {
    const feature = compiledModel(model).features.find((item) => item.id === 'marks.language');
    if (feature === undefined) {
        return [];
    }
    const { languages } = feature.options;
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

/** The language mark at the caret, used to fill the dialog. */
const currentLanguage = (runtime: EditorRuntime | undefined): { readonly lang: string; readonly dir: string } => {
    const view = runtime?.view;
    const type = view?.state.schema.marks.language;
    if (view === undefined || type === undefined) {
        return { lang: '', dir: '' };
    }
    const stored = view.state.storedMarks ?? view.state.selection.$from.marks();
    const mark = type.isInSet(stored);
    if (mark === undefined) {
        return { lang: '', dir: '' };
    }
    let lang = '';
    if (typeof mark.attrs.lang === 'string') {
        lang = mark.attrs.lang;
    }
    let dir = '';
    if (typeof mark.attrs.dir === 'string') {
        dir = mark.attrs.dir;
    }
    return { lang, dir };
};

/**
 * Language of a passage: the option's tags, labelled in the UI locale, or a typed tag when the option lists none.
 * Apply runs `mark.language.set`; Remove runs it with `null`.
 */
export const LanguageDialog = ({
    languages,
    locale,
    strings,
    onClose,
}: {
    readonly languages: readonly string[];
    /** The UI locale, which names each offered tag. */
    readonly locale: string;
    readonly strings: LanguageStrings;
    readonly onClose: () => void;
}) => {
    const runtime = useContext(SessionContext);
    const [open, setOpen] = useState(true);
    const current = currentLanguage(runtime);
    const [tag, setTag] = useState(current.lang);
    const [dir, setDir] = useState(current.dir);
    const [invalid, setInvalid] = useState(false);
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };
    const overlay = useEditorOverlay(open, close);
    const fieldId = useId();
    const directionId = useId();
    const formId = useId();
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
        if (runtime === undefined) {
            return;
        }
        const result = runtime.handle.execute(SET_LANGUAGE, { lang: tag, dir: directionOf(dir) });
        if (result.status === 'rejected') {
            setInvalid(true);
            return;
        }
        close(false);
    };
    const remove = () => {
        runtime?.handle.execute(SET_LANGUAGE, null);
        close(false);
    };
    let status: 'error' | 'neutral' = 'neutral';
    if (invalid) {
        status = 'error';
    }
    return (
        <Dialog.Root open={open} onOpenChange={overlay.onOpenChange} modal>
            <Dialog.Content ref={overlay.contentRef} container={overlay.container} maxWidth="400px">
                <Dialog.Header showCloseButton={false}>
                    <Dialog.Title>{strings.title}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <form id={formId} onSubmit={apply} noValidate>
                        {languages.length === 0 && (
                            <>
                                <Label htmlFor={fieldId}>{strings.tag}</Label>
                                <TextInput
                                    id={fieldId}
                                    value={tag}
                                    status={status}
                                    onChange={(event) => {
                                        setTag(event.target.value);
                                        setInvalid(false);
                                    }}
                                />
                                {invalid && <p role="alert">{strings.invalid}</p>}
                            </>
                        )}
                        {languages.length > 0 && (
                            <fieldset>
                                <legend>{strings.tag}</legend>
                                {languages.map((offered) => (
                                    <label key={offered}>
                                        <input
                                            type="radio"
                                            name="language"
                                            value={offered}
                                            checked={tag === offered}
                                            onChange={() => {
                                                setTag(offered);
                                                setInvalid(false);
                                            }}
                                        />
                                        {labelOf(offered, locale)}
                                    </label>
                                ))}
                                {invalid && <p role="alert">{strings.invalid}</p>}
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
                    </form>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button emphasis="default" onPress={() => close(false)}>
                        {strings.cancel}
                    </Button>
                    <Button emphasis="default" onPress={remove}>
                        {strings.remove}
                    </Button>
                    <Button type="submit" form={formId} emphasis="strong">
                        {strings.apply}
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    );
};
