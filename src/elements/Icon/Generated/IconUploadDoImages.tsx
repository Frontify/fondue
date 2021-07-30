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

function IconUploadDoImages(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M12 17.333a5 5 0 110-10 5 5 0 010 10zm0-1.334a3.667 3.667 0 100-7.333 3.667 3.667 0 000 7.333zm1.322-5.13a.666.666 0 11.957.928l-2.367 2.441a.666.666 0 01-.977-.022l-.967-1.092a.667.667 0 01.997-.884l.49.553 1.866-1.924zm7.02-5.52H3.66a.3.3 0 00-.22.09.294.294 0 00-.108.237v12.665a.33.33 0 00.109.237c.06.062.134.091.219.091H20.34c.085 0 .164-.03.237-.09a.362.362 0 00.091-.238V5.677a.32.32 0 00-.09-.237.362.362 0 00-.238-.09zM22 5.675v12.665c0 .45-.164.839-.492 1.167A1.595 1.595 0 0120.34 20H3.659c-.45 0-.838-.164-1.167-.492A1.594 1.594 0 012 18.342V5.677c0-.462.164-.857.492-1.185A1.595 1.595 0 013.66 4h16.682c.45 0 .838.164 1.167.492.328.328.492.723.492 1.184z" />
        </svg>
    );
}

const MemoIconUploadDoImages = React.memo(IconUploadDoImages);
export default MemoIconUploadDoImages;
