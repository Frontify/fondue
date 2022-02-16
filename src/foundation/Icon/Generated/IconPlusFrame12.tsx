import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlusFrame12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPlusFrame12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M6.455 8.218a.455.455 0 1 1-.91 0V7.31h-.909a.455.455 0 1 1 0-.91h.91v-.908a.455.455 0 0 1 .909 0V6.4h.909a.455.455 0 0 1 0 .909h-.91v.91Z" />
                <path
                    fillRule="evenodd"
                    d="M2.154 1.4h7.692c.637 0 1.154.517 1.154 1.154v6.923c0 .637-.517 1.154-1.154 1.154H2.154A1.154 1.154 0 0 1 1 9.477V2.554C1 1.917 1.517 1.4 2.154 1.4Zm-.385 2.692v5.385c0 .212.172.384.385.384h7.692a.385.385 0 0 0 .385-.384V4.092H1.769Zm8.462-.769H1.769v-.77c0-.212.172-.384.385-.384h7.692c.213 0 .385.172.385.385v.769Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlusFrame12);
export default Memo;
