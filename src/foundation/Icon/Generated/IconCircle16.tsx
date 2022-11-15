import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCircle16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCircle16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm0 1A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCircle16);
