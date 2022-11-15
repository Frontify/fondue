import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowOutExternal32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArrowOutExternal32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18 6a1 1 0 1 0 0 2h4.586l-7.293 7.293a1 1 0 0 0 1.414 1.414L24 9.414V14a1 1 0 1 0 2 0V6h-8ZM6 12a4 4 0 0 1 4-4h3a1 1 0 1 1 0 2h-3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3a1 1 0 1 1 2 0v3a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V12Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowOutExternal32);
