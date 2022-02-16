
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconArrowCircleDown12 from './IconArrowCircleDown12';import IconArrowCircleDown16 from './IconArrowCircleDown16';import IconArrowCircleDown20 from './IconArrowCircleDown20';import IconArrowCircleDown24 from './IconArrowCircleDown24';import IconArrowCircleDown32 from './IconArrowCircleDown32'
    
    function IconArrowCircleDown(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconArrowCircleDown12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconArrowCircleDown16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconArrowCircleDown20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconArrowCircleDown24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconArrowCircleDown32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconArrowCircleDown);
    export default Memo;
    