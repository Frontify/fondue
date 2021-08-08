import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconFigureTextLeft(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconFigureTextLeft"
            {...props}
        >
            <path d="M13.745 7.514c-.69 0-1.25.56-1.25 1.25v6.494c0 .69.56 1.25 1.25 1.25h4.51c.69 0 1.25-.56 1.25-1.25V8.764c0-.69-.56-1.25-1.25-1.25h-4.51zm0-1.5h4.51a2.75 2.75 0 012.75 2.75v6.494a2.75 2.75 0 01-2.75 2.75h-4.51a2.75 2.75 0 01-2.75-2.75V8.764a2.75 2.75 0 012.75-2.75zm-9.99 1.5a.75.75 0 010-1.5h5a.75.75 0 110 1.5h-5zm1 3a.75.75 0 110-1.5h4a.75.75 0 110 1.5h-4z" />
        </svg>
    );
}

const MemoIconFigureTextLeft = React.memo(IconFigureTextLeft);
export default MemoIconFigureTextLeft;
