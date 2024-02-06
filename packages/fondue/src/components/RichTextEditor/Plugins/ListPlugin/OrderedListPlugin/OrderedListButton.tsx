/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListNumbers16 } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';
import { ListToolbarButton } from '@components/RichTextEditor/Plugins/ListPlugin/ListToolbarButton';
import { getTooltip } from '@components/RichTextEditor/helpers';
import { getPluginType } from '@udecode/plate';

export const OrderedListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton tooltip={getTooltip('Ordered list')} nodeType={getPluginType(editor, id)}>
            <IconStylingWrapper icon={<IconListNumbers16 />} />
        </ListToolbarButton>
    </ButtonWrapper>
);
