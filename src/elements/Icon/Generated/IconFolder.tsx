import * as React from "react";
import IconProps from "@elements/Icon/IconProps";
import IconSize from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconFolder(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconFolder"
            {...props}
        >
            <path d="M12.95 6.074h6.736c.633 0 1.177.225 1.632.674.455.449.682.996.682 1.64v9.983c0 .645-.227 1.192-.682 1.641-.455.45-1 .674-1.632.674H4.314a2.233 2.233 0 01-1.64-.674A2.233 2.233 0 012 18.372V8.275c0-.04.006-.077.017-.112a.789.789 0 010-.233c.012-.086.03-.17.052-.25l1.002-3.213c.126-.403.386-.748.777-1.036.391-.288.8-.432 1.226-.432h5.389c.426 0 .832.144 1.217.432.386.288.642.633.77 1.036l.5 1.606zm-1.727 0l-.19-.794a.998.998 0 00-.363-.527.938.938 0 00-.587-.216H5.454a.938.938 0 00-.587.216.998.998 0 00-.363.527l-.19.794h6.909zM3.537 9.15v8.462c0 .426.15.79.45 1.088.299.3.661.45 1.087.45h13.852c.426 0 .788-.15 1.088-.45.3-.299.449-.662.449-1.088V9.15c0-.426-.15-.79-.45-1.089-.299-.299-.661-.449-1.087-.449H5.074c-.426 0-.788.15-1.088.45-.3.299-.449.662-.449 1.088z" />
        </svg>
    );
}

const MemoIconFolder = React.memo(IconFolder);
export default MemoIconFolder;
