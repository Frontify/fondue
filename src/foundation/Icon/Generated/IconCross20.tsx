import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCross20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCross20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.756 4.697a.75.75 0 0 0-1.061 1.06L8.938 10l-4.243 4.243a.75.75 0 1 0 1.06 1.06l4.243-4.242 4.597 4.596a.75.75 0 1 0 1.06-1.06L11.06 10l4.596-4.596a.75.75 0 1 0-1.06-1.06L9.997 8.94 5.756 4.697Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCross20);
