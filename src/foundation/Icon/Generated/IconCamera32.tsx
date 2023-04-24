import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCamera32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCamera32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 11h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Zm-4 2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1.308l4.858-2.777a1 1 0 0 1 1.496.871l-.023 7.225a1 1 0 0 1-1.5.863L21 17.7V19a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-6Zm17.063 3.004 3.274 1.89.012-3.768-3.286 1.878Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCamera32);
