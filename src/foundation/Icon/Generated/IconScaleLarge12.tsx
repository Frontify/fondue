import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconScaleLarge12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconScaleLarge12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.154 1.65C1.517 1.65 1 2.167 1 2.804v6.923c0 .637.517 1.154 1.154 1.154h7.692c.637 0 1.154-.517 1.154-1.154V2.804c0-.637-.517-1.154-1.154-1.154H2.154Zm5.77.77h-1.54v7.691h1.54V2.42Zm.768 7.691h1.154a.385.385 0 0 0 .385-.384V2.804a.385.385 0 0 0-.385-.385H8.692v7.692ZM4.462 2.42h1.153v7.692H4.462V2.42Zm-.77 0h-.769v7.692h.77V2.42Zm-1.538 0v7.692a.385.385 0 0 1-.385-.384V2.804c0-.213.172-.385.385-.385Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScaleLarge12);
export default Memo;
