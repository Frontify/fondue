import * as React from "react";
import IconProps from "@elements/Icon/IconProps";
import IconSize from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconRectangle(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconRectangle"
            {...props}
        >
            <path d="M3.662 5.108v13.85c0 .197.05.318.19.458.139.139.26.189.456.189h15.384a.57.57 0 00.456-.19.57.57 0 00.19-.456V5.109a.57.57 0 00-.19-.457.57.57 0 00-.456-.19H4.308a.57.57 0 00-.456.19.57.57 0 00-.19.456zM2 5.108c0-.637.225-1.18.676-1.632.451-.45.995-.676 1.632-.676h15.384c.637 0 1.18.225 1.632.676.45.451.676.995.676 1.632v13.85c0 .638-.225 1.182-.676 1.633-.451.45-.995.676-1.632.676H4.308a2.224 2.224 0 01-1.632-.676A2.224 2.224 0 012 18.959V5.109z" />
        </svg>
    );
}

const MemoIconRectangle = React.memo(IconRectangle);
export default MemoIconRectangle;
