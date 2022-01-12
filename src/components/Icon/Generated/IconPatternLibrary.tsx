import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconPatternLibrary(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconPatternLibrary"
            {...props}
        >
            <path d="M10.463 6.074h2.297V4.537c0-.426.15-.789.449-1.088.3-.3.662-.449 1.088-.449h3.092c.414 0 .771.15 1.07.45.3.298.45.661.45 1.087v1.537h.777c.633 0 1.177.225 1.632.674.455.449.682.996.682 1.64v9.983c0 .645-.227 1.192-.682 1.641-.455.45-1 .674-1.632.674H4.314a2.233 2.233 0 0 1-1.64-.674A2.233 2.233 0 0 1 2 18.372V8.388c0-.645.225-1.192.674-1.641.449-.45.996-.674 1.64-.674V4.537c0-.426.147-.789.44-1.088.294-.3.66-.449 1.097-.449h3.075c.426 0 .788.15 1.088.45.3.298.449.661.449 1.087v1.537Zm-1.537 0v-.76a.737.737 0 0 0-.233-.552.76.76 0 0 0-.544-.225h-1.52a.751.751 0 0 0-.553.225.751.751 0 0 0-.225.552v.76h3.075Zm8.445 0v-.76a.751.751 0 0 0-.224-.552.751.751 0 0 0-.553-.225h-1.52a.751.751 0 0 0-.552.225.751.751 0 0 0-.225.552v.76h3.074ZM3.537 9.15v8.462c0 .426.15.79.45 1.088.299.3.661.45 1.087.45h13.852c.426 0 .788-.15 1.088-.45.3-.299.449-.662.449-1.088V9.15c0-.426-.15-.79-.45-1.089-.299-.299-.661-.449-1.087-.449H5.074c-.426 0-.788.15-1.088.45-.3.299-.449.662-.449 1.088Z" />
        </svg>
    );
}

const Memo = memo(IconPatternLibrary);
export default Memo;
