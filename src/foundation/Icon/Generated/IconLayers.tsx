import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize } from "@foundation/Icon/IconSize";

import IconLayers12 from './IconLayers12';;
import IconLayers16 from './IconLayers16';;
import IconLayers20 from './IconLayers20';;
import IconLayers24 from './IconLayers24';;
import IconLayers32 from './IconLayers32';

function IconLayers(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconLayers12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconLayers16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconLayers20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconLayers24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconLayers32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconLayers);
export default Memo;