import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBarNarrow24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconBarNarrow24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M19.5 11h-15a1 1 0 1 0 0 2h15a1 1 0 1 0 0-2Zm-15-1.5a2.5 2.5 0 0 0 0 5h15a2.5 2.5 0 0 0 0-5h-15Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBarNarrow24);
