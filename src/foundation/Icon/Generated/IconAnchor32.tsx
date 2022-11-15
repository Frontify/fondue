import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconAnchor32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconAnchor32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3-1a3.001 3.001 0 0 1-2.013 2.834c.009.054.013.11.013.166v2h2a1 1 0 1 1 0 2h-2v6.885c2.579-.376 4.706-2.185 5.556-4.615a1 1 0 1 1 1.888.66c-1.12 3.201-3.98 5.583-7.444 5.971V25a1 1 0 1 1-2 0v-.099c-3.464-.388-6.324-2.77-7.444-5.97a1 1 0 0 1 1.888-.661c.85 2.43 2.978 4.239 5.556 4.615V16h-2a1 1 0 1 1 0-2h2v-2c0-.056.005-.112.014-.166A3.001 3.001 0 1 1 19 9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconAnchor32);
