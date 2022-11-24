import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMagnifierPlus16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMagnifierPlus16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.51 13.01a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm4.936-1.27a6.5 6.5 0 1 0-.707.707l2.157 2.156a.5.5 0 0 0 .707-.707l-2.157-2.157ZM8.01 5.51a.5.5 0 0 0-1 0v1.5h-1.5a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0v-1.5h1.5a.5.5 0 0 0 0-1h-1.5v-1.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMagnifierPlus16);
