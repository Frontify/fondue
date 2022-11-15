import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSpeakerOff20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconSpeakerOff20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.658 8.342h.585l.43-.395 2.363-2.17v8.533l-2.363-2.17-.43-.396H3.5V8.342h2.158ZM2 8.342a1.5 1.5 0 0 1 1.5-1.5h2.158l3.201-2.94c.641-.59 1.677-.135 1.677.736v10.81c0 .87-1.036 1.326-1.677.737l-3.2-2.941H3.5a1.5 1.5 0 0 1-1.5-1.5V8.342Zm15.782-.622a.75.75 0 0 1 0 1.06l-1.22 1.221 1.22 1.22a.75.75 0 1 1-1.06 1.061l-1.221-1.22-1.22 1.22a.75.75 0 0 1-1.061-1.06l1.22-1.22-1.22-1.222a.75.75 0 0 1 1.06-1.06l1.221 1.22 1.22-1.22a.75.75 0 0 1 1.061 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconSpeakerOff20);
