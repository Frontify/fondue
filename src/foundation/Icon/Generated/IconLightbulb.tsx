
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconLightbulb12 from './IconLightbulb12';import IconLightbulb16 from './IconLightbulb16';import IconLightbulb20 from './IconLightbulb20';import IconLightbulb24 from './IconLightbulb24';import IconLightbulb32 from './IconLightbulb32'
    
    function IconLightbulb(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconLightbulb12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconLightbulb16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconLightbulb20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconLightbulb24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconLightbulb32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconLightbulb);
    export default Memo;
    