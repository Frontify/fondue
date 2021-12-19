import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTeamO(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTeamO"
            {...props}
        >
            <path d="M13.168 15.237A6.895 6.895 0 0 1 16.759 22H3.034a6.896 6.896 0 0 1 3.64-6.788 4.817 4.817 0 0 1-1.563-3.557 4.825 4.825 0 0 1 4.823-4.827 4.825 4.825 0 0 1 4.824 4.827 4.817 4.817 0 0 1-1.59 3.582Zm-1.396.883a4.805 4.805 0 0 1-1.838.363 4.804 4.804 0 0 1-1.872-.378 5.523 5.523 0 0 0-3.64 4.516h10.95a5.523 5.523 0 0 0-3.6-4.501Zm5.293 1.052a8.302 8.302 0 0 0-1-1.379H20.2a5.523 5.523 0 0 0-3.6-4.5c-.167.069-.34.129-.515.179a6.85 6.85 0 0 0-.244-1.368 3.45 3.45 0 0 0-1.078-6.725 3.447 3.447 0 0 0-3.247 2.294 5.9 5.9 0 0 0-1.378-.22A4.826 4.826 0 0 1 14.762 2a4.825 4.825 0 0 1 4.823 4.828 4.817 4.817 0 0 1-1.59 3.582 6.895 6.895 0 0 1 3.592 6.762h-4.522Zm-7.13-2.069a3.447 3.447 0 0 0 3.445-3.448 3.447 3.447 0 0 0-3.446-3.448 3.447 3.447 0 0 0-3.445 3.448 3.447 3.447 0 0 0 3.445 3.448Z" />
        </svg>
    );
}

const Memo = memo(IconTeamO);
export default Memo;
