
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCircle12 from './IconCircle12';import IconCircle16 from './IconCircle16';import IconCircle20 from './IconCircle20';import IconCircle24 from './IconCircle24';import IconCircle32 from './IconCircle32'
    
    function IconCircle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconCircle12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCircle16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCircle20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCircle24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCircle32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCircle);
    export default Memo;
    