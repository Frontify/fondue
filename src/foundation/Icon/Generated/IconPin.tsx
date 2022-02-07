import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPin(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconPin"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.498 2.364a2.01 2.01 0 0 0-2.363.817L9.92 8.234a7.07 7.07 0 0 0-4.674.868l-.003.001a2.01 2.01 0 0 0-.402 3.158L7.76 15.18l-5.29 5.29a.75.75 0 1 0 1.06 1.06l5.29-5.29 2.92 2.92a2.012 2.012 0 0 0 3.157-.403l.002-.003a7.07 7.07 0 0 0 .868-4.674l5.052-3.215a2.01 2.01 0 0 0 .343-3.117l-4.91-4.91a2.01 2.01 0 0 0-.754-.474Zm-.723 1.389a.51.51 0 0 1 .417.146L20.1 8.81a.51.51 0 0 1-.088.79l-5.485 3.491a.75.75 0 0 0-.327.809 5.57 5.57 0 0 1-.598 4.1.51.51 0 0 1-.801.101L5.9 11.2l-.001-.002a.51.51 0 0 1 .101-.8 5.57 5.57 0 0 1 4.1-.6.75.75 0 0 0 .809-.326l3.49-5.486a.511.511 0 0 1 .375-.233Z"
            />
        </svg>
    );
}

const Memo = memo(IconPin);
export default Memo;
