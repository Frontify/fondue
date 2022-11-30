import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFixedHeight20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFixedHeight20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.3 18a.75.75 0 0 0 0-1.5H4.7a.75.75 0 0 0 0 1.5h10.6ZM10 13.998a.75.75 0 0 1-.75-.75v-6.5a.75.75 0 0 1 1.5 0v6.5a.75.75 0 0 1-.75.75Zm6.05-11.25a.75.75 0 0 1-.75.75H4.7a.75.75 0 0 1 0-1.5h10.6a.75.75 0 0 1 .75.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFixedHeight20);
