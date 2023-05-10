/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';

import React, { FocusEvent, ReactElement, ReactNode } from 'react';
import { InputExtraAction } from '@internal/inputs/InputExtraActions';
import { TextareaField } from '@components/TextareaField';

export type TextareaProps = {
    id?: string;
    value?: string;
    required?: boolean;
    decorator?: ReactNode;
    placeholder?: string;
    disabled?: boolean;
    onInput?: (value: string) => void;
    onBlur?: (value: string) => void;
    onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
    validation?: Validation;
    /** When autosize if false, this is used as 'rows' property for standard textarea */
    minRows?: number;
    /** When autosize if false, this property is ignored */
    maxRows?: number;
    autosize?: boolean;
    resizeable?: boolean;
    selectable?: boolean;
    readOnly?: boolean;
    extraActions?: InputExtraAction[];
};

export const Textarea = ({ ...props }: TextareaProps): ReactElement => {
    return <TextareaField {...props} />;
};
Textarea.displayName = 'FondueTextarea';
