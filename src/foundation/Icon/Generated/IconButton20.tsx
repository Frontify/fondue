import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconButton20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconButton20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 5.5h12A1.5 1.5 0 0 1 17.5 7v3c0 .51-.254.96-.643 1.231l1.275.88A2.99 2.99 0 0 0 19 10V7a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3h3.5v-1.5H4A1.5 1.5 0 0 1 2.5 10V7A1.5 1.5 0 0 1 4 5.5Zm6.117 2.776a.75.75 0 0 0-1.175.617l-.008 7.515a.75.75 0 0 0 1.32.488l2.254-2.639 3.451-.356a.75.75 0 0 0 .348-1.364l-6.19-4.26Zm1.445 4.78-1.126 1.317.004-4.053 3.34 2.298-1.725.178a.75.75 0 0 0-.493.26Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconButton20);
