import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFixedHeight12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFixedHeight12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.75 10.5a.5.5 0 0 1-.5.5h-6.5a.5.5 0 0 1 0-1h6.5a.5.5 0 0 1 .5.5ZM6 8.545a.5.5 0 0 1-.5-.5V3.954a.5.5 0 0 1 1 0v4.091a.5.5 0 0 1-.5.5ZM9.25 2a.5.5 0 0 0 0-1h-6.5a.5.5 0 0 0 0 1h6.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFixedHeight12);
