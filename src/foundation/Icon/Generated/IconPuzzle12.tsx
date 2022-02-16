import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPuzzle12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPuzzle12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11 7.2a1.8 1.8 0 0 0-2.4-1.697V4.2a.8.8 0 0 0-.8-.8H6.497a1.8 1.8 0 1 0-3.394 0H1.8a.8.8 0 0 0-.8.8v6a.8.8 0 0 0 .8.8h2.02a.4.4 0 0 0 .28-.686 1 1 0 1 1 1.4 0 .4.4 0 0 0 .28.686H7.8a.8.8 0 0 0 .8-.8V8.898A1.8 1.8 0 0 0 11 7.2Zm-3.2.98v2.02H6.497a1.8 1.8 0 1 0-3.394 0H1.8v-6h2.02a.4.4 0 0 0 .28-.686 1 1 0 1 1 1.4 0 .4.4 0 0 0 .28.686H7.8v2.02a.4.4 0 0 0 .686.28 1 1 0 1 1 0 1.4.4.4 0 0 0-.686.28Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPuzzle12);
export default Memo;
