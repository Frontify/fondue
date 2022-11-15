import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowExpand20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconArrowExpand20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.75 3a.75.75 0 0 0 0 1.5h3.69l-3.47 3.47a.75.75 0 0 0 1.06 1.06l3.47-3.47v3.69h.75-.75a.75.75 0 0 0 1.5 0h-.75.75V3h-6.25Zm-1.72 7.97a.75.75 0 0 1 0 1.06L5.56 15.5h3.19a.75.75 0 0 1 0 1.5H3v-5.75h1.5v3.19l3.47-3.47a.75.75 0 0 1 1.06 0Zm-5.28.28H3a.75.75 0 0 1 1.5 0h-.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowExpand20);
