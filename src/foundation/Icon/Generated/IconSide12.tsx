import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSide12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconSide12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 2h5.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H5V2ZM4 2H1.5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5H4V2Zm-4 .5A1.5 1.5 0 0 1 1.5 1h9A1.5 1.5 0 0 1 12 2.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 0 9.5v-7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconSide12);
