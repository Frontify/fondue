import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconImageTextRatio33(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconImageTextRatio33"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 5.5H4a.5.5 0 00-.5.5v12a.5.5 0 00.5.5h8a.5.5 0 00.5-.5V6a.5.5 0 00-.5-.5zM4 4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H4zM22 5.75a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h4.5a.75.75 0 01.75.75zM22 11.75a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h4.5a.75.75 0 01.75.75zM20 8.75a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h2.5a.75.75 0 01.75.75zM20 14.75a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h2.5a.75.75 0 01.75.75z"
            />
        </svg>
    );
}

const MemoIconImageTextRatio33 = React.memo(IconImageTextRatio33);
export default MemoIconImageTextRatio33;
