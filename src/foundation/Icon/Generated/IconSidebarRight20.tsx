import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSidebarRight20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconSidebarRight20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.99 4.5h2.51a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-2.51v-11Zm-1.5 0H3.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h8.99v-11ZM1 5.5A2.5 2.5 0 0 1 3.5 3h13A2.5 2.5 0 0 1 19 5.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 1 14.5v-9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconSidebarRight20);
