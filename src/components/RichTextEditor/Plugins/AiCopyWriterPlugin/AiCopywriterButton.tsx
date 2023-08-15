/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import { IconRocket16 } from '@foundation/Icon/Generated';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../helper';
import { AiCopywriterDropdown } from './AiCopywriterDropdown';
import { AiCopywriterButtonProps } from './AiCopywriterDropdown/types';

export const AiCopywriterButton = ({ editor, id, aiCopywriters }: AiCopywriterButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            key={id}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconRocket16 />} />}
            classNames={getButtonClassNames()}
            styles={buttonStyles}
            onClick={(event) => event.preventDefault()}
        />
        <AiCopywriterDropdown editorId={editor.id} aiCopywriters={aiCopywriters} />
    </ButtonWrapper>
);
