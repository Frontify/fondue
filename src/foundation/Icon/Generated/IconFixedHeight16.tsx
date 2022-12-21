import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFixedHeight16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFixedHeight16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 2a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1H4Zm4 3a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5A.5.5 0 0 1 8 5Zm-4.5 8.5A.5.5 0 0 1 4 13h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFixedHeight16);
