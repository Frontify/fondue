import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconStar32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconStar32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.906 5.077 16 3.139l-.906 1.938-3.114 6.658-7.104.886-2.15.269 1.599 1.462 5.328 4.874-1.332 7.09-.399 2.123L9.8 27.37l6.2-3.536 6.2 3.536 1.877 1.07-.399-2.124-1.332-7.089 5.329-4.874 1.598-1.462-2.15-.269-7.104-.886-3.113-6.658Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconStar32Filled);
