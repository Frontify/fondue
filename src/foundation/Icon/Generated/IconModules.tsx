import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconModules(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconModules"
            {...props}
        >
            <path d="M16.996 19.215h-.72V12.79H7.707v6.426h-.711 10zm-10 0h-.711V12.79H3.423v5.004c0 .39.14.725.418 1.004.279.279.62.418 1.02.418h2.135zm10 0h2.142c.39 0 .725-.139 1.004-.418a1.37 1.37 0 00.419-1.004v-5.004h-2.846v6.426h-.72zM12 4.923h.711v6.426h7.85V6.345c0-.39-.14-.725-.419-1.004a1.37 1.37 0 00-1.004-.418H12zm0 0H4.862c-.402 0-.742.14-1.021.418a1.37 1.37 0 00-.418 1.004v5.004h7.866V4.923H12zm-10 .72c0-.592.21-1.097.628-1.515A2.064 2.064 0 014.142 3.5h15.716c.591 0 1.096.21 1.514.628.419.418.628.923.628 1.514v12.854a2.05 2.05 0 01-.636 1.514 2.072 2.072 0 01-1.506.628H4.142c-.591 0-1.096-.21-1.514-.628A2.064 2.064 0 012 18.496V5.642z" />
        </svg>
    );
}

const MemoIconModules = React.memo(IconModules);
export default MemoIconModules;
