import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBell32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconBell32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16 4a2.5 2.5 0 0 1 2.5 2.5v.898A8.004 8.004 0 0 1 24 15v8h1a1 1 0 1 1 0 2h-6.5v.5a2.5 2.5 0 0 1-5 0V25H7a1 1 0 1 1 0-2h1v-8a8.004 8.004 0 0 1 5.5-7.602V6.5A2.5 2.5 0 0 1 16 4Zm-6 19h12v-8a6 6 0 0 0-12 0v8Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBell32);
