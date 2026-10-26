/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Label, RadioList, TextInput } from '@frontify/fondue-components';

import { EditorDialog } from '#/bridge/pluginApi/define';
import { type OverlayProps } from '#/bridge/pluginApi/plugin';

import { type AltTextStrings } from '../helpers/dialogStrings';
import { type AltTextState, useAltTextDialogState } from '../hooks/useAltTextDialogState';
import styles from '../styles/media.module.scss';

const options = (strings: AltTextStrings) =>
    [
        { value: 'meaningful', label: strings.meaningful, hint: strings.meaningfulHint },
        { value: 'decorative', label: strings.decorative, hint: strings.decorativeHint },
    ] as const;

const IntentChoice = ({ state, strings }: { state: AltTextState; strings: AltTextStrings }) => {
    const { intent, legendId, radioId, focusChecked, chooseIntent } = state;

    return (
        <div ref={focusChecked} className={styles.choice}>
            <span id={legendId}>{strings.choice}</span>
            <RadioList.Root
                aria-labelledby={legendId}
                value={intent}
                onValueChange={(next) => {
                    if (next === 'meaningful' || next === 'decorative') {
                        chooseIntent(next);
                    }
                }}
            >
                {options(strings).map((option) => (
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
    );
};

const TextField = ({ state, strings }: { state: AltTextState; strings: AltTextStrings }) => {
    const { suggestion, text, invalid, fieldRef, fieldId, errorId, changeText } = state;
    let describedBy: { 'aria-describedby'?: string } = {};
    if (invalid) {
        describedBy = { 'aria-describedby': errorId };
    }

    return (
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
                onChange={(event) => changeText(event.target.value)}
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
                    <Button emphasis="default" size="small" onPress={() => changeText(suggestion)}>
                        {strings.useSuggestion}
                    </Button>
                </p>
            )}
        </>
    );
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
    nodeId: string;
    strings: AltTextStrings;
}) => {
    const state = useAltTextDialogState(nodeId, opener, onClose);

    return (
        <EditorDialog
            dialog={state.dialog}
            title={strings.title}
            cancel={strings.cancel}
            submit={{ label: strings.save, onSubmit: state.save, formClassName: styles.form }}
        >
            <IntentChoice state={state} strings={strings} />
            {state.intent === 'meaningful' && <TextField state={state} strings={strings} />}
        </EditorDialog>
    );
};
