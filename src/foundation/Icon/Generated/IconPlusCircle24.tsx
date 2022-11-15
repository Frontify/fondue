import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlusCircle24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPlusCircle24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Zm0 1.5c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 1.5 0v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5A.75.75 0 0 1 7 12Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlusCircle24);
