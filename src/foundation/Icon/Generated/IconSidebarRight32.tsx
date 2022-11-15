import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSidebarRight32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconSidebarRight32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M21 8h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4V8Zm-2 0H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12V8Zm0 18H7a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconSidebarRight32);
