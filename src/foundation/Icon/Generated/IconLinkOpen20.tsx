import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLinkOpen20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLinkOpen20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.25 5.75a4.25 4.25 0 0 0 0 8.5h2a.75.75 0 0 0 0-1.5h-2a2.75 2.75 0 1 1 0-5.5h2a.75.75 0 0 0 0-1.5h-2Zm9.5 8.5a4.25 4.25 0 0 0 0-8.5h-2a.75.75 0 0 0 0 1.5h2a2.75 2.75 0 1 1 0 5.5h-2a.75.75 0 0 0 0 1.5h2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLinkOpen20);
