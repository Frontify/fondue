import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSpeakerOff32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconSpeakerOff32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 13h.752l.565-.495L16 8.408v15.185l-4.683-4.098-.566-.495H6v-6h4Zm-6 0a2 2 0 0 1 2-2h4l6.341-5.549c.647-.565 1.659-.106 1.659.753v19.592a1 1 0 0 1-1.659.753L10 21H6a2 2 0 0 1-2-2v-6Zm17.293-.207a1 1 0 0 1 1.414 0l1.794 1.794 1.793-1.794a1 1 0 1 1 1.415 1.414l-1.794 1.794 1.794 1.793a1 1 0 0 1-1.415 1.415l-1.793-1.794-1.794 1.794a1 1 0 0 1-1.414-1.415l1.794-1.793-1.794-1.794a1 1 0 0 1 0-1.414Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconSpeakerOff32);
