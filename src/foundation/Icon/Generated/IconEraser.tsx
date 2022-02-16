
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconEraser12 from './IconEraser12';import IconEraser16 from './IconEraser16';import IconEraser20 from './IconEraser20';import IconEraser24 from './IconEraser24';import IconEraser32 from './IconEraser32'
    
    function IconEraser(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconEraser12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconEraser16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconEraser20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconEraser24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconEraser32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconEraser);
    export default Memo;
    