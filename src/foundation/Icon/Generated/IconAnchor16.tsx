import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconAnchor16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconAnchor16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm2-1a2 2 0 0 1-1.5 1.937V8H10a.5.5 0 0 1 0 1H8.5v3.055c1.538-.18 2.791-1.172 3.282-2.48a.5.5 0 0 1 .936.35c-.64 1.71-2.272 2.951-4.218 3.135v.44a.5.5 0 0 1-1 0v-.44c-1.945-.184-3.578-1.426-4.218-3.135a.5.5 0 0 1 .936-.35c.49 1.308 1.745 2.3 3.282 2.48V9H6a.5.5 0 0 1 0-1h1.5V5.937A2 2 0 1 1 10 4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconAnchor16);
