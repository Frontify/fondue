import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPin24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPin24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.303 3.692a2.508 2.508 0 0 0-3.84.361l-2.72 3.989-3.737.632c-1.603.272-2.23 2.235-1.08 3.382l2.476 2.469a.713.713 0 0 0-.011.01L3.21 19.7a.747.747 0 0 0 0 1.06.753.753 0 0 0 1.062 0l5.18-5.165a.395.395 0 0 0 .01-.011l2.456 2.447c1.15 1.147 3.118.521 3.39-1.077l.635-3.726 4-2.712a2.492 2.492 0 0 0 .362-3.83l-3.003-2.994Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPin24Filled);
