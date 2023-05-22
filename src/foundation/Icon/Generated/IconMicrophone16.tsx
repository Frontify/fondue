import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMicrophone16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMicrophone16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 4v3.5a1 1 0 0 1-2 0V4a1 1 0 0 1 2 0ZM6 4a2 2 0 1 1 4 0v3.5a2 2 0 1 1-4 0V4ZM4.5 6.5a.5.5 0 0 0-1 0c0 1.071.266 2.308.968 3.29.645.903 1.637 1.561 3.032 1.688V13H6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H8.5v-1.522c1.396-.127 2.388-.785 3.032-1.687.702-.983.968-2.22.968-3.291a.5.5 0 0 0-1 0c0 .929-.234 1.942-.782 2.71-.531.743-1.38 1.29-2.718 1.29s-2.187-.547-2.718-1.29C4.734 8.441 4.5 7.428 4.5 6.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMicrophone16);
