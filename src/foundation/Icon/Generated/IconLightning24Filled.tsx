import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLightning24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLightning24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="m13.78 3.084-9.734 9.73c-.629.63-.185 1.705.705 1.707l5.437.016-1.885 5.403c-.35 1.003.9 1.787 1.652 1.036l10-9.998c.63-.63.184-1.707-.707-1.707h-5.581l1.766-5.156c.343-1.003-.904-1.78-1.653-1.031Z"
            />
        </svg>
    );
}
export default memo(IconLightning24Filled);
