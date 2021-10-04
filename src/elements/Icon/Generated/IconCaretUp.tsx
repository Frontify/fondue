import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconCaretUp(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconCaretUp"
            {...props}
        >
            <path d="M18.862 15.52L11.98 8.946 5.09 15.52a.84.84 0 01-1.102-.041.75.75 0 01-.043-1.053L11.98 6.75l8.034 7.677a.751.751 0 010 1.094.83.83 0 01-.576.229.83.83 0 01-.576-.23z" />
        </svg>
    );
}

const MemoIconCaretUp = React.memo(IconCaretUp);
export default MemoIconCaretUp;
