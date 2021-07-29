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

function IconSide(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={customClassName}
            {...props}
        >
            <path
                d="M9.65,4.85 L6,4.85 C5.36487254,4.85 4.85,5.36487254 4.85,6 L4.85,18 C4.85,18.6351275 5.36487254,19.15 6,19.15 L9.65,19.15 L9.65,4.85 Z M11.35,4.85 L11.35,19.15 L18,19.15 C18.6351275,19.15 19.15,18.6351275 19.15,18 L19.15,6 C19.15,5.36487254 18.6351275,4.85 18,4.85 L11.35,4.85 Z M6,3.15 L18,3.15 C19.5740115,3.15 20.85,4.42598846 20.85,6 L20.85,18 C20.85,19.5740115 19.5740115,20.85 18,20.85 L6,20.85 C4.42598846,20.85 3.15,19.5740115 3.15,18 L3.15,6 C3.15,4.42598846 4.42598846,3.15 6,3.15 Z"
                id="Icon_side"
            />
        </svg>
    );
}

const MemoIconSide = React.memo(IconSide);
export default MemoIconSide;
