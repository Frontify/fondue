import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStrikethroughBox12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconStrikethroughBox12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.899 1.744a.417.417 0 0 0-.588-.043l-.788.68a1.253 1.253 0 0 0-.606-.156H3.083c-.69 0-1.25.56-1.25 1.25v5c0 .166.033.324.091.47l-.78.673a.417.417 0 0 0 .545.63l.788-.68c.18.1.386.157.606.157h5.834c.69 0 1.25-.56 1.25-1.25v-5c0-.166-.033-.324-.091-.47l.78-.673a.417.417 0 0 0 .043-.588Zm-2.16 1.314H3.084a.417.417 0 0 0-.416.417v4.828L8.74 3.058ZM3.26 8.892l6.073-5.245v4.828c0 .23-.186.417-.416.417H3.26Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStrikethroughBox12);
export default Memo;
