/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListBullet } from '@frontify/fondue-icons';
import { getPluginType } from '@udecode/plate-core';

import { ListToolbarButton } from '@components/RichTextEditor/Plugins/ListPlugin/ListToolbarButton';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const UnorderedListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton tooltip={getTooltip('Bullet list')} nodeType={getPluginType(editor, id)}>
            <IconStylingWrapper icon={<IconListBullet size={16} />} />
        </ListToolbarButton>
    </ButtonWrapper>
);
