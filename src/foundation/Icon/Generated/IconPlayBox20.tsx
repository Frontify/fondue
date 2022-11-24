import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlayBox20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPlayBox20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.5 4.5h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1ZM1 5.5A2.5 2.5 0 0 1 3.5 3h13A2.5 2.5 0 0 1 19 5.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 1 14.5v-9Zm7.336.87a.75.75 0 0 0-1.104.662v6.018a.75.75 0 0 0 1.114.655l5.516-3.066a.75.75 0 0 0-.01-1.317L8.336 6.371Zm3.595 3.626-3.2 1.779V8.284l3.2 1.712Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlayBox20);
