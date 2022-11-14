import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLink12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLink12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M0 6a3 3 0 0 1 3-3h1a.5.5 0 0 1 0 1H3a2 2 0 1 0 0 4h1a.5.5 0 0 1 0 1H3a3 3 0 0 1-3-3Zm11.963 0a3 3 0 0 1-3 3h-1a.5.5 0 1 1 0-1h1a2 2 0 0 0 0-4h-1a.5.5 0 1 1 0-1h1a3 3 0 0 1 3 3Zm-7.775-.5a.5.5 0 1 0 0 1h3.587a.5.5 0 0 0 0-1H4.188Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLink12);
