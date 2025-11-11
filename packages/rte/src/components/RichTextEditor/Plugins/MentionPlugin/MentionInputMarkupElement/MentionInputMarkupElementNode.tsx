/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentProps, type ReactElement } from 'react';

import { MentionInputElement } from '@components/RichTextEditor/Plugins/MentionPlugin/MentionInputMarkupElement/MentionInputElement';

export const MentionInputMarkupElementNode = (props: ComponentProps<typeof MentionInputElement>): ReactElement => (
    <MentionInputElement {...props} />
);
