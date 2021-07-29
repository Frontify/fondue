import * as React from "react";
import { IconProps, IconSize } from "@elements/Icon/Icon";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconImageGrid2(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path
                d="M4.5,8.66666667 C4.03976271,8.66666667 3.66666667,9.03976271 3.66666667,9.5 L3.66666667,14.5 C3.66666667,14.9602373 4.03976271,15.3333333 4.5,15.3333333 L8.66666667,15.3333333 C9.12690396,15.3333333 9.5,14.9602373 9.5,14.5 L9.5,9.5 C9.5,9.03976271 9.12690396,8.66666667 8.66666667,8.66666667 L4.5,8.66666667 Z M4.5,7 L8.66666667,7 C10.0473785,7 11.1666667,8.11928813 11.1666667,9.5 L11.1666667,14.5 C11.1666667,15.8807119 10.0473785,17 8.66666667,17 L4.5,17 C3.11928813,17 2,15.8807119 2,14.5 L2,9.5 C2,8.11928813 3.11928813,7 4.5,7 Z M15.3333333,8.66666667 C14.873096,8.66666667 14.5,9.03976271 14.5,9.5 L14.5,14.5 C14.5,14.9602373 14.873096,15.3333333 15.3333333,15.3333333 L19.5,15.3333333 C19.9602373,15.3333333 20.3333333,14.9602373 20.3333333,14.5 L20.3333333,9.5 C20.3333333,9.03976271 19.9602373,8.66666667 19.5,8.66666667 L15.3333333,8.66666667 Z M15.3333333,7 L19.5,7 C20.8807119,7 22,8.11928813 22,9.5 L22,14.5 C22,15.8807119 20.8807119,17 19.5,17 L15.3333333,17 C13.9526215,17 12.8333333,15.8807119 12.8333333,14.5 L12.8333333,9.5 C12.8333333,8.11928813 13.9526215,7 15.3333333,7 Z"
                id="Icon_ImageGrid2"
            />
        </svg>
    );
}

const MemoIconImageGrid2 = React.memo(IconImageGrid2);
export default MemoIconImageGrid2;
