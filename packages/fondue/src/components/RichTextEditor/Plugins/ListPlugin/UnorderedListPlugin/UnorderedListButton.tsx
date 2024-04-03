/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getPluginType } from '@udecode/plate-core';

import { ListToolbarButton } from '@components/RichTextEditor/Plugins/ListPlugin/ListToolbarButton';
import { getTooltip } from '@components/RichTextEditor/helpers';
import IconListBullet16 from '@foundation/Icon/Generated/IconListBullet16';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const UnorderedListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton tooltip={getTooltip('Bullet list')} nodeType={getPluginType(editor, id)}>
            <IconStylingWrapper icon={<IconListBullet16 />} />
        </ListToolbarButton>
    </ButtonWrapper>
);
