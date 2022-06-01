import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconRocket12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconRocket12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M10.105 5.247A15.894 15.894 0 0 1 5.28 8.52L3.49 6.73a15.892 15.892 0 0 1 3.273-4.823C7.744.924 9.37.838 10.596.975c.24.027.412.2.439.439.136 1.225.05 2.851-.93 3.832Zm.707.707a16.07 16.07 0 0 1-1.538 1.35v2.048a.5.5 0 0 1-.229.42l-3.03 1.953c-.77.498-1.749-.22-1.505-1.106l.314-1.141-2.29-2.29-1.14.314C.507 7.745-.21 6.767.286 5.995L2.24 2.966a.5.5 0 0 1 .42-.23h2.038l.008.001c.394-.51.843-1.03 1.35-1.538 1.33-1.33 3.385-1.358 4.65-1.217a1.484 1.484 0 0 1 1.323 1.322c.14 1.266.113 3.32-1.217 4.65ZM5.878 9.35a16.996 16.996 0 0 0 2.396-1.33v1.057l-2.8 1.806.386-1.4a.5.5 0 0 0 .018-.134ZM2.66 6.133a.5.5 0 0 0-.133.018l-1.4.386 1.805-2.8H3.99c-.63.95-1.063 1.804-1.329 2.396Zm5.434-2.217a.96.96 0 1 0 1.359-1.358.96.96 0 0 0-1.359 1.358Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="prefix__a">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}

const Memo = memo(IconRocket12);
export default Memo;
