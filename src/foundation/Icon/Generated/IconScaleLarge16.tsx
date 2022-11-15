import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScaleLarge16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconScaleLarge16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 3H5v10h3V3Zm1 0v10h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H9ZM3 3h1v10H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm0-1a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScaleLarge16);
