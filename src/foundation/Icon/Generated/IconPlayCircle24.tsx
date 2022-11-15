import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlayCircle24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPlayCircle24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.5 12a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Zm1.5 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10ZM10.17 9.287a.25.25 0 0 1 .38-.213l4.557 2.798a.25.25 0 0 1-.004.428l-4.557 2.67a.25.25 0 0 1-.376-.215V9.287Zm1.165-1.491C10.17 7.08 8.67 7.919 8.67 9.287v5.468c0 1.352 1.468 2.193 2.635 1.51l4.556-2.67a1.75 1.75 0 0 0 .03-3.002l-4.556-2.797Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlayCircle24);
