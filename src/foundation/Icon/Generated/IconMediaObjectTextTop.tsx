
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconMediaObjectTextTop12 from './IconMediaObjectTextTop12';import IconMediaObjectTextTop16 from './IconMediaObjectTextTop16';import IconMediaObjectTextTop20 from './IconMediaObjectTextTop20';import IconMediaObjectTextTop24 from './IconMediaObjectTextTop24';import IconMediaObjectTextTop32 from './IconMediaObjectTextTop32'
    
    function IconMediaObjectTextTop(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconMediaObjectTextTop12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconMediaObjectTextTop16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconMediaObjectTextTop20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconMediaObjectTextTop24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconMediaObjectTextTop32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconMediaObjectTextTop);
    export default Memo;
    