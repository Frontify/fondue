
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconPaintbrush12 from './IconPaintbrush12';import IconPaintbrush16 from './IconPaintbrush16';import IconPaintbrush20 from './IconPaintbrush20';import IconPaintbrush24 from './IconPaintbrush24';import IconPaintbrush32 from './IconPaintbrush32'
    
    function IconPaintbrush(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconPaintbrush12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconPaintbrush16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconPaintbrush20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconPaintbrush24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconPaintbrush32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconPaintbrush);
    export default Memo;
    