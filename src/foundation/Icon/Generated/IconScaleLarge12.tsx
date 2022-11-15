import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScaleLarge12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconScaleLarge12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 2H3v8h3V2Zm1 0v8h3.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5H7ZM1.5 2H2v8h-.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5Zm0-1A1.5 1.5 0 0 0 0 2.5v7A1.5 1.5 0 0 0 1.5 11h9A1.5 1.5 0 0 0 12 9.5v-7A1.5 1.5 0 0 0 10.5 1h-9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScaleLarge12);
