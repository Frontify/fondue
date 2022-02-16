
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconButton12 from './IconButton12';import IconButton16 from './IconButton16';import IconButton20 from './IconButton20';import IconButton24 from './IconButton24';import IconButton32 from './IconButton32'
    
    function IconButton(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconButton12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconButton16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconButton20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconButton24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconButton32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconButton);
    export default Memo;
    