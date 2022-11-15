import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTypography16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTypography16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 2h11v2.027a.5.5 0 0 1-1 0V3H9v10h2a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1h2V3H4v1.027a.5.5 0 0 1-1 0V2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTypography16);
