import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconAcademy(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconAcademy"
            {...props}
        >
            <path d="M20.518 10.275v6.911a2.221 2.221 0 0 1-.742 4.314 2.221 2.221 0 0 1-.741-4.314v-6.052l-1.463.802v4.115c0 1.485-2.436 2.22-5.56 2.22-3.122 0-5.559-.735-5.559-2.22v-3.702l-3.349-1.837c-1.043-.573-1.416-1.864-.82-2.868.224-.358.522-.573.82-.788l7.452-4.087a2.305 2.305 0 0 1 2.16 0l7.452 4.087c1.043.573 1.416 1.864.82 2.868-.144.23-.287.4-.47.55ZM7.748 13.06v2.877c.02.018.047.04.08.064.181.13.478.264.863.381.846.258 2.015.409 3.268.409 1.252 0 2.421-.15 3.268-.409.384-.117.681-.25.862-.381a.838.838 0 0 0 .08-.064v-3.231l-3.452 1.893c-.671.358-1.49.358-2.161 0l-2.807-1.54Zm4.223-9.072a.7.7 0 0 0-.745 0L3.775 8.074a.571.571 0 0 0-.298.287.623.623 0 0 0 .298.932l7.451 4.087a.7.7 0 0 0 .745 0l7.452-4.087a.571.571 0 0 0 .298-.286.623.623 0 0 0-.298-.933L11.97 3.988Zm7.805 16.032a.74.74 0 1 0 .001-1.481.74.74 0 0 0 0 1.481Z" />
        </svg>
    );
}

const Memo = memo(IconAcademy);
export default Memo;
