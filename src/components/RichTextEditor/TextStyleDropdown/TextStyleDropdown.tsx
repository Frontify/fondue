/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToolbarDropdown } from '@udecode/plate';
import React, { useCallback, useState } from 'react';
import { DesignTokens } from '../types';
import { TextStyles, textStyleTitles } from '../utils/getTextStyles';
import { DropdownItem } from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';

type TextStyleDropdownProps = {
    editorId?: string;
    designTokens: DesignTokens;
};

export const TextStyleDropdown = ({ editorId, designTokens }: TextStyleDropdownProps) => {
    const [open, setOpen] = useState(false);

    const onToggle = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    return (
        <ToolbarDropdown
            control={<DropdownTrigger editorId={editorId} open={open} />}
            open={open}
            onOpen={onToggle}
            onClose={onToggle}
        >
            <div className="tw-divide-y tw-divide-line">
                <DropdownItem editorId={editorId} type={TextStyles.ELEMENT_HEADING1}>
                    <span style={designTokens.heading1}>{textStyleTitles[TextStyles.ELEMENT_HEADING1]}</span>
                </DropdownItem>
                <DropdownItem editorId={editorId} type={TextStyles.ELEMENT_HEADING2}>
                    <span style={designTokens.heading2}>{textStyleTitles[TextStyles.ELEMENT_HEADING2]}</span>
                </DropdownItem>
                <DropdownItem editorId={editorId} type={TextStyles.ELEMENT_HEADING3}>
                    <span style={designTokens.heading3}>{textStyleTitles[TextStyles.ELEMENT_HEADING3]}</span>
                </DropdownItem>
                <DropdownItem editorId={editorId} type={TextStyles.ELEMENT_HEADING4}>
                    <span style={designTokens.heading4}>{textStyleTitles[TextStyles.ELEMENT_HEADING4]}</span>
                </DropdownItem>
                <DropdownItem editorId={editorId} type={TextStyles.ELEMENT_CUSTOM1}>
                    <span style={designTokens.custom1}>{textStyleTitles[TextStyles.ELEMENT_CUSTOM1]}</span>
                </DropdownItem>
                <DropdownItem editorId={editorId} type={TextStyles.ELEMENT_CUSTOM2}>
                    <span style={designTokens.custom2}>{textStyleTitles[TextStyles.ELEMENT_CUSTOM2]}</span>
                </DropdownItem>
                <DropdownItem editorId={editorId} type={TextStyles.ELEMENT_CUSTOM3}>
                    <span style={designTokens.custom3}>{textStyleTitles[TextStyles.ELEMENT_CUSTOM3]}</span>
                </DropdownItem>
            </div>
        </ToolbarDropdown>
    );
};
