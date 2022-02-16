import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconListNumbers12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconListNumbers12"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10.5 2.875a.375.375 0 0 1-.375.375H5.51a.375.375 0 0 1 0-.75h4.616c.207 0 .375.168.375.375Zm-5.366 6.25c0-.207.167-.375.375-.375H9.14a.375.375 0 0 1 0 .75H5.509a.375.375 0 0 1-.375-.375Zm4.382-4.179a.375.375 0 0 1-.375.375H5.509a.375.375 0 0 1 0-.75H9.14c.207 0 .375.168.375.375Zm.984 2.081a.375.375 0 0 1-.375.375H5.51a.375.375 0 0 1 0-.75h4.616c.207 0 .375.167.375.375Zm-7.825.464H2.02v-.043c0-.451.294-.948.975-.948.598 0 .984.365.984.844 0 .398-.218.643-.416.866l-.063.072-.5.579v.032h.979V9.5H2.06v-.475l.945-1.06c.138-.154.29-.325.29-.543a.315.315 0 0 0-.313-.324c-.193 0-.31.162-.31.344l.001.03v.02Z"
                    clipRule="evenodd"
                />
                <path d="M2.717 5.5H3.4v-3h-.683l-.617.492v.684l.585-.466h.032V5.5Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconListNumbers12);
export default Memo;
