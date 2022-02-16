
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconArrowMove12 from './IconArrowMove12';import IconArrowMove16 from './IconArrowMove16';import IconArrowMove20 from './IconArrowMove20';import IconArrowMove24 from './IconArrowMove24';import IconArrowMove32 from './IconArrowMove32'
    
    function IconArrowMove(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconArrowMove12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconArrowMove16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconArrowMove20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconArrowMove24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconArrowMove32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconArrowMove);
    export default Memo;
    