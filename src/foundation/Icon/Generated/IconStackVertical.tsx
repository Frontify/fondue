
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconStackVertical12 from './IconStackVertical12';import IconStackVertical16 from './IconStackVertical16';import IconStackVertical20 from './IconStackVertical20';import IconStackVertical24 from './IconStackVertical24';import IconStackVertical32 from './IconStackVertical32'
    
    function IconStackVertical(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconStackVertical12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconStackVertical16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconStackVertical20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconStackVertical24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconStackVertical32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconStackVertical);
    export default Memo;
    