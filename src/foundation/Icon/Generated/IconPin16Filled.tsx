import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPin16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPin16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.657 1.845c-.675-.655-1.798-.552-2.334.214l-2.04 2.914-2.35.387c-1.219.201-1.696 1.654-.822 2.503l1.545 1.5-3.62 3.515a.483.483 0 0 0 0 .697c.198.193.52.193.718 0l3.619-3.515 1.55 1.506c.874.849 2.37.386 2.577-.798l.4-2.283 2.999-1.981a1.452 1.452 0 0 0 .22-2.267l-2.462-2.392Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPin16Filled);
