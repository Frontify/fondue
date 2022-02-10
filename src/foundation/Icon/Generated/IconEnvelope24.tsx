import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEnvelope24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconEnvelope24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm17.44-.5H4.275l6.831 6.595a1.25 1.25 0 0 0 1.752-.015l6.58-6.58ZM3.5 17.44l5.395-5.396L3.5 6.836v10.603Zm6.474-4.354L4.561 18.5H19.44L14 13.06l-.08.08a2.75 2.75 0 0 1-3.855.034l-.09-.088ZM20.5 6.561v10.878L15.06 12l5.44-5.44Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconEnvelope24);
export default Memo;
