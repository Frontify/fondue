import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFlag20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFlag20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 2a.75.75 0 0 0-1.5 0v16A.75.75 0 0 0 5 18v-5h12.16c.88 0 1.33-1.055.722-1.691L14.717 8l3.165-3.309C18.491 4.055 18.04 3 17.16 3H5V2Zm0 2.5v7h10.99l-2.357-2.463L12.641 8l.992-1.037L15.989 4.5H5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFlag20);
