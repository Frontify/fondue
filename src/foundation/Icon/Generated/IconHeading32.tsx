import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconHeading32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconHeading32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.036 8.01V19H7.11v-4.569h4.082V19h2.072V8.01h-2.072v4.537H7.109V8.01H5.036Zm14.26 1.476V19h2.01V8.01h-3.627l-2.245 4.961h2.103l1.476-3.485h.283ZM5 22a1 1 0 1 0 0 2h22a1 1 0 1 0 0-2H5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconHeading32);
