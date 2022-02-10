import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentText12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDocumentText12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M3.576 8.727c0 .251.205.455.457.455h4.11a.456.456 0 1 0 0-.91h-4.11a.456.456 0 0 0-.457.455Zm.457-1.363a.456.456 0 1 1 0-.91h4.11a.456.456 0 1 1 0 .91h-4.11ZM3.576 5.09c0 .252.205.455.457.455h.685a.456.456 0 1 0 0-.909h-.685a.456.456 0 0 0-.457.455Z" />
                <path
                    fillRule="evenodd"
                    d="M3.294 1c-.85 0-1.544.69-1.544 1.54v6.92c0 .853.694 1.54 1.55 1.54h5.4c.854 0 1.55-.688 1.55-1.536V4.386c0-.213-.127-.505-.283-.652L7.345 1.266A1.12 1.12 0 0 0 6.676 1H3.294Zm3.09 4.23h3.093v4.235a.768.768 0 0 1-.77.766H3.293a.768.768 0 0 1-.771-.766v-6.93c0-.423.348-.766.775-.766H6v3.077c0 .214.172.385.385.385Zm3.093-.768v-.09l-2.704-2.53v2.62h2.704Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentText12);
export default Memo;
