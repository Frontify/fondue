/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Label, TextInput } from '@frontify/fondue-components';

import { directionLabel, directions, labelOf } from './language-model';
import styles from './styles/language.module.scss';
import { type LanguageState } from './use-language-state';

/** The typed tag field, shown when the option lists no languages. */
export const TagField = ({ state }: { readonly state: LanguageState }) => {
    const { strings, tag, invalid, ids } = state;
    let status: 'error' | 'neutral' = 'neutral';
    let describedBy: { readonly 'aria-describedby'?: string } = {};
    if (invalid) {
        status = 'error';
        describedBy = { 'aria-describedby': ids.error };
    }
    return (
        <>
            <Label htmlFor={ids.field}>{strings.tag}</Label>
            <TextInput
                ref={state.fieldRef}
                id={ids.field}
                value={tag}
                status={status}
                aria-errormessage={ids.error}
                {...describedBy}
                onChange={(event) => state.chooseTag(event.target.value)}
            />
            {invalid && <p id={ids.error}>{strings.invalid}</p>}
        </>
    );
};

/** The radio group of offered languages. */
export const LanguageRadios = ({ state }: { readonly state: LanguageState }) => {
    const { strings, offered, tag, invalid, ids } = state;
    let errorMessage: string | undefined;
    // The radio a rejected Apply focuses, described by the error: the checked one, else the first. The invalid state stays on
    // the group, since a radio takes no `aria-invalid`.
    let invalidOption: string | undefined;
    if (invalid) {
        errorMessage = ids.error;
        invalidOption = offered.includes(tag) ? tag : offered[0];
    }
    return (
        <fieldset
            ref={state.groupRef}
            role="radiogroup"
            className={styles.languages}
            aria-labelledby={ids.legend}
            aria-invalid={invalid || undefined}
            aria-errormessage={errorMessage}
        >
            <legend id={ids.legend}>{strings.tag}</legend>
            <div className={styles.options}>
                {offered.map((option) => (
                    <label key={option} className={styles.option}>
                        <input
                            ref={option === state.stored ? state.focusOnce : undefined}
                            type="radio"
                            name="language"
                            value={option}
                            checked={tag === option}
                            aria-describedby={option === invalidOption ? ids.error : undefined}
                            onChange={() => state.chooseTag(option)}
                        />
                        {labelOf(option, state.locale)}
                    </label>
                ))}
            </div>
            {invalid && <p id={ids.error}>{strings.invalid}</p>}
        </fieldset>
    );
};

/** The text direction select. */
export const DirectionSelect = ({ state }: { readonly state: LanguageState }) => (
    <>
        <Label htmlFor={state.ids.direction}>{state.strings.direction}</Label>
        <select id={state.ids.direction} value={state.dir} onChange={(event) => state.setDir(event.target.value)}>
            {directions.map((option) => (
                <option key={option.value} value={option.value}>
                    {directionLabel(option.value, state.strings)}
                </option>
            ))}
        </select>
    </>
);
