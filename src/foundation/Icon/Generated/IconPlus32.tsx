import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlus32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlus32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15 17v9a1 1 0 1 0 2 0v-9h9a1 1 0 1 0 0-2h-9V6a1 1 0 1 0-2 0v9H6a1 1 0 1 0 0 2h9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlus32);
