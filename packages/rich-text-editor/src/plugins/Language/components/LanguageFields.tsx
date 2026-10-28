/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Label, RadioList, SegmentedControl, Text, TextInput } from '@frontify/fondue-components';

import { directionLabel, directions, labelOf } from '../helpers/languageModel';
import { type LanguageState } from '../hooks/useLanguageState';
import styles from '../styles/language.module.scss';

// The segmented control ignores an empty value, so "no direction" gets a name of its own.
const NO_DIRECTION = 'none';

export type TagFieldProps = { state: LanguageState };

/** The typed tag field, shown when the option lists no languages. */
export const TagField = ({ state }: TagFieldProps) => {
    const { strings, tag, invalid, ids } = state;
    let status: 'error' | 'neutral' = 'neutral';
    let describedBy: { 'aria-describedby'?: string } = {};
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

TagField.displayName = 'TagField';

export type LanguageRadiosProps = { state: LanguageState };

/** The radio group of offered languages. */
export const LanguageRadios = ({ state }: LanguageRadiosProps) => {
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
        // RadioList.Root takes no invalid or error props, so it renders onto this div, which carries them.
        <RadioList.Root asChild aria-labelledby={ids.legend} value={tag} onValueChange={state.chooseTag}>
            <div
                ref={state.focusOnce}
                className={styles.languages}
                aria-invalid={invalid || undefined}
                aria-errormessage={errorMessage}
            >
                <Text id={ids.legend} weight="strong" size="small">
                    {strings.tag}
                </Text>
                <div className={styles.options}>
                    {offered.map((option) => (
                        <div key={option} className={styles.option}>
                            <RadioList.RadioButton
                                id={`${ids.legend}-${option}`}
                                value={option}
                                aria-describedby={option === invalidOption ? ids.error : undefined}
                                // Radix radios swallow Enter, which a native radio lets submit the form.
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        state.apply(event);
                                    }
                                }}
                            />
                            <Label htmlFor={`${ids.legend}-${option}`}>{labelOf(option, state.locale)}</Label>
                        </div>
                    ))}
                </div>
                {invalid && <p id={ids.error}>{strings.invalid}</p>}
            </div>
        </RadioList.Root>
    );
};

LanguageRadios.displayName = 'LanguageRadios';

export type DirectionSelectProps = { state: LanguageState };

/** The text direction control. */
export const DirectionSelect = ({ state }: DirectionSelectProps) => (
    <>
        {/* A radio group takes no `label for`, so its name is Fondue's group label text, as in RadioList's stories. */}
        <Text id={state.ids.directionLabel} weight="strong" size="small">
            {state.strings.direction}
        </Text>
        <SegmentedControl.Root
            id={state.ids.direction}
            aria-labelledby={state.ids.directionLabel}
            hugWidth={false}
            value={state.dir === '' ? NO_DIRECTION : state.dir}
            onValueChange={(next) => state.setDir(next === NO_DIRECTION ? '' : next)}
        >
            {directions.map((option) => (
                <SegmentedControl.Item key={option.value} value={option.value === '' ? NO_DIRECTION : option.value}>
                    {directionLabel(option.value, state.strings)}
                </SegmentedControl.Item>
            ))}
        </SegmentedControl.Root>
    </>
);
DirectionSelect.displayName = 'DirectionSelect';
