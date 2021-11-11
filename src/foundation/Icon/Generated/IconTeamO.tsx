import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTeamO(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const { size } = props;
    const style =
        typeof size === "string"
            ? {
                  width: size,
                  height: size,
              }
            : {
                  width: IconSizeMap[size || IconSize.Size16],
                  height: IconSizeMap[size || IconSize.Size16],
              };
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            style={style}
            name="IconTeamO"
            {...props}
        >
            <path d="M13.168 15.237A6.895 6.895 0 0116.759 22H3.034a6.896 6.896 0 013.64-6.788 4.817 4.817 0 01-1.563-3.557 4.825 4.825 0 014.823-4.827 4.825 4.825 0 014.824 4.827 4.817 4.817 0 01-1.59 3.582zm-1.396.883a4.805 4.805 0 01-1.838.363 4.804 4.804 0 01-1.872-.378 5.523 5.523 0 00-3.64 4.516h10.95a5.523 5.523 0 00-3.6-4.501zm5.293 1.052a8.302 8.302 0 00-1-1.379H20.2a5.523 5.523 0 00-3.6-4.5c-.167.069-.34.129-.515.179a6.85 6.85 0 00-.244-1.368 3.45 3.45 0 00-1.078-6.725 3.447 3.447 0 00-3.247 2.294 5.9 5.9 0 00-1.378-.22A4.826 4.826 0 0114.762 2a4.825 4.825 0 014.823 4.828 4.817 4.817 0 01-1.59 3.582 6.895 6.895 0 013.592 6.762h-4.522zm-7.13-2.069a3.447 3.447 0 003.445-3.448 3.447 3.447 0 00-3.446-3.448 3.447 3.447 0 00-3.445 3.448 3.447 3.447 0 003.445 3.448z" />
        </svg>
    );
}

const MemoIconTeamO = React.memo(IconTeamO);
export default MemoIconTeamO;
