import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconButton32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconButton32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 10h19a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.09l2.109 1.454A3.998 3.998 0 0 0 29 14v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h7v-2H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Zm10.6 2.5a1 1 0 0 0-1.568.822l-.01 10.736a1 1 0 0 0 1.76.65l3.238-3.79 4.958-.513a1 1 0 0 0 .464-1.818L16.6 12.5Zm2.158 6.814-1.734 2.031.006-6.12 5.042 3.47-2.656.274a1 1 0 0 0-.658.345Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconButton32);
