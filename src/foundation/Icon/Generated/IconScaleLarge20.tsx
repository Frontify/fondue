import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconScaleLarge20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconScaleLarge20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.59 2.75a1.923 1.923 0 0 0-1.923 1.923v11.539c0 1.062.86 1.923 1.923 1.923h12.82a1.923 1.923 0 0 0 1.923-1.924V4.674A1.923 1.923 0 0 0 16.41 2.75H3.59Zm9.615 1.282h-2.564v12.82h2.564V4.033Zm1.282 12.82h1.923a.641.641 0 0 0 .641-.64V4.673a.641.641 0 0 0-.64-.641h-1.924v12.82ZM7.436 4.033h1.923v12.82H7.436V4.033Zm-1.282 0H4.872v12.82h1.282V4.033Zm-2.564 0v12.82a.641.641 0 0 1-.641-.64V4.673a.64.64 0 0 1 .64-.641Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScaleLarge20);
export default Memo;
