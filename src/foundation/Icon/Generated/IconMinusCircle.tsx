
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconMinusCircle12 from './IconMinusCircle12';import IconMinusCircle16 from './IconMinusCircle16';import IconMinusCircle20 from './IconMinusCircle20';import IconMinusCircle24 from './IconMinusCircle24';import IconMinusCircle32 from './IconMinusCircle32'
    
    function IconMinusCircle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconMinusCircle12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconMinusCircle16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconMinusCircle20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconMinusCircle24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconMinusCircle32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconMinusCircle);
    export default Memo;
    