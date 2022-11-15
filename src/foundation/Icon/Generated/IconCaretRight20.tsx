import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCaretRight20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCaretRight20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.22 3.225a.75.75 0 0 1 1.06 0l6.246 6.245.53.53-.53.531-6.246 6.246a.75.75 0 1 1-1.06-1.06L11.935 10 6.22 4.285a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCaretRight20);
