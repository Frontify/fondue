import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCross24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCross24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.696 5.99a.75.75 0 1 0-1.06 1.06L10.584 12l-4.95 4.95a.75.75 0 0 0 1.061 1.06l4.95-4.949 5.303 5.303a.75.75 0 0 0 1.06-1.06L12.707 12l5.304-5.303a.75.75 0 1 0-1.061-1.06l-5.303 5.303-4.95-4.95Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCross24);
