/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@foundation/Icon';
import { getPreventDefaultHandler, usePlateEditorState } from '@udecode/plate-core';
import { merge } from '@utilities/merge';
import React from 'react';
import { useSelectedTextStyles } from '../hooks/useSelectedTextStyles';
import { AvailableTextStyles } from '../types';
import { textStyleTitles } from '../utils/textStyles';

type DropdownTriggerProps = {
    editorId?: string;
    open: boolean;
};
const DEFAULT_TEXTSTYLE_VALUE = 'Mixed';

export enum ListStyles {
    UL = 'ul',
    OL = 'ol',
    CHECKLIST_ITEM = 'checkbox_item',
}

const listTitle: Record<ListStyles, string> = {
    [ListStyles.UL]: 'Bullet List',
    [ListStyles.OL]: 'List',
    [ListStyles.CHECKLIST_ITEM]: 'Checklist',
};

const TEXT_STYLE_TITLES: Record<AvailableTextStyles, string> = { ...listTitle, ...textStyleTitles };

export const DropdownTrigger = ({ editorId, open }: DropdownTriggerProps) => {
    const editor = usePlateEditorState(editorId);
    const selectedTextStyles = useSelectedTextStyles(editorId);

    const label = selectedTextStyles.length === 1 ? TEXT_STYLE_TITLES[selectedTextStyles[0]] : DEFAULT_TEXTSTYLE_VALUE;

    return (
        <button
            data-test-id="textstyle-dropdown-trigger"
            type="button"
            className="tw-cursor-pointer tw-h-12 tw-w-full"
            onMouseDown={editor ? getPreventDefaultHandler() : undefined}
        >
            <div
                className={merge([
                    'tw-relative tw-inline-flex tw-flex-row tw-items-center tw-justify-between tw-overflow-hidden tw-text-text tw-rounded tw-gap-1 tw-p-2 hover:tw-text-text hover:tw-bg-box-neutral tw-h-8 tw-w-28',
                    open && 'tw-bg-box-neutral',
                ])}
            >
                <span className="tw-text-s tw-truncate">{label}</span>
                <div className={merge(['tw-transition-transform', open && 'tw-rotate-180'])}>
                    <IconCaretDown />
                </div>
            </div>
        </button>
    );
};
