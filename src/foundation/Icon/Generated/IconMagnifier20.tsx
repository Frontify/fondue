import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMagnifier20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMagnifier20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.51 9.51a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.543 6.518a8.5 8.5 0 1 1 1.06-1.06l2.667 2.665a.75.75 0 1 1-1.06 1.06l-2.667-2.666Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMagnifier20);
