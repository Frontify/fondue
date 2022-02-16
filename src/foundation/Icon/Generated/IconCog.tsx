
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCog12 from './IconCog12';import IconCog16 from './IconCog16';import IconCog20 from './IconCog20';import IconCog24 from './IconCog24';import IconCog32 from './IconCog32'
    
    function IconCog(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconCog12 {...props}/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCog16 {...props}/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCog20 {...props}/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCog24 {...props}/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCog32 {...props}/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCog);
    export default Memo;
    