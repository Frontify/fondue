import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconSpeaker12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconSpeaker12"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M7 2.113a.5.5 0 0 0-.832-.373L3.624 4H2.5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1.125l2.543 2.26A.5.5 0 0 0 7 9.886V2.113ZM2.5 4.75h1.41l2.34-2.08v6.66L3.91 7.25H2.5A.25.25 0 0 1 2.25 7V5a.25.25 0 0 1 .25-.25Z"
                    clipRule="evenodd"
                />
                <path d="M8.269 3.295c.91.712 1.356 1.603 1.356 2.705 0 1.101-.446 1.993-1.356 2.704a.375.375 0 1 0 .462.591c1.09-.852 1.644-1.96 1.644-3.295s-.554-2.444-1.644-3.296a.375.375 0 1 0-.462.591Z" />
                <path d="M8.125 6c0-.515-.138-.93-.413-1.26a.375.375 0 0 1 .576-.48c.392.471.587 1.056.587 1.74 0 .683-.195 1.269-.587 1.74a.375.375 0 1 1-.576-.48c.275-.33.413-.746.413-1.26Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconSpeaker12);
export default Memo;
