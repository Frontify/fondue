import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTypography24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTypography24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.75 4h15v2.528a.75.75 0 0 1-1.5 0V5.5H13v13h2.25a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5h2.25v-13H6.25v1.028a.75.75 0 0 1-1.5 0V4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTypography24);
