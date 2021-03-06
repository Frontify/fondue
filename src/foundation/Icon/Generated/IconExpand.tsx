import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconExpand(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconExpand"
            {...props}
        >
            <path d="M18.478 4.514h-2.653a.753.753 0 0 1-.75-.757c0-.406.336-.757.75-.757h4.425c.209 0 .398.086.534.225a.79.79 0 0 1 .216.542v4.521a.754.754 0 0 1-.74.767c-.398 0-.741-.343-.741-.767V5.591l-5.024 5.134c-.3.306-.761.3-1.05.003a.78.78 0 0 1 .003-1.074l5.03-5.14ZM5.522 19.486h2.653c.415 0 .75.34.75.757a.762.762 0 0 1-.75.757H3.75a.753.753 0 0 1-.75-.767v-4.521c0-.424.332-.767.74-.767.398 0 .741.343.741.767v2.697l5.024-5.134c.3-.306.761-.3 1.05-.003a.78.78 0 0 1-.003 1.074l-5.03 5.14Z" />
        </svg>
    );
}

const Memo = memo(IconExpand);
export default Memo;
