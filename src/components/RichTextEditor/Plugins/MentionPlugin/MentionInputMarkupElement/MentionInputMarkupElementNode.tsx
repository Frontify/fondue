/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MentionInputElement, MentionInputElementProps, Value } from '@udecode/plate';
import { MentionInputMarkupElementStyles } from './MentionInputMarkupElementStyles';

export const MentionInputMarkupElementNode = (props: MentionInputElementProps<Value>) => (
    <MentionInputElement {...props} styles={MentionInputMarkupElementStyles} />
);
