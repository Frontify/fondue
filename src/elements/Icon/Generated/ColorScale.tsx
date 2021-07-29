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

function IconColorScale(props: IconProps): React.ReactElement<IconProps> {
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
                d="M16.6153846,9.33846154 L12,9.33846154 L12,14.7230769 L16.6153846,14.7230769 L16.6153846,9.33846154 Z M18.1538462,9.33846154 L18.1538462,14.7230769 L20.4615385,14.7230769 L20.4615385,9.33846154 L18.1538462,9.33846154 Z M10.4615385,9.33846154 L3.53846154,9.33846154 L3.53846154,14.7230769 L10.4615385,14.7230769 L10.4615385,9.33846154 Z M3.53846154,7.8 L20.4615385,7.8 C21.3112073,7.8 22,8.48879269 22,9.33846154 L22,14.7230769 C22,15.5727458 21.3112073,16.2615385 20.4615385,16.2615385 L3.53846154,16.2615385 C2.68879269,16.2615385 2,15.5727458 2,14.7230769 L2,9.33846154 C2,8.48879269 2.68879269,7.8 3.53846154,7.8 Z"
                id="Icon_ColorScale"
            />
        </svg>
    );
}

const MemoIconColorScale = React.memo(IconColorScale);
export default MemoIconColorScale;
