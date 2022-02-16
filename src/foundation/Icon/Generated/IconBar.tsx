
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconBar12 from './IconBar12';import IconBar16 from './IconBar16';import IconBar20 from './IconBar20';import IconBar24 from './IconBar24';import IconBar32 from './IconBar32'
    
    function IconBar(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconBar12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconBar16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconBar20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconBar24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconBar32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconBar);
    export default Memo;
    