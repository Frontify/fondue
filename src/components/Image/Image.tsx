/* (c) Copyright Frontify Ltd., all rights reserved. */

import Button from "@elements/Button/Button";
import { ReactComponent as IconSettings } from "@elements/Icon/Svg/Settings.svg";
import { ReactComponent as IconTrash } from "@elements/Icon/Svg/Trash.svg";
import { PropsWithChildren, ReactElement } from "react";
import css from "./Image.module.css";

export type ImageProps = PropsWithChildren<{
    src: string;
    alt?: string;
    roundedCorners?: boolean;
    onReplaceImage?: () => void;
    onOpenSettings?: () => void;
    onDeleteImage?: () => void;
}>;

export default function Image({
    src,
    alt,
    roundedCorners = true,
    children,
    onReplaceImage,
    onOpenSettings,
    onDeleteImage,
}: ImageProps): ReactElement<ImageProps> {
    const imageClasses = [css.image, ...(roundedCorners ? [css.roundedCorners] : [])].join(" ");

    return (
        <div className={css.container} data-test-id="image-container">
            <picture>
                {children}
                <img className={imageClasses} src={src} alt={alt} />
            </picture>
            {(onReplaceImage || onOpenSettings || onDeleteImage) && (
                <div className={css.controls} data-test-id="image-controls">
                    {onReplaceImage && <Button onClick={onReplaceImage}>Replace...</Button>}
                    {onOpenSettings && (
                        <Button onClick={onOpenSettings}>
                            <IconSettings />
                        </Button>
                    )}
                    {onDeleteImage && (
                        <Button onClick={onDeleteImage}>
                            <IconTrash />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
