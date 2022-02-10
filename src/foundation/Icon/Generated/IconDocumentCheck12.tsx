import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentCheck12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDocumentCheck12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M4.417 7.42a.458.458 0 0 1 .645.063l.432.526 1.474-1.475a.458.458 0 1 1 .648.648L5.784 9.014a.458.458 0 0 1-.678-.034l-.752-.915a.458.458 0 0 1 .063-.645Z" />
                <path
                    fillRule="evenodd"
                    d="M1.75 2.823C1.75 1.816 2.568 1 3.578 1H6.61c.25 0 .598.137.782.31L9.92 3.69c.182.171.329.512.329.764v4.725A1.821 1.821 0 0 1 8.426 11H3.573A1.824 1.824 0 0 1 1.75 9.177V2.823ZM6.385 5.23h3.092v4.09a.91.91 0 0 1-.909.91H3.432a.91.91 0 0 1-.91-.906v-6.65c0-.5.408-.906.916-.906H6v3.077c0 .214.172.385.385.385Zm3.092-.858v.089H6.773v-2.62l2.704 2.53Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentCheck12);
export default Memo;
