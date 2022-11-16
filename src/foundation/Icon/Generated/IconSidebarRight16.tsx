import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSidebarRight16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconSidebarRight16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11 3h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2V3Zm-1 0H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h7V3ZM1 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconSidebarRight16);
