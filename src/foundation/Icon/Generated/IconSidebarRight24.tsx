import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSidebarRight24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconSidebarRight24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16 5.5h3A1.5 1.5 0 0 1 20.5 7v10a1.5 1.5 0 0 1-1.5 1.5h-3v-13Zm-1.5 0H5A1.5 1.5 0 0 0 3.5 7v10A1.5 1.5 0 0 0 5 18.5h9.5v-13ZM2 7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconSidebarRight24);
