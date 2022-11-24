import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLollipop20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLollipop20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.5 13.5V7a4.5 4.5 0 1 0-9 0v6.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1Zm-8 2.5h1.357v.857a2.143 2.143 0 1 0 4.286 0V16H13.5a2.5 2.5 0 0 0 2.5-2.5V7A6 6 0 0 0 4 7v6.5A2.5 2.5 0 0 0 6.5 16Zm2.857.857V16h1.286v.857a.643.643 0 1 1-1.286 0ZM8.25 5.5a.75.75 0 0 1 .75.75v5.7a.75.75 0 0 1-1.5 0v-5.7a.75.75 0 0 1 .75-.75Zm3.5 0a.75.75 0 0 1 .75.75v5.7a.75.75 0 0 1-1.5 0v-5.7a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLollipop20);
