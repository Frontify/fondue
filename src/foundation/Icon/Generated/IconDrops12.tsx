import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDrops12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDrops12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2.5 9.5A.5.5 0 0 1 3 9h6a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5ZM4 11a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDrops12);
