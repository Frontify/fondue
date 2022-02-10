import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSpeakerOff12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconSpeakerOff12"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M7 2.113a.5.5 0 0 0-.832-.373L3.624 4H2.5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1.125l2.543 2.26A.5.5 0 0 0 7 9.886V2.113ZM2.5 4.75h1.41l2.34-2.08v6.66L3.91 7.25H2.5A.25.25 0 0 1 2.25 7V5a.25.25 0 0 1 .25-.25Z"
                    clipRule="evenodd"
                />
                <path d="m8.51 6-.761.908a.375.375 0 1 0 .574.482L9 6.583l.677.807a.375.375 0 1 0 .574-.482L9.49 6l.761-.908a.375.375 0 1 0-.574-.482L9 5.416l-.677-.806a.375.375 0 1 0-.574.482L8.51 6Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconSpeakerOff12);
export default Memo;
