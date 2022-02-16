
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconMediaObjectImage12 from './IconMediaObjectImage12';import IconMediaObjectImage16 from './IconMediaObjectImage16';import IconMediaObjectImage20 from './IconMediaObjectImage20';import IconMediaObjectImage24 from './IconMediaObjectImage24';import IconMediaObjectImage32 from './IconMediaObjectImage32'
    
    function IconMediaObjectImage(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconMediaObjectImage12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconMediaObjectImage16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconMediaObjectImage20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconMediaObjectImage24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconMediaObjectImage32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconMediaObjectImage);
    export default Memo;
    