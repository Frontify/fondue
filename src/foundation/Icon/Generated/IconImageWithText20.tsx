import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconImageWithText20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconImageWithText20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.5 4.5h-13a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h1.941l.029-.03 4-4 .32-.321.434.135 7.276 2.274V5.5a1 1 0 0 0-1-1Zm.82 10.573-7.11-2.222L7.56 15.5h8.94c.34 0 .639-.169.82-.427ZM3.5 3A2.5 2.5 0 0 0 1 5.5v9A2.5 2.5 0 0 0 3.5 17h13a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 16.5 3h-13Zm10.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 1.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM4 6.75A.75.75 0 0 1 4.75 6h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 4 6.75ZM4.75 9a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconImageWithText20);
