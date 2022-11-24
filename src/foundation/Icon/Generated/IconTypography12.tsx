import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTypography12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTypography12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 1h9v2.027a.5.5 0 0 1-1 0V2H7v8h1.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1H6V2H3v1.027a.5.5 0 0 1-1 0V1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTypography12);
