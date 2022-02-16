
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconMasonry12 from './IconMasonry12';import IconMasonry16 from './IconMasonry16';import IconMasonry20 from './IconMasonry20';import IconMasonry24 from './IconMasonry24';import IconMasonry32 from './IconMasonry32'
    
    function IconMasonry(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconMasonry12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconMasonry16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconMasonry20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconMasonry24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconMasonry32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconMasonry);
    export default Memo;
    