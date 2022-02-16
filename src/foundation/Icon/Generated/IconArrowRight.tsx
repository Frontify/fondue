
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconArrowRight12 from './IconArrowRight12';import IconArrowRight16 from './IconArrowRight16';import IconArrowRight20 from './IconArrowRight20';import IconArrowRight24 from './IconArrowRight24';import IconArrowRight32 from './IconArrowRight32'
    
    function IconArrowRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconArrowRight12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconArrowRight16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconArrowRight20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconArrowRight24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconArrowRight32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconArrowRight);
    export default Memo;
    