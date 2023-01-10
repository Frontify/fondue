/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ComboboxItemProps } from '@udecode/plate';
import { MentionItemData, MentionableCategory } from '../types';
import { IconPeople, IconPerson, IconSize, IconTarget } from '@foundation/Icon';

type RenderAvatarProps = {
    image: string | undefined;
    category: MentionableCategory;
    text: string;
    id: string;
};

const RenderImage = ({ image, category, text, id }: RenderAvatarProps) => {
    let avatar;
    switch (category) {
        case MentionableCategory.GROUP:
            avatar = <IconPeople size={IconSize.Size12} />;
            break;
        case MentionableCategory.ALL:
            avatar = <IconTarget size={IconSize.Size12} />;
            break;
        default:
            avatar = <IconPerson size={IconSize.Size12} />;
            break;
    }

    return image ? <img src={image} alt={`${id}-${category}-${text}`} /> : avatar;
};

export const MentionComboboxItem = ({ item }: ComboboxItemProps<MentionItemData>): JSX.Element => {
    const {
        data: { image, category },
        key,
        text,
    } = item;

    return (
        <div className="tw-flex tw-items-center tw-w-full tw-min-h-[inherit]">
            <span className="tw-flex tw-items-center tw-justify-center tw-rounded-full tw-mr-2.5 tw-bg-base-alt tw-border tw-border-line-weak tw-w-[22px] tw-h-[22px] tw-shrink-0 group-hover:tw-border-base tw-overflow-hidden">
                <RenderImage image={image} category={category} text={text} id={key} />
            </span>
            <span className="tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis">{text}</span>
        </div>
    );
};
