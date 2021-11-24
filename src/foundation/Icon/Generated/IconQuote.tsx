import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconQuote(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconQuote"
            {...props}
        >
            <path d="M12.372 16.346h5.37a2.725 2.725 0 002.72-2.731V6.77a2.727 2.727 0 00-2.72-2.732H6.258A2.725 2.725 0 003.538 6.77v6.845a2.727 2.727 0 002.72 2.731h1.896v2.707c0 .502.305.647.693.315l3.525-3.022zm.825 1.539l-4.392 3.592c-1.21.991-2.19.523-2.19-1.044v-2.548h-.077C4.032 17.885 2 15.842 2 13.33V7.053A4.543 4.543 0 016.538 2.5h10.924C19.968 2.5 22 4.543 22 7.053v6.278a4.543 4.543 0 01-4.538 4.554h-4.265zM11.294 7.383c-.702.462-1.228.95-1.579 1.468-.35.517-.526 1.172-.526 1.966a.84.84 0 01.25-.028c.369 0 .706.12 1.01.36.305.24.457.591.457 1.053 0 .48-.138.853-.415 1.121-.277.268-.628.402-1.053.402-.553 0-.983-.213-1.287-.637-.305-.425-.457-1.043-.457-1.856 0-1.107.25-2.067.748-2.88.498-.812 1.227-1.495 2.187-2.049l.665 1.08zm4.874 0c-.702.462-1.228.95-1.579 1.468-.35.517-.526 1.172-.526 1.966a.84.84 0 01.25-.028c.369 0 .705.12 1.01.36.305.24.457.591.457 1.053 0 .48-.138.853-.415 1.121-.277.268-.628.402-1.053.402-.554 0-.983-.213-1.287-.637-.305-.425-.457-1.043-.457-1.856 0-1.107.249-2.067.747-2.88.499-.812 1.228-1.495 2.188-2.049l.665 1.08z" />
        </svg>
    );
}

const MemoIconQuote = React.memo(IconQuote);
export default MemoIconQuote;
