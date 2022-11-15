import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlusCircle16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPlusCircle16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm0 1A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM5 8.5a.5.5 0 0 1 0-1h2.5V5a.5.5 0 0 1 1 0v2.5H11a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V8.5H5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlusCircle16);
