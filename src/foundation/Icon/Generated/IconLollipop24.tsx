import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLollipop24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLollipop24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.5 15.061V9a5.5 5.5 0 1 0-11 0v6.061c0 .795.644 1.439 1.439 1.439h8.122c.795 0 1.439-.644 1.439-1.439ZM7.939 18H9.5v1.5a2.5 2.5 0 0 0 5 0V18h1.561A2.939 2.939 0 0 0 19 15.061V9A7 7 0 1 0 5 9v6.061A2.939 2.939 0 0 0 7.939 18ZM11 19.5V18h2v1.5a1 1 0 1 1-2 0ZM9.75 7a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5A.75.75 0 0 1 9.75 7Zm4.5 0a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLollipop24);
