
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCursorClick12 from './IconCursorClick12';import IconCursorClick16 from './IconCursorClick16';import IconCursorClick20 from './IconCursorClick20';import IconCursorClick24 from './IconCursorClick24';import IconCursorClick32 from './IconCursorClick32'
    
    function IconCursorClick(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconCursorClick12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCursorClick16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCursorClick20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCursorClick24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCursorClick32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCursorClick);
    export default Memo;
    