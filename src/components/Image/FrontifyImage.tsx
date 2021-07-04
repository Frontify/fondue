/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";
import Image from "./Image";

export interface FrontifyImageProps {
    src: string;
    alt?: string;
    roundedCorners?: boolean;
    width?: number;
    onReplaceImage?: () => void;
    onOpenSettings?: () => void;
    onDeleteImage?: () => void;
}

export enum ImageSize {
    Small = 640,
    Medium = 768,
    Large = 1024,
    XLarge = 1280,
    XXLarge = 1536,
}

export default function FrontifyImage({
    src,
    alt,
    roundedCorners = true,
    width = 800,
    onReplaceImage,
    onOpenSettings,
    onDeleteImage,
}: FrontifyImageProps): ReactElement<FrontifyImageProps> {
    return (
        <Image
            src={`${src}?width=${width}`}
            alt={alt}
            roundedCorners={roundedCorners}
            onReplaceImage={onReplaceImage}
            onOpenSettings={onOpenSettings}
            onDeleteImage={onDeleteImage}
        >
            <source
                type="image/webp"
                srcSet={`${src}?format=webp&width=${ImageSize.Small} ${ImageSize.Small}w, ${src}?format=webp&width=${ImageSize.Medium} ${ImageSize.Medium}w, ${src}?format=webp&width=${ImageSize.Large} ${ImageSize.Large}w, ${src}?format=webp&width=${ImageSize.XLarge} ${ImageSize.XLarge}w, ${src}?format=webp&width=${ImageSize.XXLarge} ${ImageSize.XXLarge}w`}
            />
            <source
                srcSet={`${src}?width=${ImageSize.Small} ${ImageSize.Small}w, ${src}?width=${ImageSize.Medium} ${ImageSize.Medium}w, ${src}?width=${ImageSize.Large} ${ImageSize.Large}w, ${src}?width=${ImageSize.XLarge} ${ImageSize.XLarge}w, ${src}?width=${ImageSize.XXLarge} ${ImageSize.XXLarge}w`}
            />
        </Image>
    );
}
