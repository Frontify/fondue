/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getPluginType } from '@udecode/plate-core';

import { ListToolbarButton } from '@components/RichTextEditor/Plugins/ListPlugin/ListToolbarButton';
import { getTooltip } from '@components/RichTextEditor/helpers';
import IconListNumbers16 from '@foundation/Icon/Generated/IconListNumbers16';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const OrderedListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton tooltip={getTooltip('Ordered list')} nodeType={getPluginType(editor, id)}>
            <IconStylingWrapper icon={<IconListNumbers16 />} />
        </ListToolbarButton>
    </ButtonWrapper>
);
