import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconJohanna20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconJohanna20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm1.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5.5 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm1.5 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconJohanna20);
