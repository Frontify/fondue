/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorDialog } from '#/bridge/define';
import { type EditorApi, type OverlayProps, useEditorApi } from '#/bridge/plugin';

import { SearchPicker } from './SearchPicker';
import { useSearchDialogState } from './useSearchDialogState';

/**
 * The mention search dialog: a search combobox over a listbox of the host's references, as the WAI-ARIA combobox
 * pattern has it, which inserts the chosen result as a mention at the target captured when the dialog opened. Focus
 * stays in the field; the arrows move the active option and Enter or a click chooses it. Cancel and Escape change
 * nothing and return focus to `opener`.
 */
const SearchDialog = ({
    api,
    resourceTypes,
    opener,
    onClose,
}: {
    readonly api: EditorApi;
    readonly resourceTypes: readonly string[];
    /** The element that had focus when the dialog opened, which Cancel and Escape return focus to. */
    readonly opener: Element | null;
    readonly onClose: () => void;
}) => {
    const state = useSearchDialogState(api, resourceTypes, opener, onClose);
    const { strings, testId } = state;

    return (
        <EditorDialog
            dialog={state.dialog}
            title={strings.title}
            cancel={strings.cancel}
            testId={`${testId}-mention-search`}
        >
            <SearchPicker state={state} />
        </EditorDialog>
    );
};

/** The dialog the Mention button opens, once the session is ready, over the host's references of `resourceTypes`. */
export const MentionSearchDialog = ({
    resourceTypes,
    close,
    opener,
}: OverlayProps & { readonly resourceTypes: readonly string[] }) => {
    const api = useEditorApi();
    if (api === undefined) {
        return null;
    }

    return <SearchDialog api={api} resourceTypes={resourceTypes} opener={opener} onClose={close} />;
};
