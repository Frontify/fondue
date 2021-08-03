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

function IconStar(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconStar"
            {...props}
        >
            <path d="M12 16.066l4.175 2.195-.798-4.649 3.378-3.292-4.668-.678L12 5.412l-2.087 4.23-4.668.678 3.378 3.292-.798 4.649L12 16.066zM5.82 21.02L7 14.14 2 9.265l6.91-1.004L12 2l3.09 6.261L22 9.265l-5 4.874 1.18 6.882-6.18-3.25-6.18 3.25z" />
        </svg>
    );
}

const MemoIconStar = React.memo(IconStar);
export default MemoIconStar;
