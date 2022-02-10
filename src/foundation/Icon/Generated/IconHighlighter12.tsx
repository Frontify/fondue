import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHighlighter12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconHighlighter12"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M8.99 1.777a1 1 0 0 0-1.354-.056L3.35 5.352a1 1 0 0 0-.29.412L2.316 7.75a.5.5 0 0 0 .108.523l-.85.795-.043.047a.875.875 0 0 0 .644 1.467h.754a.876.876 0 0 0 .574-.214l.558-.485a.5.5 0 0 0 .42.032l1.987-.747a1 1 0 0 0 .41-.29l3.632-4.284a1 1 0 0 0-.055-1.354L8.989 1.777Zm.933 1.994L8.46 2.307a.25.25 0 0 0-.338-.014L4.006 5.781l2.443 2.444L9.937 4.11a.25.25 0 0 0-.014-.339Zm-6.85 4.093.534-1.42 2.18 2.179-1.42.534-1.293-1.293Zm.44 1.501-.56-.56-.847.792-.024.027a.125.125 0 0 0 .092.21h.754c.03 0 .06-.011.082-.031l.504-.438Z"
                    clipRule="evenodd"
                />
                <path d="M6.55 9.733a.375.375 0 1 0 0 .75h2.548a.375.375 0 0 0 0-.75H6.55Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHighlighter12);
export default Memo;
