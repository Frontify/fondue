import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCaretLeft20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCaretLeft20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.836 16.777a.75.75 0 0 1-1.06 0L6.53 10.53 6 10l.53-.53 6.246-6.246a.75.75 0 0 1 1.06 1.06L8.121 10l5.715 5.715a.75.75 0 0 1 0 1.06Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCaretLeft20);
