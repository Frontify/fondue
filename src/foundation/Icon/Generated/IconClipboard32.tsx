import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconClipboard32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconClipboard32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13 3a2 2 0 0 0-2 2H9a4 4 0 0 0-4 4v15a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4h-2a2 2 0 0 0-2-2h-6ZM9 7h2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm4 0V5h6v2h-6Zm3 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconClipboard32);
