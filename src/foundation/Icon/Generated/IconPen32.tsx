import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPen32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPen32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m24.182 11.218 2.122-2.122-2.829-2.828-2.121 2.121 2.828 2.829ZM8.515 21.228 19.94 9.803l2.828 2.829-11.425 11.425-3.627.798.799-3.627Zm3.83 4.656 15.373-15.373a2 2 0 0 0 0-2.829L24.89 4.854a2 2 0 0 0-2.829 0L6.687 20.228l-1.26 5.725a1 1 0 0 0 1.192 1.192l5.725-1.26ZM18 26a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPen32);
