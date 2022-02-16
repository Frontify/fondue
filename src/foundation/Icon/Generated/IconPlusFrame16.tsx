import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPlusFrame16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPlusFrame16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M8.606 10.957a.606.606 0 0 1-1.212 0V9.745H6.18a.606.606 0 0 1 0-1.212h1.213V7.321a.606.606 0 0 1 1.212 0v1.212h1.212a.606.606 0 1 1 0 1.212H8.606v1.213Z" />
                <path
                    fillRule="evenodd"
                    d="M2.871 1.867h10.257c.85 0 1.538.688 1.538 1.538v9.23c0 .85-.688 1.54-1.538 1.54H2.87c-.85 0-1.538-.69-1.538-1.54v-9.23c0-.85.689-1.538 1.538-1.538Zm-.512 3.59v7.179c0 .283.23.513.512.513h10.257c.283 0 .513-.23.513-.513v-7.18H2.359ZM13.64 4.43H2.359V3.405c0-.283.23-.513.512-.513h10.257c.283 0 .513.23.513.513v1.026Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlusFrame16);
export default Memo;
