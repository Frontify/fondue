import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconExternalLink(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
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
            <path d="M18.843 4.318h-3.207a.91.91 0 010-1.818h5.455a.91.91 0 01.909.91v5.454a.91.91 0 01-1.818 0V5.55l-6.63 6.63a.91.91 0 11-1.286-1.286l6.577-6.577zm-7.734 0a.91.91 0 010 1.818H4.727a.91.91 0 00-.909.91v11.818c0 .502.407.909.91.909h12.727a.91.91 0 00.909-.91v-5.445a.91.91 0 111.818 0v5.446a2.727 2.727 0 01-2.727 2.727H4.727A2.727 2.727 0 012 18.864V7.045a2.727 2.727 0 012.727-2.727h6.382z" />
        </svg>
    );
}

const MemoIconExternalLink = React.memo(IconExternalLink);
export default MemoIconExternalLink;
