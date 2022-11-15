import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMasonry20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMasonry20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.5 4.5h4v4.75h-5V5.5a1 1 0 0 1 1-1ZM9 9.25V4.5h7.5a1 1 0 0 1 1 1v3.75H9Zm-6.5 1.5v3.75a1 1 0 0 0 1 1H11v-4.75H2.5Zm10 0v4.75h4a1 1 0 0 0 1-1v-3.75h-5ZM1 5.5A2.5 2.5 0 0 1 3.5 3h13A2.5 2.5 0 0 1 19 5.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 1 14.5v-9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMasonry20);
