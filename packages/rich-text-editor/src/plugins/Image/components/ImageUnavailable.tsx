/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent } from 'react';

import { type Unavailable } from '#/model';

/**
 * The "Image unavailable" placeholder with the label isolated for bidirectional text, as the editor, the reader and
 * `toHTML` show it; `hidden` beside an image until that image fails to load.
 */
export const ImageUnavailable = ({
    unavailable: { message, label },
    hidden = false,
    className,
    onMouseDown,
}: {
    unavailable: Unavailable;
    hidden?: boolean;
    className?: string | undefined;
    onMouseDown?: (event: MouseEvent) => void;
}) => (
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- in the editor a press selects the node as on any atom; the keyboard selects it with the arrows.
    <span
        className={className}
        data-rte-image-unavailable=""
        data-rte-message="image-unavailable"
        hidden={hidden}
        onMouseDown={onMouseDown}
    >
        {label === '' ? message : `${message} `}
        {label !== '' && <bdi>{label}</bdi>}
    </span>
);
