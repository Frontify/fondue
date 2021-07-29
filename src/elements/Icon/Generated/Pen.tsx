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

function IconPen(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path d="M6.94955062,19.875 L15.375,11.4437442 L12.5504494,8.625 L4.125,17.0562202 L4.125,18.3393921 L5.66377114,18.3393921 L5.66377114,19.8749644 L6.94958627,19.8749644 L6.94955062,19.875 Z M12.7431537,6.375 L17.625,11.2568463 L7.88184626,21 L3,21 L3,16.1181537 L12.7431537,6.375 Z M21,7.18434126 C21,7.58669812 20.8602242,7.92865892 20.5807063,8.21032574 L19.0019049,9.75 L14.25,4.96214046 L15.8288014,3.44257554 C16.0950137,3.14753652 16.4344066,3 16.8470475,3 C17.2596884,3 17.605734,3.1475025 17.8852518,3.44257554 L20.5806388,6.13824744 C20.8601566,6.43328645 20.9999325,6.78198439 20.9999325,7.18430723 L21,7.18434126 Z" />
        </svg>
    );
}

const MemoIconPen = React.memo(IconPen);
export default MemoIconPen;
