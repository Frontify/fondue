import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconStar(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconStar"
            {...props}
        >
            <path d="M12 16.066l4.175 2.195-.798-4.649 3.378-3.292-4.668-.678L12 5.412l-2.087 4.23-4.668.678 3.378 3.292-.798 4.649L12 16.066zM5.82 21.02L7 14.14 2 9.265l6.91-1.004L12 2l3.09 6.261L22 9.265l-5 4.874 1.18 6.882-6.18-3.25-6.18 3.25z" />
        </svg>
    );
}

const MemoIconStar = React.memo(IconStar);
export default MemoIconStar;
