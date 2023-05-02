import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDividerBlank12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDividerBlank12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 0h-7A1.5 1.5 0 0 0 1 1.5v2a.5.5 0 0 0 1 0v-2Zm0 9a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 12h-7A1.5 1.5 0 0 1 1 10.5v-2a.5.5 0 0 1 1 0v2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDividerBlank12);
