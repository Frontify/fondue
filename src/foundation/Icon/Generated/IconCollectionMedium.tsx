import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCollectionMedium(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCollectionMedium"
            {...props}
        >
            <path d="M14.65 7.7h-4.3v4.45h4.3V7.7zm1.7 0v4.45h3.95V8a.3.3 0 0 0-.3-.3h-3.65zm-7.7 0H5a.3.3 0 0 0-.3.3v4.15h3.95V7.7zM4.7 13.85V16a.3.3 0 0 0 .3.3h15a.3.3 0 0 0 .3-.3v-2.15H4.7zM5 6h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
        </svg>
    );
}

const Memo = memo(IconCollectionMedium);
export default Memo;
