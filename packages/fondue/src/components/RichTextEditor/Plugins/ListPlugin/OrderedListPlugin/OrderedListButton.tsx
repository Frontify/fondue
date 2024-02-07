/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import IconListNumbers16 from '@foundation/Icon/Generated/IconListNumbers16';
import { ListToolbarButton, getPluginType } from '@udecode/plate';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../../helper';
import { PluginButtonProps } from '../../types';

export const OrderedListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton
            tooltip={getTooltip('Ordered list')}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconListNumbers16 />} />}
            classNames={getButtonClassNames()}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
