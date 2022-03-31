import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconNavigation(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconNavigation"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM16 6a2 2 0 1 0-1.855-2.75H14A2.75 2.75 0 0 0 11.25 6v3.25H8.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a2 2 0 0 0 2-2v-3.25h2.75V14A2.75 2.75 0 0 0 14 16.75h.145a2 2 0 1 0 0-1.5H14c-.69 0-1.25-.56-1.25-1.25v-3.25h1.395a2 2 0 1 0 0-1.5H12.75V6c0-.69.56-1.25 1.25-1.25h.145A2 2 0 0 0 16 6ZM4 5.5h2.5A.5.5 0 0 1 7 6v8a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5ZM16.5 10a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm0 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                fill="#000"
            />
        </svg>
    );
}

const Memo = memo(IconNavigation);
export default Memo;
