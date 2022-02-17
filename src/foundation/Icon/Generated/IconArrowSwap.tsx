import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize } from "@foundation/Icon/IconSize";

import IconArrowSwap12 from './IconArrowSwap12';;
import IconArrowSwap16 from './IconArrowSwap16';;
import IconArrowSwap20 from './IconArrowSwap20';;
import IconArrowSwap24 from './IconArrowSwap24';;
import IconArrowSwap32 from './IconArrowSwap32';

function IconArrowSwap(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowSwap12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconArrowSwap16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconArrowSwap20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconArrowSwap24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconArrowSwap32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconArrowSwap);
export default Memo;