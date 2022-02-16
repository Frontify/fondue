
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconHome12 from './IconHome12';import IconHome16 from './IconHome16';import IconHome20 from './IconHome20';import IconHome24 from './IconHome24';import IconHome32 from './IconHome32'
    
    function IconHome(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconHome12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconHome16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconHome20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconHome24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconHome32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconHome);
    export default Memo;
    