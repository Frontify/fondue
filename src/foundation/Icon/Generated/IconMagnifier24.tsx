import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMagnifier24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMagnifier24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.5 11a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm-1.688 6.872a9 9 0 1 1 1.06-1.06l2.898 2.898a.75.75 0 1 1-1.06 1.06l-2.898-2.898Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMagnifier24);
