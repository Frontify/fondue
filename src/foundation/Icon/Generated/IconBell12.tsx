import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBell12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconBell12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 1a1 1 0 0 1 2 0v.626c1.725.444 3 2.01 3 3.874V10h.5a.5.5 0 0 1 0 1H7a1 1 0 1 1-2 0H1.5a.5.5 0 0 1 0-1H2V5.5a4.002 4.002 0 0 1 3-3.874V1Zm1 9h3V5.5a3 3 0 0 0-6 0V10h3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBell12);
