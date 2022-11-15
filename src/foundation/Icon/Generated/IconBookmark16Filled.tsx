import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBookmark16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconBookmark16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M2 3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11a1 1 0 0 1-1.6.8L8 11.5l-4.4 3.3A1 1 0 0 1 2 14V3Z"
            />
        </svg>
    );
}
export default memo(IconBookmark16Filled);
