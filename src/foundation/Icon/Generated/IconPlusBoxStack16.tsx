import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPlusBoxStack16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPlusBoxStack16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M7.217 10.87a.522.522 0 0 1-1.043 0V9.826H5.13a.522.522 0 1 1 0-1.043h1.044V7.739a.522.522 0 1 1 1.043 0v1.044h1.044a.522.522 0 1 1 0 1.043H7.217v1.044Z" />
                <path
                    fillRule="evenodd"
                    d="M12.343 2H6.266c-.915 0-1.657.742-1.657 1.657v.952h-.952C2.742 4.609 2 5.35 2 6.266v6.077C2 13.258 2.742 14 3.657 14h6.077c.915 0 1.657-.742 1.657-1.657v-.952h.952c.915 0 1.657-.742 1.657-1.657V3.657C14 2.742 13.258 2 12.343 2Zm-.952 4.266v4.02h.952a.552.552 0 0 0 .552-.552V3.657a.552.552 0 0 0-.552-.552H6.266a.552.552 0 0 0-.552.552v.952h4.02c.915 0 1.657.742 1.657 1.657Zm-8.348-.052c0-.31.252-.562.562-.562h6.18c.311 0 .563.252.563.562v6.18a.563.563 0 0 1-.562.563h-6.18a.562.562 0 0 1-.563-.562v-6.18Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlusBoxStack16);
export default Memo;
