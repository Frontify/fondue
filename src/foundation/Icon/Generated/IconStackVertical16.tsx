import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStackVertical16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconStackVertical16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.833 8.9a.767.767 0 0 1-.767.767H2.934a.767.767 0 0 1-.766-.767V7.1c0-.423.343-.767.766-.767h10.133c.424 0 .767.343.767.767v1.8Zm-1-.233V7.333H3.167v1.334h9.666Zm1-4.094a.767.767 0 0 1-.767.767H2.934a.767.767 0 0 1-.766-.767v-1.8c0-.423.343-.766.766-.766h10.133c.424 0 .767.343.767.766v1.8Zm-1-.233V3.007H3.167V4.34h9.666Zm1 8.887a.767.767 0 0 1-.767.767H2.934a.767.767 0 0 1-.766-.767v-1.8c0-.423.343-.767.766-.767h10.133c.424 0 .767.344.767.767v1.8Zm-1-.233V11.66H3.167v1.334h9.666Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackVertical16);
export default Memo;
