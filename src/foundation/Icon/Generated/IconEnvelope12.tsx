import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEnvelope12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconEnvelope12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3Zm8.72-.25H2.138l3.416 3.298a.625.625 0 0 0 .876-.008l3.29-3.29ZM1.75 8.72l2.697-2.698L1.75 3.418V8.72Zm3.237-2.177L2.28 9.25h7.44L7 6.53l-.04.04c-.53.53-1.388.538-1.927.017l-.046-.044ZM10.25 3.28v5.44L7.53 6l2.72-2.72Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconEnvelope12);
export default Memo;
