import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowMinimize16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconArrowMinimize16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m10.707 6 3.147-3.146a.5.5 0 0 0-.708-.708L10 5.293V3h-.5.5a.5.5 0 0 0-1 0h.5H9v4h4a.5.5 0 0 0 0-1h-2.293Zm-5.46 4-3.103 3.149a.5.5 0 0 0 .712.702L6 10.661V13h.5H6a.5.5 0 0 0 1 0h-.5.5V9H3a.5.5 0 0 0 0 1h2.248Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowMinimize16);
