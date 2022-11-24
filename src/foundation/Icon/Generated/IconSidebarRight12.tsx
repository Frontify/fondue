import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSidebarRight12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconSidebarRight12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 2h2.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H8V2ZM7 2H1.5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5H7V2Zm-7 .5A1.5 1.5 0 0 1 1.5 1h9A1.5 1.5 0 0 1 12 2.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 0 9.5v-7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconSidebarRight12);
