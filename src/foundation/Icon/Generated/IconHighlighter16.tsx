import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHighlighter16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconHighlighter16"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M11.986 2.369a1.333 1.333 0 0 0-1.805-.074L4.468 7.137a1.333 1.333 0 0 0-.386.548l-.995 2.65a.667.667 0 0 0 .143.696l-1.132 1.061-.058.063c-.687.748-.157 1.956.859 1.956h1.005c.281 0 .553-.101.765-.286l.744-.646a.667.667 0 0 0 .56.042l2.65-.996c.212-.08.4-.213.548-.386l4.842-5.713a1.333 1.333 0 0 0-.075-1.805L11.986 2.37Zm1.245 2.66L11.28 3.075a.333.333 0 0 0-.451-.018L5.34 7.708l3.258 3.258 4.65-5.486a.333.333 0 0 0-.018-.452Zm-9.133 5.457L4.81 8.59l2.906 2.906-1.894.712-1.724-1.723Zm.587 2-.747-.747-1.13 1.057-.032.036a.167.167 0 0 0 .123.28h1.005c.04 0 .08-.015.11-.042l.671-.583Z"
                    clipRule="evenodd"
                />
                <path d="M8.733 12.978a.5.5 0 0 0 0 1h3.398a.5.5 0 1 0 0-1H8.733Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHighlighter16);
export default Memo;
