import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlus12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPlus12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 1a.5.5 0 0 0-1 0v4H1a.5.5 0 0 0 0 1h4v4a.5.5 0 0 0 1 0V6h4a.5.5 0 0 0 0-1H6V1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlus12);
