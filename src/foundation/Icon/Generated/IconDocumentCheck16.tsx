import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentCheck16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDocumentCheck16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M5.89 9.893a.61.61 0 0 1 .86.085l.575.7 1.966-1.966a.61.61 0 0 1 .864.864l-2.443 2.442a.61.61 0 0 1-.903-.044l-1.003-1.221a.61.61 0 0 1 .084-.86Z" />
                <path
                    fillRule="evenodd"
                    d="M2.333 3.764a2.434 2.434 0 0 1 2.438-2.43h4.042c.333 0 .797.182 1.043.412l3.372 3.174c.242.229.439.683.439 1.019v6.3a2.428 2.428 0 0 1-2.431 2.428H4.764a2.433 2.433 0 0 1-2.431-2.43V3.764Zm6.18 3.21h4.123v5.455c0 .67-.545 1.212-1.212 1.212H4.576c-.67 0-1.212-.544-1.212-1.207V3.567c0-.667.543-1.208 1.22-1.208H8v4.103c0 .285.23.513.513.513Zm4.123-1.143v.118H9.03V2.456l3.607 3.375Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentCheck16);
export default Memo;
