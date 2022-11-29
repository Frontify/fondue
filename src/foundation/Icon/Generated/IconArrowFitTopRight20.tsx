import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowFitTopRight20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconArrowFitTopRight20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.252 2A2.75 2.75 0 0 1 18 4.75v8.5a.75.75 0 0 1-1.5 0v-8.5c0-.06-.004-.12-.012-.177L4.56 16.5h5.19a.75.75 0 0 1 0 1.5H2v-7.75h1.5v5.19L15.427 3.512a1.26 1.26 0 0 0-.175-.012H6.75a.75.75 0 1 1 0-1.5h8.502ZM2.75 10.25H2a.75.75 0 0 1 1.5 0h-.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowFitTopRight20);
