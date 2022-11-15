import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCardLayoutSmall20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCardLayoutSmall20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.5 8h9a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-9V8ZM6 8H3.5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1H6V8ZM1 9a2.5 2.5 0 0 1 2.5-2.5h13A2.5 2.5 0 0 1 19 9v2a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 1 11V9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCardLayoutSmall20);
