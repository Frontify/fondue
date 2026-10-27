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
    CardBannerDescription,
    CardBannerIcon,
    CardBannerImage,
    type CardBannerDescriptionProps,
    type CardBannerFit,
    type CardBannerIconProps,
    type CardBannerIconVariant,
    type CardBannerImagePadding,
    type CardBannerImageProps,
    type CardBannerProps,
    type CardBannerSize,
    type CardBannerTone,
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
    CardBannerDescription,
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
    CardBannerDescriptionProps,
    CardBannerFit,
    CardBannerIconProps,
    CardBannerIconVariant,
    CardBannerImagePadding,
    CardBannerImageProps,
    CardBannerProps,
    CardBannerSize,
    CardBannerTone,
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
    BannerDescription: forwardRef<HTMLDivElement, CardBannerDescriptionProps>(CardBannerDescription),
    Badges: forwardRef<HTMLDivElement, CardBadgesProps>(CardBadges),
    ThumbnailImage: forwardRef<HTMLImageElement, CardThumbnailImageProps>(CardThumbnailImage),
    ThumbnailIcon: forwardRef<HTMLDivElement, CardThumbnailIconProps>(CardThumbnailIcon),
    Title: forwardRef<HTMLDivElement, CardTitleProps>(CardTitle),
    Description: forwardRef<HTMLDivElement, CardDescriptionProps>(CardDescription),
    Action: ForwardedRefCardAction,
    ActionButton: forwardRef<HTMLButtonElement, CardActionButtonProps>(CardActionButton),
};
