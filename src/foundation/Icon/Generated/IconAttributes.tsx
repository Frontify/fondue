import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAttributes(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconAttributes"
            {...props}
        >
            <path d="M18.955 10.462h-6.186a.767.767 0 01-.769-.77V3.538H6.596c-.853 0-1.55.686-1.55 1.532v13.86c0 .847.69 1.532 1.541 1.532h10.826c.852 0 1.542-.686 1.542-1.532v-8.468zm0-1.539v-.177l-5.41-5.063v5.24h5.41zM3.5 5.081A3.089 3.089 0 016.587 2h6.765c.427 0 1.023.235 1.339.532l5.243 4.936c.313.294.566.878.566 1.305v10.155c0 1.696-1.391 3.072-3.098 3.072H6.598A3.087 3.087 0 013.5 18.919V5.08zm4.19 11.407l2.503-2.164-2.507-2.2a.676.676 0 01-.06-.957.683.683 0 01.96-.06l3.091 2.712a.676.676 0 01-.003 1.02l-3.091 2.673a.683.683 0 01-.96-.068.676.676 0 01.067-.956zm5.083.897a.771.771 0 01-.773-.77c0-.424.346-.769.773-.769h3.09c.427 0 .773.345.773.77 0 .424-.346.769-.772.769h-3.091z" />
        </svg>
    );
}

const MemoIconAttributes = React.memo(IconAttributes);
export default MemoIconAttributes;
