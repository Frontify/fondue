/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListNumbers } from '@frontify/fondue-icons';
import { getPluginType } from '@udecode/plate-core';

import { ListToolbarButton } from '@components/RichTextEditor/Plugins/ListPlugin/ListToolbarButton';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const OrderedListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton tooltip={getTooltip('Ordered list')} nodeType={getPluginType(editor, id)}>
            <IconStylingWrapper icon={<IconListNumbers size={16} />} />
        </ListToolbarButton>
    </ButtonWrapper>
);
