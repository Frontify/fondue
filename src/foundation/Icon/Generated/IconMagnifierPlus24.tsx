import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMagnifierPlus24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMagnifierPlus24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11 18.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm6.872-1.688a9 9 0 1 0-1.06 1.06l2.898 2.898a.75.75 0 1 0 1.06-1.06l-2.898-2.898ZM10.25 11.75V14a.75.75 0 0 0 1.5 0v-2.25H14a.75.75 0 0 0 0-1.5h-2.25V8a.75.75 0 0 0-1.5 0v2.25H8a.75.75 0 0 0 0 1.5h2.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMagnifierPlus24);
