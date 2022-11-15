import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBookmark32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconBookmark32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M6 7a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v19.468c0 1.554-1.696 2.514-3.029 1.715L16 24l-6.971 4.183c-1.333.8-3.029-.16-3.029-1.715V7Z"
            />
        </svg>
    );
}
export default memo(IconBookmark32Filled);
