
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconMediaObjectIcon12 from './IconMediaObjectIcon12';import IconMediaObjectIcon16 from './IconMediaObjectIcon16';import IconMediaObjectIcon20 from './IconMediaObjectIcon20';import IconMediaObjectIcon24 from './IconMediaObjectIcon24';import IconMediaObjectIcon32 from './IconMediaObjectIcon32'
    
    function IconMediaObjectIcon(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconMediaObjectIcon12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconMediaObjectIcon16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconMediaObjectIcon20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconMediaObjectIcon24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconMediaObjectIcon32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconMediaObjectIcon);
    export default Memo;
    