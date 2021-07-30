import * as React from "react";
import { IconProps, IconSize } from "@elements/Icon/Icon";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconDosImages(props: IconProps): React.ReactElement<IconProps> {
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
            {...props}
        >
            <path d="M7.075 6.143l.653-.653a.66.66 0 01.932.932l-.653.653.653.653a.66.66 0 11-.932.932l-.653-.653-.653.653a.66.66 0 11-.932-.932l.653-.653-.653-.653a.66.66 0 01.932-.932l.653.653zm4.054-1.835h7.279c.53 0 .984.187 1.36.563.375.376.563.829.563 1.36v7.12a4.945 4.945 0 11-7.46 6.342H5.592c-.53 0-.984-.188-1.36-.564a1.853 1.853 0 01-.563-1.36v-7.12a4.945 4.945 0 117.46-6.342zm.601 1.384a4.945 4.945 0 01-6.676 5.823v6.254c0 .164.042.265.158.38a.475.475 0 00.38.159h6.678a4.945 4.945 0 016.676-5.823V6.23a.475.475 0 00-.158-.38.475.475 0 00-.38-.159H11.73zm5.325 14.99a3.626 3.626 0 100-7.253 3.626 3.626 0 000 7.252zm-10.11-10.11a3.626 3.626 0 100-7.253 3.626 3.626 0 000 7.252zm11.417 5.035a.66.66 0 01.947.918l-2.34 2.414a.66.66 0 01-.968-.021l-.956-1.08a.66.66 0 11.987-.874l.485.547 1.845-1.904z" />
        </svg>
    );
}

const MemoIconDosImages = React.memo(IconDosImages);
export default MemoIconDosImages;
