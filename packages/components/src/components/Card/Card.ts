/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef } from 'react';

import {
    CardAction,
    CardActionButton,
    ForwardedRefCardAction,
    type CardActionButtonProps,
    type CardActionProps,
} from './CardAction';
import {
    CardBanner,
    CardBannerIcon,
    CardBannerImage,
    type CardBannerFit,
    type CardBannerIconProps,
    type CardBannerIconVariant,
    type CardBannerImageProps,
    type CardBannerProps,
    type CardBannerSize,
} from './CardBanner';
import {
    CardBadges,
    CardDescription,
    CardThumbnailIcon,
    CardThumbnailImage,
    CardTitle,
    type CardBadgesProps,
    type CardDescriptionProps,
    type CardThumbnailIconProps,
    type CardThumbnailImageProps,
    type CardTitleProps,
} from './CardContent';
import { CardRoot, type CardRootProps } from './CardRoot';

export {
    CardAction,
    CardActionButton,
    CardBadges,
    CardBanner,
    CardBannerIcon,
    CardBannerImage,
    CardDescription,
    CardRoot,
    CardThumbnailIcon,
    CardThumbnailImage,
    CardTitle,
    ForwardedRefCardAction,
};

export type {
    CardActionButtonProps,
    CardActionProps,
    CardBadgesProps,
    CardBannerFit,
    CardBannerIconProps,
    CardBannerIconVariant,
    CardBannerImageProps,
    CardBannerProps,
    CardBannerSize,
    CardDescriptionProps,
    CardRootProps,
    CardThumbnailIconProps,
    CardThumbnailImageProps,
    CardTitleProps,
};

export const Card = {
    Root: forwardRef<HTMLDivElement, CardRootProps>(CardRoot),
    Banner: forwardRef<HTMLDivElement, CardBannerProps>(CardBanner),
    BannerImage: forwardRef<HTMLImageElement, CardBannerImageProps>(CardBannerImage),
    BannerIcon: forwardRef<HTMLDivElement, CardBannerIconProps>(CardBannerIcon),
    Badges: forwardRef<HTMLDivElement, CardBadgesProps>(CardBadges),
    ThumbnailImage: forwardRef<HTMLImageElement, CardThumbnailImageProps>(CardThumbnailImage),
    ThumbnailIcon: forwardRef<HTMLDivElement, CardThumbnailIconProps>(CardThumbnailIcon),
    Title: forwardRef<HTMLDivElement, CardTitleProps>(CardTitle),
    Description: forwardRef<HTMLDivElement, CardDescriptionProps>(CardDescription),
    Action: ForwardedRefCardAction,
    ActionButton: forwardRef<HTMLButtonElement, CardActionButtonProps>(CardActionButton),
};
