import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMicrophone20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMicrophone20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.5 6v3a1.5 1.5 0 0 1-3 0V6a1.5 1.5 0 1 1 3 0ZM7 6a3 3 0 0 1 6 0v3a3 3 0 1 1-6 0V6ZM5.75 9a.75.75 0 0 0-1.5 0c0 1.218.592 2.637 1.56 3.744.839.958 2.014 1.744 3.44 1.952v.804h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-.804c1.426-.209 2.601-.994 3.44-1.952.968-1.107 1.56-2.526 1.56-3.744a.75.75 0 0 0-1.5 0c0 .782-.408 1.863-1.19 2.756-.768.879-1.826 1.494-3.06 1.494s-2.292-.615-3.06-1.494C6.157 10.863 5.75 9.782 5.75 9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMicrophone20);
