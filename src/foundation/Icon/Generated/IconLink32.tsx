import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLink32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLink32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 16a6 6 0 0 1 6-6h3a1 1 0 1 1 0 2H9a4 4 0 0 0 0 8h3a1 1 0 1 1 0 2H9a6 6 0 0 1-6-6Zm26 0a6 6 0 0 1-6 6h-3a1 1 0 1 1 0-2h3a4 4 0 0 0 0-8h-3a1 1 0 1 1 0-2h3a6 6 0 0 1 6 6Zm-18-1a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2H11Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLink32);
