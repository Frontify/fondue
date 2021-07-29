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

function IconActions(props: IconProps): React.ReactElement<IconProps> {
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
                d="M12,8.5 C11.1715729,8.5 10.5,7.82842712 10.5,7 C10.5,6.17157288 11.1715729,5.5 12,5.5 C12.8284271,5.5 13.5,6.17157288 13.5,7 C13.5,7.82842712 12.8284271,8.5 12,8.5 Z M12,13.5 C11.1715729,13.5 10.5,12.8284271 10.5,12 C10.5,11.1715729 11.1715729,10.5 12,10.5 C12.8284271,10.5 13.5,11.1715729 13.5,12 C13.5,12.8284271 12.8284271,13.5 12,13.5 Z M12,18.5 C11.1715729,18.5 10.5,17.8284271 10.5,17 C10.5,16.1715729 11.1715729,15.5 12,15.5 C12.8284271,15.5 13.5,16.1715729 13.5,17 C13.5,17.8284271 12.8284271,18.5 12,18.5 Z"
                id="Icon_actions"
            />
        </svg>
    );
}

const MemoIconActions = React.memo(IconActions);
export default MemoIconActions;
