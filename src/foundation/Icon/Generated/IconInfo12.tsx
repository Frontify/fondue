import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconInfo12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconInfo12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.587 1.234C7.474 1.078 7.3 1 7.063 1a.835.835 0 0 0-.58.234c-.17.156-.284.366-.34.63-.048.246-.017.446.092.602.108.156.276.234.503.234a.87.87 0 0 0 .609-.234c.17-.156.278-.356.325-.602.057-.264.029-.474-.085-.63ZM5.456 6.078c-.043.203-.116.484-.22.843l-.58 2.04c-.17.613-.201 1.106-.093 1.48.109.373.4.559.872.559.264 0 .53-.083.8-.248.269-.165.54-.399.814-.701-.028-.208-.113-.36-.255-.453a1.686 1.686 0 0 1-.403.311.751.751 0 0 1-.333.1.288.288 0 0 1-.163-.043c-.043-.028-.069-.08-.078-.156-.01-.076 0-.186.028-.333a6.54 6.54 0 0 1 .142-.56l.779-2.733c.16-.586.21-1.022.149-1.31-.062-.288-.239-.494-.531-.616a2.362 2.362 0 0 1-.333.177l.04-.017a6.397 6.397 0 0 1-.94.343 2.23 2.23 0 0 1-.396.078l.003-.008a1.193 1.193 0 0 0-.088.546c.235 0 .417.014.545.042.127.029.21.094.248.199.037.104.035.257-.007.46Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconInfo12);
export default Memo;
