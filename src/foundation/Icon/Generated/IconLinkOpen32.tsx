import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLinkOpen32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLinkOpen32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 10a6 6 0 0 0 0 12h3a1 1 0 1 0 0-2H9a4 4 0 0 1 0-8h3a1 1 0 1 0 0-2H9Zm14 12a6 6 0 0 0 0-12h-3a1 1 0 1 0 0 2h3a4 4 0 0 1 0 8h-3a1 1 0 1 0 0 2h3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLinkOpen32);
