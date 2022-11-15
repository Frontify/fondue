import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBarNarrow12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconBarNarrow12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.5 5.5h-9a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1Zm-9-1a1.5 1.5 0 1 0 0 3h9a1.5 1.5 0 0 0 0-3h-9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBarNarrow12);
