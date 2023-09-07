/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconTextBrackets16 } from '@foundation/Icon/Generated';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../helper';
import { PluginButtonProps } from '../types';

export const CodeButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip('Code')}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconTextBrackets16 />} />}
            classNames={getButtonClassNames()}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
