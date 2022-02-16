
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconStrikethroughBox12 from './IconStrikethroughBox12';import IconStrikethroughBox16 from './IconStrikethroughBox16';import IconStrikethroughBox20 from './IconStrikethroughBox20';import IconStrikethroughBox24 from './IconStrikethroughBox24';import IconStrikethroughBox32 from './IconStrikethroughBox32'
    
    function IconStrikethroughBox(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconStrikethroughBox12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconStrikethroughBox16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconStrikethroughBox20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconStrikethroughBox24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconStrikethroughBox32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconStrikethroughBox);
    export default Memo;
    