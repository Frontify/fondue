import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFunnel32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconFunnel32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m18 18.375.356-.513 6.284-9.077A.5.5 0 0 0 24.229 8H7.77a.5.5 0 0 0-.41.785l6.283 9.077.356.513v6.017a.5.5 0 0 0 .675.469l3-1.125a.5.5 0 0 0 .325-.469v-4.892ZM20 19l6.284-9.077C27.432 8.265 26.245 6 24.229 6H7.77C5.755 6 4.568 8.265 5.716 9.923L12 19v5.392a2.5 2.5 0 0 0 3.378 2.341l3-1.125A2.5 2.5 0 0 0 20 23.268V19Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFunnel32);
