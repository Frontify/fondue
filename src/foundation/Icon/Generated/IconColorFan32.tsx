import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconColorFan32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconColorFan32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 7v13.005l5-8.66V7a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1Zm7 .88V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v19a3.001 3.001 0 0 0 3 3h20a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3h-.554l.473-.273a3 3 0 0 0 1.098-4.098l-1.75-3.03a3 3 0 0 0-4.098-1.099l-.433.25.241-.419a3 3 0 0 0-1.098-4.098l-3.03-1.75a3 3 0 0 0-4.099 1.098l-.75 1.3ZM5 26a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3Zm19.919-8.005L21.446 20h-11l11.723-6.768a1 1 0 0 1 1.366.366l1.75 3.031a1 1 0 0 1-.366 1.366ZM17.27 13.75l-9.526 5.5 6.737-11.669a1 1 0 0 1 1.366-.366l3.031 1.75a1 1 0 0 1 .366 1.366L17.27 13.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconColorFan32);
