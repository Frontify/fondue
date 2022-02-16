import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconListNumbers16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconListNumbers16"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M14 3.833a.5.5 0 0 1-.5.5H7.345a.5.5 0 1 1 0-1H13.5a.5.5 0 0 1 .5.5Zm-7.155 8.334a.5.5 0 0 1 .5-.5h4.843a.5.5 0 0 1 0 1H7.345a.5.5 0 0 1-.5-.5Zm5.843-5.572a.5.5 0 0 1-.5.5H7.345a.5.5 0 0 1 0-1h4.843a.5.5 0 0 1 .5.5ZM14 9.369a.5.5 0 0 1-.5.5H7.345a.5.5 0 0 1 0-1H13.5a.5.5 0 0 1 .5.5Zm-10.434.62h-.872V9.93c0-.602.392-1.264 1.3-1.264.798 0 1.312.486 1.312 1.126 0 .53-.29.856-.554 1.154l-.085.096-.667.771v.043h1.306v.81H2.748v-.634l1.26-1.414c.184-.204.387-.432.387-.723a.42.42 0 0 0-.418-.432c-.258 0-.413.216-.413.458l.001.04.001.027Z"
                    clipRule="evenodd"
                />
                <path d="M3.623 7.333h.91v-4h-.91L2.8 3.99v.91l.78-.621h.043v3.053Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconListNumbers16);
export default Memo;
