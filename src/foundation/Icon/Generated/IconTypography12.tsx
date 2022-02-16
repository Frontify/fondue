import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypography12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTypography12"
            {...props}
        >
            <g fill="none">
                <path
                    fill="currentColor"
                    d="M6.376 2.808v4.414h.009v1.97h1.153v.77H4.462v-.77h1.153v-1.97h.009V2.808H3.253v.769H2.5V2.039h7v1.538h-.753v-.77h-2.37Z"
                />
                <path
                    stroke="currentColor"
                    d="M6.376 2.808v4.414h.009v1.97h1.153v.77H4.462v-.77h1.153v-1.97h.009V2.808H3.253v.769H2.5V2.039h7v1.538h-.753v-.77h-2.37Z"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypography12);
export default Memo;
