import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlusCircle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlusCircle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16 26c5.523 0 10-4.477 10-10S21.523 6 16 6 6 10.477 6 16s4.477 10 10 10Zm0 2c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12Zm-5.972-11.95a1 1 0 0 1 1-1h4v-4a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlusCircle32);
