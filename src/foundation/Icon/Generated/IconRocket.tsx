
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconRocket12 from './IconRocket12';import IconRocket16 from './IconRocket16';import IconRocket20 from './IconRocket20';import IconRocket24 from './IconRocket24';import IconRocket32 from './IconRocket32'
    
    function IconRocket(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconRocket12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconRocket16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconRocket20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconRocket24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconRocket32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconRocket);
    export default Memo;
    