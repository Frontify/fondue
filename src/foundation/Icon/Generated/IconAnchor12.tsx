import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconAnchor12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconAnchor12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm2-1a2 2 0 0 1-1.504 1.938c.003.02.004.041.004.062v2h1a.5.5 0 0 1 0 1h-1v3.055c1.537-.18 2.791-1.172 3.282-2.48a.5.5 0 1 1 .936.35c-.64 1.71-2.272 2.952-4.218 3.135v.44a.5.5 0 0 1-1 0v-.44c-1.946-.184-3.578-1.426-4.218-3.135a.5.5 0 0 1 .936-.35c.49 1.308 1.745 2.3 3.282 2.48V7h-1a.5.5 0 0 1 0-1h1V4c0-.021.001-.042.004-.062A2 2 0 1 1 8 2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconAnchor12);
