import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconRectangle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconRectangle"
            {...props}
        >
            <path d="M3.662 5.108v13.85c0 .197.05.318.19.458.139.139.26.189.456.189h15.384a.57.57 0 0 0 .456-.19.57.57 0 0 0 .19-.456V5.109a.57.57 0 0 0-.19-.457.57.57 0 0 0-.456-.19H4.308a.57.57 0 0 0-.456.19.57.57 0 0 0-.19.456ZM2 5.108c0-.637.225-1.18.676-1.632.451-.45.995-.676 1.632-.676h15.384c.637 0 1.18.225 1.632.676.45.451.676.995.676 1.632v13.85c0 .638-.225 1.182-.676 1.633-.451.45-.995.676-1.632.676H4.308a2.224 2.224 0 0 1-1.632-.676A2.224 2.224 0 0 1 2 18.959V5.109Z" />
        </svg>
    );
}

const Memo = memo(IconRectangle);
export default Memo;
