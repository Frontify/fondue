import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCaretUp24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCaretUp24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.22 16.31a.75.75 0 0 1 0-1.06L11.47 8l.53-.53.53.53 7.25 7.25a.75.75 0 0 1-1.06 1.06L12 9.59l-6.72 6.72a.75.75 0 0 1-1.06 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCaretUp24);
