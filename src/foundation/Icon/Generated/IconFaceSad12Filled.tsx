import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFaceSad12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFaceSad12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.052 10.61C4.66 10.87 5.31 11 6 11s1.34-.13 1.948-.39A5.017 5.017 0 0 0 9.54 9.54a5.017 5.017 0 0 0 1.07-1.592C10.87 7.34 11 6.69 11 6s-.13-1.34-.39-1.948A5.017 5.017 0 0 0 9.54 2.46a5.017 5.017 0 0 0-1.592-1.07A4.9 4.9 0 0 0 6 1a4.9 4.9 0 0 0-1.948.39A5.013 5.013 0 0 0 2.46 2.46a5.017 5.017 0 0 0-1.07 1.592A4.9 4.9 0 0 0 1 6c0 .69.13 1.34.39 1.948.261.609.617 1.14 1.07 1.592.452.453.983.809 1.592 1.07Zm1.039-6.2a.682.682 0 1 1-1.364 0 .682.682 0 0 1 1.364 0Zm2.5.68a.682.682 0 1 0 0-1.363.682.682 0 0 0 0 1.364ZM3.524 8.453a.455.455 0 0 1-.203-.61C3.853 6.777 4.769 6.227 6 6.227c1.23 0 2.147.55 2.68 1.615a.455.455 0 1 1-.814.407C7.49 7.496 6.891 7.136 6 7.136c-.89 0-1.49.36-1.866 1.113a.455.455 0 0 1-.61.203Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFaceSad12Filled);
export default Memo;
