import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDroplet32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDroplet32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M23 20a7 7 0 1 1-14 0c0-4.383 1.986-8.216 4.1-11.04a27.6 27.6 0 0 1 2.883-3.267L16 5.676l.017.017a27.6 27.6 0 0 1 2.882 3.267C21.015 11.784 23 15.616 23 20Zm2 0a9 9 0 1 1-18 0c0-9.97 9-17 9-17s9 7.03 9 17Zm-11 3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDroplet32);
