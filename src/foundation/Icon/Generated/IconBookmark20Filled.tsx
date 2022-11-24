import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBookmark20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconBookmark20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M3 3.5A2.5 2.5 0 0 1 5.5 1h9A2.5 2.5 0 0 1 17 3.5v13.542c0 1.228-1.395 1.936-2.386 1.21L10 14.873l-4.614 3.38c-.99.725-2.386.017-2.386-1.21V3.5Z"
            />
        </svg>
    );
}
export default memo(IconBookmark20Filled);
