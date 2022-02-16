
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconStackHorizontal12 from './IconStackHorizontal12';import IconStackHorizontal16 from './IconStackHorizontal16';import IconStackHorizontal20 from './IconStackHorizontal20';import IconStackHorizontal24 from './IconStackHorizontal24';import IconStackHorizontal32 from './IconStackHorizontal32'
    
    function IconStackHorizontal(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconStackHorizontal12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconStackHorizontal16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconStackHorizontal20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconStackHorizontal24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconStackHorizontal32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconStackHorizontal);
    export default Memo;
    