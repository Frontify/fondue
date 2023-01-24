import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconGradient32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconGradient32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 16.914v3.258L15.243 9.929a1 1 0 1 1 1.414 1.414L5.343 22.657a.998.998 0 0 1-.177.141A2 2 0 0 0 7 24h.172l8.07-8.071a1 1 0 0 1 1.415 1.414L10 24h3.086l2.207-2.207a1 1 0 0 1 1.414 1.414l-.793.793H25a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H13.914L5 16.914ZM13.5 6H25a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h6.5ZM5 14.086V10a2 2 0 0 1 2-2h4.086L5 14.086Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconGradient32);
