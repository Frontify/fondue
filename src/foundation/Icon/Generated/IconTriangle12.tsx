import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTriangle12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTriangle12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 .5a.5.5 0 0 1 .433.25l5.5 9.5a.5.5 0 0 1-.433.75H.5a.5.5 0 0 1-.433-.75l5.5-9.5A.5.5 0 0 1 6 .5ZM1.367 10h9.266L6 1.998 1.367 10Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTriangle12);
