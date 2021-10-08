import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconTextOnImage(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 25"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconTextOnImage"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 8.25a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h4.5a.75.75 0 01.75.75zM9 14.25a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h2.5a.75.75 0 01.75.75zM11 11.25a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h4.5a.75.75 0 01.75.75zM14.5 10.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm1.5-3a3 3 0 100 6 3 3 0 000-6z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 6H4a.5.5 0 00-.5.5v12a.5.5 0 00.5.5h16a.5.5 0 00.5-.5v-12A.5.5 0 0020 6zM4 4.5a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2v-12a2 2 0 00-2-2H4z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.968 19.254l6.815-4.193a1.75 1.75 0 011.222-.233l6.864 1.215-.261 1.477-6.864-1.215a.25.25 0 00-.175.033l-6.815 4.194-.786-1.278z"
            />
        </svg>
    );
}

const MemoIconTextOnImage = React.memo(IconTextOnImage);
export default MemoIconTextOnImage;
