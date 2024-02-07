/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import IconTextFormatStrikethrough from '@foundation/Icon/Generated/IconTextFormatStrikethrough';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../helper';
import { PluginButtonProps } from '../types';

export const StrikethroughButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip('Strikethrough')}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconTextFormatStrikethrough />} />}
            classNames={getButtonClassNames()}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
