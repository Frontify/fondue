import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconInfo32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconInfo32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v12h3a1 1 0 1 1 0 2h-8a1 1 0 1 1 0-2h3V14h-3a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconInfo32);
