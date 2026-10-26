/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';

import { EditorDialog } from '#/bridge/define';
import { type OverlayProps } from '#/bridge/plugin';

import { DirectionSelect, LanguageRadios, TagField } from './LanguageFields';
import styles from './styles/language.module.scss';
import { useLanguageState } from './useLanguageState';

export { SET_LANGUAGE } from './languageModel';

/**
 * Language of a passage: the option's tags, labelled in the UI locale, with a stored tag the option misses first, or
 * a typed tag when the option lists none. Apply runs `mark.language.set` and returns focus to the surface; Remove runs
 * it with `null`. Cancel and Escape return focus to the control that opened the dialog.
 */
export const LanguageDialog = (props: OverlayProps) => {
    const state = useLanguageState(props);
    const { strings } = state;

    return (
        <EditorDialog
            dialog={state.dialog}
            title={strings.title}
            cancel={strings.cancel}
            submit={{ label: strings.apply, onSubmit: state.apply, formClassName: styles.form }}
            actions={
                <Button emphasis="default" onPress={state.remove}>
                    {strings.remove}
                </Button>
            }
        >
            {state.offered.length === 0 && <TagField state={state} />}
            {state.offered.length > 0 && <LanguageRadios state={state} />}
            <DirectionSelect state={state} />
        </EditorDialog>
    );
};
