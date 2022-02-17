import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize } from "@foundation/Icon/IconSize";

import IconEye12 from './IconEye12';;
import IconEye16 from './IconEye16';;
import IconEye20 from './IconEye20';;
import IconEye24 from './IconEye24';;
import IconEye32 from './IconEye32';

function IconEye(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconEye12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconEye16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconEye20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconEye24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconEye32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconEye);
export default Memo;