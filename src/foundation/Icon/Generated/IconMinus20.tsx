import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMinus20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMinus20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 9.75A.75.75 0 0 1 4.75 9h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 9.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMinus20);
