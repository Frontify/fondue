import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowMinimize24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconArrowMinimize24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.03 5.03a.75.75 0 0 0-1.06-1.06L14 8.94V4.75h-.75.75a.75.75 0 0 0-1.5 0h.75-.75v6.75h6.75a.75.75 0 0 0 0-1.5h-4.19l4.97-4.97Zm-16.06 15a.75.75 0 0 1 0-1.06L8.94 14H4.75a.75.75 0 0 1 0-1.5h6.75v6.75H10v-4.19l-4.97 4.97a.75.75 0 0 1-1.06 0Zm6.78-.78h.75a.75.75 0 0 1-1.5 0h.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowMinimize24);
