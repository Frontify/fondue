import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDrops16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDrops16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 1A5 5 0 1 0 8 1a5 5 0 0 0 0 10Zm-4.5 1.5A.5.5 0 0 1 4 12h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5Zm2 1.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDrops16);
