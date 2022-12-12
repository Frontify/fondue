import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFixedWidth24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconFixedWidth24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.75 5.25A.75.75 0 0 1 4.5 6v12.002a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75ZM17 12a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1 0-1.5h8.5A.75.75 0 0 1 17 12Zm4.003-6a.75.75 0 0 0-1.5 0v12.002a.75.75 0 0 0 1.5 0V6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFixedWidth24);
