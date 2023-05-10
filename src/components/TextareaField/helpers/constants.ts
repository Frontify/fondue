/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';

export const textareaFieldArgs = {
    disabled: false,
    required: false,
    autosize: false,
    resizeable: true,
    selectable: false,
    readOnly: false,
    validation: Validation.Default,
};

export const textareaFieldArgTypes = {
    id: { type: 'string' },
    value: { type: 'string' },
    placeholder: { type: 'string' },
    onInput: { action: 'onInput' },
    onBlur: { action: 'onBlur' },
    onFocus: { action: 'onFocus' },
    validation: {
        options: Object.values(Validation),
        control: { type: 'select' },
    },
    minRows: { type: 'number' },
    maxRows: { type: 'number' },
    disabled: { type: 'boolean' },
    required: { type: 'boolean' },
    autosize: { type: 'boolean' },
    resizeable: { type: 'boolean' },
    selectable: { type: 'boolean' },
    readOnly: { type: 'boolean' },
};
