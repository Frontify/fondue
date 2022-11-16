import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPointout20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPointout20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.5 4.5h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1ZM1 5.5A2.5 2.5 0 0 1 3.5 3h13A2.5 2.5 0 0 1 19 5.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 1 14.5v-9ZM14.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM16 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPointout20);
