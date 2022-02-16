import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextFormatStrikethrough12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextFormatStrikethrough12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M7.538 9.192H6.385v-1.97h-.77v1.97H4.462v.77h3.076v-.77Z" />
                <path
                    fillRule="evenodd"
                    d="M2.125 6c0-.207.168-.375.375-.375h7a.375.375 0 0 1 0 .75h-7A.375.375 0 0 1 2.125 6Z"
                    clipRule="evenodd"
                />
                <path d="M5.624 4.693h.752V2.808h2.371v.769H9.5V2.039h-7v1.538h.753v-.77h2.37v1.886Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextFormatStrikethrough12);
export default Memo;
