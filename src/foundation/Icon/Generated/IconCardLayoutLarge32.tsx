import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCardLayoutLarge32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCardLayoutLarge32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11 8H7a2 2 0 0 0-2 2v8h6V8Zm2 6v4h6v-4h-6Zm0-2h6V8h-6v4Zm8 2v4h6v-4h-6Zm6-2v-2a2 2 0 0 0-2-2h-4v4h6ZM5 23v-3h22v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2ZM7 6a4 4 0 0 0-4 4v13a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4H7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCardLayoutLarge32);
