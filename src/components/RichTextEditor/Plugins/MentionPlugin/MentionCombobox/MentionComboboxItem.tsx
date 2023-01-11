/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { ComboboxItemProps } from '@udecode/plate';
import { MentionItemData, MentionableCategory } from '../types';
import { IconPeople, IconPerson, IconSize, IconTarget } from '@foundation/Icon';

type RenderAvatarProps = {
    category: MentionableCategory;
    text: string;
    id: string;
    image?: string;
};

const RenderImage = ({ image, category, text, id }: RenderAvatarProps) => {
    if (image) {
        return <img src={image} alt={`${id}-${category}-${text}`} />;
    }

    switch (category) {
        case MentionableCategory.GROUP:
            return <IconPeople size={IconSize.Size12} />;
        case MentionableCategory.ALL:
            return <IconTarget size={IconSize.Size12} />;
        default:
            return <IconPerson size={IconSize.Size12} />;
    }
};

export const MentionComboboxItem = ({ item }: ComboboxItemProps<MentionItemData>): ReactElement => {
    const {
        data: { image, category },
        key,
        text,
    } = item;

    return (
        <div className="tw-flex tw-items-center tw-w-full tw-min-h-[inherit]">
            <span className="tw-flex tw-items-center tw-justify-center tw-rounded-full tw-mr-2.5 tw-bg-base-alt tw-border tw-border-line-weak tw-w-[22px] tw-h-[22px] tw-shrink-0 tw-overflow-hidden group-hover:tw-border-base group-aria-selected:tw-border-base">
                <RenderImage image={image} category={category} text={text} id={key} />
            </span>
            <span className="tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis">{text}</span>
        </div>
    );
};
