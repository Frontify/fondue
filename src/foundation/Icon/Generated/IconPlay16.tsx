import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlay16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPlay16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.748 3.04a.5.5 0 0 0-.723.448v8.994a.5.5 0 0 0 .721.449l9.097-4.475a.5.5 0 0 0 .002-.897L3.748 3.041Zm-1.723.448a1.5 1.5 0 0 1 2.168-1.343l9.097 4.519c1.112.552 1.11 2.14-.006 2.689l-9.097 4.475a1.5 1.5 0 0 1-2.162-1.346V3.488Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlay16);
