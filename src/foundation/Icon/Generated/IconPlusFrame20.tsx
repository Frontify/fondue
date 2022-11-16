import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlusFrame20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPlusFrame20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.5 3.5h-13a1 1 0 0 0-1 1v1h15v-1a1 1 0 0 0-1-1Zm1 3.5h-15v8.5a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V7Zm-14-5A2.5 2.5 0 0 0 1 4.5v11A2.5 2.5 0 0 0 3.5 18h13a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 16.5 2h-13Zm7.334 7.139a.75.75 0 0 0-1.5 0v1.694H7.639a.75.75 0 0 0 0 1.5h1.695v1.528a.75.75 0 0 0 1.5 0v-1.528h1.527a.75.75 0 0 0 0-1.5h-1.527V9.14Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlusFrame20);
