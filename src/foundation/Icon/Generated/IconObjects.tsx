import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconObjects(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconObjects"
            {...props}
        >
            <path d="M5.65 8.5a6.35 6.35 0 1110.2 5.05V15A2.85 2.85 0 0113 17.85h-2A2.85 2.85 0 018.15 15v-1.45a6.341 6.341 0 01-2.5-5.05zm4.2 6.5c0 .635.515 1.15 1.15 1.15h2A1.15 1.15 0 0014.15 15v-2.35l.386-.251a4.65 4.65 0 10-5.072 0l.386.251V15zm.15 5.85a.85.85 0 010-1.7h4a.85.85 0 010 1.7h-4z" />
        </svg>
    );
}

const MemoIconObjects = React.memo(IconObjects);
export default MemoIconObjects;
