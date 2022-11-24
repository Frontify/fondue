import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBookmark20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconBookmark20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m10 13.014.886.649 4.614 3.38V3.5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1v13.542l4.614-3.38.886-.648Zm0 1.859 4.614 3.38c.99.725 2.386.017 2.386-1.21V3.5A2.5 2.5 0 0 0 14.5 1h-9A2.5 2.5 0 0 0 3 3.5v13.542c0 1.228 1.395 1.936 2.386 1.21L10 14.873Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBookmark20);
