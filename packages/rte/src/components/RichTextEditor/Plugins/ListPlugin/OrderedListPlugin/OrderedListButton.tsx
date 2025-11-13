/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getPluginType } from '@udecode/plate-core';

import { ListToolbarButton } from '@components/RichTextEditor/Plugins/ListPlugin/ListToolbarButton';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconListNumbers as IconListNumbers16 } from '@frontify/fondue-icons';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const OrderedListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton tooltip={getTooltip('Ordered list')} nodeType={getPluginType(editor, id)}>
            <IconStylingWrapper icon={<IconListNumbers16 />} />
        </ListToolbarButton>
    </ButtonWrapper>
);
