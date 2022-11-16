import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBar20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconBar20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.5 7.5h-13a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1ZM3.5 6A2.5 2.5 0 0 0 1 8.5v3A2.5 2.5 0 0 0 3.5 14h13a2.5 2.5 0 0 0 2.5-2.5v-3A2.5 2.5 0 0 0 16.5 6h-13Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBar20);
