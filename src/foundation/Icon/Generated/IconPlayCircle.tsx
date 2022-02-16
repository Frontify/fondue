
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconPlayCircle12 from './IconPlayCircle12';import IconPlayCircle16 from './IconPlayCircle16';import IconPlayCircle20 from './IconPlayCircle20';import IconPlayCircle24 from './IconPlayCircle24';import IconPlayCircle32 from './IconPlayCircle32'
    
    function IconPlayCircle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconPlayCircle12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconPlayCircle16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconPlayCircle20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconPlayCircle24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconPlayCircle32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconPlayCircle);
    export default Memo;
    