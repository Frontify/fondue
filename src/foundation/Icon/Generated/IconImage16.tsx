import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImage16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconImage16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.784 2.44c-.3.292-.45.646-.45 1.06v9c0 .414.15.768.45 1.06.3.293.663.44 1.088.44h10.256c.425 0 .787-.146 1.088-.44.3-.292.45-.646.45-1.06v-9c0-.414-.15-.768-.45-1.06-.3-.294-.663-.44-1.088-.44H2.872c-.425 0-.787.146-1.088.44Zm11.86 6.333v-4.78c0-.274-.1-.509-.3-.704a.997.997 0 0 0-.721-.293H3.377a.997.997 0 0 0-.721.293c-.2.195-.3.43-.3.703V9.16l3.678-1.687 4.509 2.988 3.102-1.688Zm0 1.032-3.233 1.664-4.377-2.965-3.679 1.629v1.875c0 .273.1.508.3.703.201.195.442.293.722.293h9.246a1 1 0 0 0 .721-.293c.2-.195.3-.43.3-.703V9.805ZM10.568 8c-.57 0-1.054-.195-1.455-.586-.4-.39-.601-.863-.601-1.418 0-.547.2-1.016.601-1.406.4-.39.886-.586 1.455-.586.569 0 1.054.195 1.455.586.4.39.6.86.6 1.406 0 .555-.2 1.027-.6 1.418-.401.39-.886.586-1.455.586Zm.721-1.29a.997.997 0 0 1-.721.294.997.997 0 0 1-.722-.293.96.96 0 0 1-.3-.715c0-.273.1-.508.3-.703A.998.998 0 0 1 10.568 5a1 1 0 0 1 .721.293c.2.195.3.43.3.703 0 .281-.1.52-.3.715Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconImage16);
export default Memo;
