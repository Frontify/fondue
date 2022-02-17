import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize } from "@foundation/Icon/IconSize";

import IconCaretRight12 from './IconCaretRight12';;
import IconCaretRight16 from './IconCaretRight16';;
import IconCaretRight20 from './IconCaretRight20';;
import IconCaretRight24 from './IconCaretRight24';;
import IconCaretRight32 from './IconCaretRight32';

function IconCaretRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCaretRight12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconCaretRight16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconCaretRight20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconCaretRight24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconCaretRight32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconCaretRight);
export default Memo;