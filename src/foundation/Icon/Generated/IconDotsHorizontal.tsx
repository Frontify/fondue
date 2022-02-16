
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconDotsHorizontal12 from './IconDotsHorizontal12';import IconDotsHorizontal16 from './IconDotsHorizontal16';import IconDotsHorizontal20 from './IconDotsHorizontal20';import IconDotsHorizontal24 from './IconDotsHorizontal24';import IconDotsHorizontal32 from './IconDotsHorizontal32'
    
    function IconDotsHorizontal(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconDotsHorizontal12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconDotsHorizontal16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconDotsHorizontal20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconDotsHorizontal24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconDotsHorizontal32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconDotsHorizontal);
    export default Memo;
    