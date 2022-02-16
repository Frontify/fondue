import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFolderArrowUp20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFolderArrowUp20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M10.549 13.86V9.933l1.035 1.023c.108.117.24.173.393.168a.558.558 0 0 0 .393-.168.535.535 0 0 0 .162-.393.535.535 0 0 0-.162-.393l-1.92-1.909a.54.54 0 0 0-.45-.237.577.577 0 0 0-.236.05.521.521 0 0 0-.187.138l-1.96 1.958a.527.527 0 0 0-.168.4.55.55 0 0 0 .168.386c.108.108.24.162.393.162a.535.535 0 0 0 .393-.162l1.035-1.035v3.94c0 .149.055.278.163.386a.543.543 0 0 0 .399.162.53.53 0 0 0 .387-.162.528.528 0 0 0 .162-.387Z" />
                <path
                    fillRule="evenodd"
                    d="M16.405 5.062H10.79l-.417-1.339c-.106-.335-.319-.623-.64-.863-.322-.24-.66-.36-1.015-.36h-4.49c-.356 0-.696.12-1.022.36-.327.24-.543.528-.648.863L1.724 6.4c-.02.068-.034.137-.043.21a.657.657 0 0 0 0 .193.294.294 0 0 0-.014.094v8.412c0 .538.187.993.56 1.368.375.374.83.561 1.368.561h12.81c.527 0 .98-.187 1.36-.561a1.85 1.85 0 0 0 .568-1.368V6.991c0-.538-.19-.994-.568-1.368a1.868 1.868 0 0 0-1.36-.561ZM9.194 4.4l.158.662H3.595l.158-.662a.832.832 0 0 1 .303-.44.782.782 0 0 1 .489-.18h3.857c.173 0 .336.06.49.18.153.12.254.267.302.44ZM2.947 14.676V7.624c0-.355.125-.657.375-.907s.551-.374.906-.374h11.543c.355 0 .657.125.907.374.25.25.374.552.374.907v7.052c0 .355-.125.657-.374.907-.25.25-.552.374-.907.374H4.228c-.355 0-.657-.125-.906-.374a1.235 1.235 0 0 1-.375-.907Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconFolderArrowUp20);
export default Memo;
