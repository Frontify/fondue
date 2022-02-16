
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconLayersSingle12 from './IconLayersSingle12';import IconLayersSingle16 from './IconLayersSingle16';import IconLayersSingle20 from './IconLayersSingle20';import IconLayersSingle24 from './IconLayersSingle24';import IconLayersSingle32 from './IconLayersSingle32'
    
    function IconLayersSingle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconLayersSingle12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconLayersSingle16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconLayersSingle20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconLayersSingle24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconLayersSingle32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconLayersSingle);
    export default Memo;
    