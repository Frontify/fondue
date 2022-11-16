import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMagnifier16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMagnifier16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.01 7.51a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-1.27 4.936a6.5 6.5 0 1 1 .707-.707l2.156 2.157a.5.5 0 0 1-.707.707l-2.157-2.157Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMagnifier16);
