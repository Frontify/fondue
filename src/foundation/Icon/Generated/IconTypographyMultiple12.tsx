import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTypographyMultiple12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTypographyMultiple12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.615 8.654H4.462V3.269h1.923v.77h.769V2.5H1v1.538h.77V3.27h1.922v5.385H2.538v.77h3.077v-.77Zm3.462.77V5.576H11v-.77H6.385v.77h1.923v3.846h.769Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTypographyMultiple12);
export default Memo;
