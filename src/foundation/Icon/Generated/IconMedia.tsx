import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMedia(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconMedia"
            {...props}
        >
            <path d="M20.462 6.546V5.008a.77.77 0 0 0-.77-.77H4.308a.77.77 0 0 0-.77.77v1.538h16.924Zm0 1.539H3.538v10.769c0 .425.345.77.77.77h15.384a.77.77 0 0 0 .77-.77V8.084ZM4.308 2.7h15.384A2.308 2.308 0 0 1 22 5.008v13.846a2.308 2.308 0 0 1-2.308 2.308H4.308A2.308 2.308 0 0 1 2 18.854V5.008A2.308 2.308 0 0 1 4.308 2.7Zm4.615 13.683v-5.269c0-.547.3-1.03.834-1.337.495-.229 1.048-.208 1.503.096l3.9 2.587c.432.275.686.75.686 1.25 0 .484-.239.951-.645 1.235l-3.854 2.63a1.4 1.4 0 0 1-.9.313 1.52 1.52 0 0 1-.681-.153c-.51-.24-.804-.737-.843-1.352Zm5.349-2.666-3.81-2.528-.002 5.132 3.812-2.604Z" />
        </svg>
    );
}

const Memo = memo(IconMedia);
export default Memo;
