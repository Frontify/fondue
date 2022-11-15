import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCaretRight24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCaretRight24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.69 4.22a.75.75 0 0 1 1.06 0L16 11.47l.53.53-.53.53-7.25 7.25a.75.75 0 0 1-1.06-1.06L14.41 12 7.69 5.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCaretRight24);
