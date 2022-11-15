import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTextOutdent16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextOutdent16"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                d="M2.5 3.5h11m-11 3h7m-7 6h11m-11-3h7m3.96-3.094-1.768 1.768 1.768 1.768"
            />
        </svg>
    );
}
export default memo(IconTextOutdent16);
