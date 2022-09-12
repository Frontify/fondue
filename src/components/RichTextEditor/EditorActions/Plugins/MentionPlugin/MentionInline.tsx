/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MentionCombobox } from '@udecode/plate';
import { mentionable } from '@components/RichTextEditor/utils/exampleValues';

export const MentionInline = () => {
    return <MentionCombobox items={mentionable} />;
};
