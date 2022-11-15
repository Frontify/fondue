import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBell16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconBell16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 1c.69 0 1.25.56 1.25 1.25v.908A5.002 5.002 0 0 1 13 8v4h.5a.5.5 0 0 1 0 1H9.25v.75a1.25 1.25 0 1 1-2.5 0V13H2.6a.5.5 0 0 1 0-1H3V8a5.002 5.002 0 0 1 3.75-4.842V2.25C6.75 1.56 7.31 1 8 1ZM6.75 12H12V8a4 4 0 0 0-8 0v4h2.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBell16);
