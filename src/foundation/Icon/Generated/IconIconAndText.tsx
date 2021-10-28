import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconIconAndText(props: IconProps): React.ReactElement<IconProps> {
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
                d="M13 6H4a.5.5 0 00-.5.5v12a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-12A.5.5 0 0013 6zM4 4.5a2 2 0 00-2 2v12a2 2 0 002 2h9a2 2 0 002-2v-12a2 2 0 00-2-2H4z"
            />
            <path fillRule="evenodd" clipRule="evenodd" d="M12.972 19.747L2.79 6.1l1.238-.847L14.21 18.9l-1.239.847z" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.79 18.9L12.971 5.253l1.238.847L4.028 19.746 2.789 18.9zM22 6.25a.75.75 0 01-.75.75h-3.486a.75.75 0 010-1.5h3.486a.75.75 0 01.75.75zM22 12.25a.75.75 0 01-.75.75h-3.486a.75.75 0 010-1.5h3.486a.75.75 0 01.75.75zM20.575 9.25a.75.75 0 01-.75.75h-2.061a.75.75 0 010-1.5h2.061a.75.75 0 01.75.75zM20.575 15.25a.75.75 0 01-.75.75h-2.061a.75.75 0 010-1.5h2.061a.75.75 0 01.75.75z"
            />
        </svg>
    );
}

const MemoIconIconAndText = React.memo(IconIconAndText);
export default MemoIconIconAndText;
