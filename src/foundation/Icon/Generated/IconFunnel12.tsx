import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFunnel12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFunnel12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m6.5 7.143.226-.276L9.89 3H2.11l3.164 3.867.226.276v2.742l1-.435V7.143Zm1 .357 3.164-3.867A1 1 0 0 0 9.89 2H2.11a1 1 0 0 0-.774 1.633L4.5 7.5v2.385a1 1 0 0 0 1.398.917l1-.434A1 1 0 0 0 7.5 9.45V7.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFunnel12);
