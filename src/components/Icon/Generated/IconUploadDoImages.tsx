import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconUploadDoImages(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconUploadDoImages"
            {...props}
        >
            <path d="M12 17.333a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-1.334a3.667 3.667 0 1 0 0-7.333 3.667 3.667 0 0 0 0 7.333Zm1.322-5.13a.666.666 0 1 1 .957.928l-2.367 2.441a.666.666 0 0 1-.977-.022l-.967-1.092a.667.667 0 0 1 .997-.884l.49.553 1.866-1.924Zm7.02-5.52H3.66a.3.3 0 0 0-.22.09.294.294 0 0 0-.108.237v12.665a.33.33 0 0 0 .109.237c.06.062.134.091.219.091H20.34c.085 0 .164-.03.237-.09a.362.362 0 0 0 .091-.238V5.677a.32.32 0 0 0-.09-.237.362.362 0 0 0-.238-.09ZM22 5.675v12.665c0 .45-.164.839-.492 1.167A1.595 1.595 0 0 1 20.34 20H3.659c-.45 0-.838-.164-1.167-.492A1.594 1.594 0 0 1 2 18.342V5.677c0-.462.164-.857.492-1.185A1.595 1.595 0 0 1 3.66 4h16.682c.45 0 .838.164 1.167.492.328.328.492.723.492 1.184Z" />
        </svg>
    );
}

const Memo = memo(IconUploadDoImages);
export default Memo;
