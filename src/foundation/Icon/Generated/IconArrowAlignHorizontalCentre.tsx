
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconArrowAlignHorizontalCentre12 from './IconArrowAlignHorizontalCentre12';import IconArrowAlignHorizontalCentre16 from './IconArrowAlignHorizontalCentre16';import IconArrowAlignHorizontalCentre20 from './IconArrowAlignHorizontalCentre20';import IconArrowAlignHorizontalCentre24 from './IconArrowAlignHorizontalCentre24';import IconArrowAlignHorizontalCentre32 from './IconArrowAlignHorizontalCentre32'
    
    function IconArrowAlignHorizontalCentre(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconArrowAlignHorizontalCentre12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconArrowAlignHorizontalCentre16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconArrowAlignHorizontalCentre20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconArrowAlignHorizontalCentre24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconArrowAlignHorizontalCentre32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconArrowAlignHorizontalCentre);
    export default Memo;
    