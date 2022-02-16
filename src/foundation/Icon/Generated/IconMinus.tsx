
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconMinus12 from './IconMinus12';import IconMinus16 from './IconMinus16';import IconMinus20 from './IconMinus20';import IconMinus24 from './IconMinus24';import IconMinus32 from './IconMinus32'
    
    function IconMinus(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconMinus12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconMinus16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconMinus20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconMinus24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconMinus32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconMinus);
    export default Memo;
    