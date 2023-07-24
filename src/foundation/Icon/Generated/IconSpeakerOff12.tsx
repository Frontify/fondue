import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSpeakerOff12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconSpeakerOff12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#SpeakerOff12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M3.571 5h.376l.283-.247L6 3.203v5.593L4.23 7.247 3.947 7H2V5h1.571ZM1 5a1 1 0 0 1 1-1h1.571l2.6-2.274A.5.5 0 0 1 7 2.102v7.796a.5.5 0 0 1-.83.376L3.572 8H2a1 1 0 0 1-1-1V5Zm10.857-.604a.5.5 0 0 1 0 .708l-.898.898.898.899a.5.5 0 0 1-.707.707l-.898-.899-.899.899a.5.5 0 1 1-.707-.707l.899-.9-.898-.897a.5.5 0 0 1 .707-.708l.898.899.898-.899a.5.5 0 0 1 .707 0Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="SpeakerOff12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconSpeakerOff12);
