
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconFolder12 from './IconFolder12';import IconFolder16 from './IconFolder16';import IconFolder20 from './IconFolder20';import IconFolder24 from './IconFolder24';import IconFolder32 from './IconFolder32'
    
    function IconFolder(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconFolder12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconFolder16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconFolder20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconFolder24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconFolder32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconFolder);
    export default Memo;
    