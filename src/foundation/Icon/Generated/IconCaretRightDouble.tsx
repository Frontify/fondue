
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconCaretRightDouble12 from './IconCaretRightDouble12';import IconCaretRightDouble16 from './IconCaretRightDouble16';import IconCaretRightDouble20 from './IconCaretRightDouble20';import IconCaretRightDouble24 from './IconCaretRightDouble24';import IconCaretRightDouble32 from './IconCaretRightDouble32'
    
    function IconCaretRightDouble(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconCaretRightDouble12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconCaretRightDouble16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconCaretRightDouble20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconCaretRightDouble24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconCaretRightDouble32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconCaretRightDouble);
    export default Memo;
    