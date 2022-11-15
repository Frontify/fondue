import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLink16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLink16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1 8a3 3 0 0 1 3-3h2a.5.5 0 0 1 0 1H4a2 2 0 1 0 0 4h2a.5.5 0 0 1 0 1H4a3 3 0 0 1-3-3Zm14 0a3 3 0 0 1-3 3h-2a.5.5 0 0 1 0-1h2a2 2 0 1 0 0-4h-2a.5.5 0 0 1 0-1h2a3 3 0 0 1 3 3Zm-9.125-.5a.5.5 0 0 0 0 1h4.25a.5.5 0 0 0 0-1h-4.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLink16);
