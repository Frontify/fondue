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

function IconFeedback(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconFeedback"
            {...props}
        >
            <path d="M11.531 13.926l4.219 3.613c.143.13.267.17.371.117.104-.052.156-.176.156-.37v-3.36h2.149c.599 0 1.107-.209 1.523-.625.417-.417.625-.925.625-1.524V6.074c0-.599-.208-1.107-.625-1.523a2.073 2.073 0 00-1.523-.625h-10c-.586 0-1.09.208-1.514.625a2.057 2.057 0 00-.635 1.523v5.703c0 .6.212 1.107.635 1.524.423.416.928.625 1.514.625h3.105zm-6.68-7.012a2.087 2.087 0 00-1.025.762c-.267.364-.4.781-.4 1.25v5.722c0 .586.208 1.088.625 1.504.416.417.924.625 1.523.625h2.149v2.657c0 .195.052.315.156.36.104.046.228.004.371-.126l3.379-2.89h.84l-1.739-1.426H8.426c-.99 0-1.833-.349-2.53-1.045-.696-.697-1.044-1.534-1.044-2.51V6.914zm.06-1.504c.155-.82.562-1.51 1.22-2.07a3.432 3.432 0 012.295-.84h10c.99 0 1.832.348 2.53 1.045.696.697 1.044 1.533 1.044 2.51v5.742c0 .976-.348 1.813-1.045 2.51a3.445 3.445 0 01-2.53 1.045h-.702v3.085c0 .73-.199 1.189-.596 1.377-.397.19-.882.056-1.455-.4l-1.445-1.191H12.39l-4.063 3.32c-.573.469-1.058.609-1.455.42s-.596-.648-.596-1.377v-2.363h-.703a3.43 3.43 0 01-2.53-1.055C2.349 16.465 2 15.625 2 14.648V8.926c0-.873.28-1.638.84-2.295.56-.658 1.25-1.065 2.07-1.22z" />
        </svg>
    );
}

const MemoIconFeedback = React.memo(IconFeedback);
export default MemoIconFeedback;
