import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconExternalLink(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconExternalLink"
            {...props}
        >
            <path d="M18.843 4.318h-3.207a.91.91 0 0 1 0-1.818h5.455a.91.91 0 0 1 .909.91v5.454a.91.91 0 0 1-1.818 0V5.55l-6.63 6.63a.91.91 0 1 1-1.286-1.286l6.577-6.577Zm-7.734 0a.91.91 0 0 1 0 1.818H4.727a.91.91 0 0 0-.909.91v11.818c0 .502.407.909.91.909h12.727a.91.91 0 0 0 .909-.91v-5.445a.91.91 0 1 1 1.818 0v5.446a2.727 2.727 0 0 1-2.727 2.727H4.727A2.727 2.727 0 0 1 2 18.864V7.045a2.727 2.727 0 0 1 2.727-2.727h6.382Z" />
        </svg>
    );
}

const Memo = memo(IconExternalLink);
export default Memo;
