import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFunnel12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFunnel12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.047 1.5H2.066a1 1 0 0 0-.836 1.55l2.91 4.427a1.5 1.5 0 0 1 .247.824v1.872a1 1 0 0 0 1.513.858l1.317-.788a1 1 0 0 0 .487-.843l.016-1.11a1.5 1.5 0 0 1 .246-.803l2.917-4.438a1 1 0 0 0-.836-1.549ZM4.976 6.928 2.066 2.5h7.981L7.131 6.938a2.5 2.5 0 0 0-.41 1.337l-.017 1.11-1.317.788V8.3a2.5 2.5 0 0 0-.411-1.373Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFunnel12);
export default Memo;
