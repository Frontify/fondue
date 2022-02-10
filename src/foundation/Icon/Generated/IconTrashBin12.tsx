import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTrashBin12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTrashBin12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M4.377 5.09a.455.455 0 1 1 .91 0v3.637a.455.455 0 0 1-.91 0V5.091Zm2.727-.454a.455.455 0 0 0-.454.455v3.636a.455.455 0 0 0 .909 0V5.091a.455.455 0 0 0-.455-.455Z" />
                <path
                    fillRule="evenodd"
                    d="M6.877 1H5.06a.91.91 0 0 0-.91.91v.908H2.105a.455.455 0 0 0 0 .91h.228v5.908c0 .754.61 1.364 1.363 1.364h4.546c.753 0 1.363-.61 1.363-1.364V3.727h.317a.455.455 0 1 0 0-.909H7.786V1.91A.91.91 0 0 0 6.877 1ZM3.241 3.727h5.454v5.91a.455.455 0 0 1-.454.454H3.695a.455.455 0 0 1-.454-.455V3.727Zm1.818-.909V1.91h1.818v.91H5.06Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTrashBin12);
export default Memo;
