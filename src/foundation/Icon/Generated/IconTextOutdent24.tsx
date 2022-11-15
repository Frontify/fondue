import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTextOutdent24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTextOutdent24"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={1.5}
                d="M20.244 6.75H3.775m10.469 7H3.775m10.469-3.5H3.775m16.475 7H3.775M20.15 9.525 17.676 12l2.474 2.475"
            />
        </svg>
    );
}
export default memo(IconTextOutdent24);
