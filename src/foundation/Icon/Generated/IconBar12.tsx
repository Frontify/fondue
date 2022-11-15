import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBar12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconBar12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.5 4h-9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5Zm-9-1A1.5 1.5 0 0 0 0 4.5v3A1.5 1.5 0 0 0 1.5 9h9A1.5 1.5 0 0 0 12 7.5v-3A1.5 1.5 0 0 0 10.5 3h-9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBar12);
