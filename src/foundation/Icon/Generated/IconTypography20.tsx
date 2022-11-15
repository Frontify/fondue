import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTypography20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTypography20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.75 3h15v2.528a.75.75 0 0 1-1.5 0V4.5H11v11h2.25a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5H9.5v-11H4.25v1.028a.75.75 0 0 1-1.5 0V3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTypography20);
