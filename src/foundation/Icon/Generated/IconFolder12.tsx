import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFolder12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFolder12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.475 3.037h3.368c.316 0 .588.112.816.337.227.224.341.498.341.82v4.992c0 .322-.114.596-.341.82a1.12 1.12 0 0 1-.816.337H2.157c-.322 0-.596-.112-.82-.337A1.116 1.116 0 0 1 1 9.186V4.138c0-.02.003-.039.009-.056a.394.394 0 0 1 0-.117.877.877 0 0 1 .026-.125l.5-1.606a1.02 1.02 0 0 1 .389-.518c.196-.144.4-.216.613-.216h2.694c.213 0 .416.072.61.216.192.144.32.317.384.518l.25.803Zm-.864 0-.095-.397a.5.5 0 0 0-.18-.263.469.469 0 0 0-.295-.108H2.727a.47.47 0 0 0-.293.108.499.499 0 0 0-.182.263l-.095.397h3.454ZM1.77 8.806V4.574a.74.74 0 0 1 .224-.544.74.74 0 0 1 .544-.224h6.926a.74.74 0 0 1 .544.224.74.74 0 0 1 .224.544v4.232a.74.74 0 0 1-.224.544.74.74 0 0 1-.544.224H2.537a.74.74 0 0 1-.544-.224.74.74 0 0 1-.224-.544Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFolder12);
export default Memo;
