import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTextOutdent12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextOutdent12"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                d="M1.5 3.5h9m-9 2h5m-5 4h9m-9-2h5m3.906-2.06L9.346 6.5l1.06 1.06"
            />
        </svg>
    );
}
export default memo(IconTextOutdent12);
