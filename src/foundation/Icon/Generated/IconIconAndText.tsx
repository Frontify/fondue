import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconIconAndText(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconIconAndText"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 6H4a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12A.5.5 0 0 0 13 6ZM4 4.5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2H4Z"
            />
            <path fillRule="evenodd" clipRule="evenodd" d="M12.972 19.747 2.79 6.1l1.238-.847L14.21 18.9l-1.239.847Z" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.79 18.9 12.971 5.253l1.238.847L4.028 19.746 2.789 18.9ZM22 6.25a.75.75 0 0 1-.75.75h-3.486a.75.75 0 0 1 0-1.5h3.486a.75.75 0 0 1 .75.75ZM22 12.25a.75.75 0 0 1-.75.75h-3.486a.75.75 0 0 1 0-1.5h3.486a.75.75 0 0 1 .75.75ZM20.575 9.25a.75.75 0 0 1-.75.75h-2.061a.75.75 0 0 1 0-1.5h2.061a.75.75 0 0 1 .75.75ZM20.575 15.25a.75.75 0 0 1-.75.75h-2.061a.75.75 0 0 1 0-1.5h2.061a.75.75 0 0 1 .75.75Z"
            />
        </svg>
    );
}

const Memo = memo(IconIconAndText);
export default Memo;
