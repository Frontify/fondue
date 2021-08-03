import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconModules(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M16.996 19.215h-.72V12.79H7.707v6.426h-.711 10zm-10 0h-.711V12.79H3.423v5.004c0 .39.14.725.418 1.004.279.279.62.418 1.02.418h2.135zm10 0h2.142c.39 0 .725-.139 1.004-.418a1.37 1.37 0 00.419-1.004v-5.004h-2.846v6.426h-.72zM12 4.923h.711v6.426h7.85V6.345c0-.39-.14-.725-.419-1.004a1.37 1.37 0 00-1.004-.418H12zm0 0H4.862c-.402 0-.742.14-1.021.418a1.37 1.37 0 00-.418 1.004v5.004h7.866V4.923H12zm-10 .72c0-.592.21-1.097.628-1.515A2.064 2.064 0 014.142 3.5h15.716c.591 0 1.096.21 1.514.628.419.418.628.923.628 1.514v12.854a2.05 2.05 0 01-.636 1.514 2.072 2.072 0 01-1.506.628H4.142c-.591 0-1.096-.21-1.514-.628A2.064 2.064 0 012 18.496V5.642z" />
        </svg>
    );
}

const MemoIconModules = React.memo(IconModules);
export default MemoIconModules;
