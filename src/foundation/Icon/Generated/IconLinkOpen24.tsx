import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLinkOpen24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLinkOpen24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.75 7.25a4.75 4.75 0 0 0 0 9.5h2a.75.75 0 0 0 0-1.5h-2a3.25 3.25 0 0 1 0-6.5h2a.75.75 0 0 0 0-1.5h-2Zm10.5 9.5a4.75 4.75 0 1 0 0-9.5h-2a.75.75 0 0 0 0 1.5h2a3.25 3.25 0 0 1 0 6.5h-2a.75.75 0 0 0 0 1.5h2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLinkOpen24);
